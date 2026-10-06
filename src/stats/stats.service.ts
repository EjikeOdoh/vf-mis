import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AscgParticipation } from 'src/ascg-participation/entities/ascg-participation.entity';
import { CbcParticipation } from 'src/cbc-participation/entities/cbc-participation.entity';
import { ProgramParticipation } from 'src/program-participation/entities/program-participation.entity';
import { ScParticipation } from 'src/sc-participation/entities/sc-participation.entity';
import { School } from 'src/schools/entities/school.entity';
import { Student } from 'src/students/entities/student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Student) private readonly studentRepo: Repository<Student>,
    @InjectRepository(School) private readonly schoolRepo: Repository<School>,
    @InjectRepository(ProgramParticipation) private readonly allParticipationRepo: Repository<ProgramParticipation>,
    @InjectRepository(AscgParticipation) private readonly ascgParticipationRepo: Repository<AscgParticipation>,
    @InjectRepository(ScParticipation) private readonly scParticipationRepo: Repository<ScParticipation>,
    @InjectRepository(CbcParticipation) private readonly cbcParticipationRepo: Repository<CbcParticipation>,
  ) {}

  async getOverview() {
    const [students, participation, schools] = await Promise.all([
      this.studentRepo.count(),
      this.allParticipationRepo.count(),
      this.schoolRepo.count(),
    ]);

    return {
      students,
      participation,
      schools,
    };
  }

  /**
   * Combined reach data: yearly breakdown + per-program cards.
   */
  async getReach() {
    try {
      const [yearly, programs] = await Promise.all([
        this.getYearlyReach(),
        this.getProgramStats(),
      ]);

      return { yearly, programs };
    } catch (error) {
      console.error('Error fetching reach data:', error);
      throw error;
    }
  }

  /**
   * For every year: unique students (yearJoined === year)
   * and returning students (yearJoined !== year).
   */
  async getYearlyReach() {
    const rows = await this.allParticipationRepo
      .createQueryBuilder('participation')
      .innerJoin('participation.student', 'student')
      .select('participation.year', 'year')
      .addSelect(
        'COUNT(DISTINCT CASE WHEN student.yearJoined = participation.year THEN student.id END)',
        'uniqueStudents',
      )
      .addSelect(
        'COUNT(DISTINCT CASE WHEN student.yearJoined <> participation.year THEN student.id END)',
        'returningStudents',
      )
      .groupBy('participation.year')
      .orderBy('participation.year', 'ASC')
      .getRawMany();

    return rows.map((r) => ({
      year: Number(r.year),
      uniqueStudents: Number(r.uniqueStudents),
      returningStudents: Number(r.returningStudents),
    }));
  }

  /**
   * Per-program stats: unique students, total participations,
   * returning participations (total - unique) and the first year on record.
   */
  async getProgramStats() {
    const [ascg, cbc, sc, outreach] = await Promise.all([
      this.buildProgramStats(this.ascgParticipationRepo),
      this.buildProgramStats(this.cbcParticipationRepo),
      this.buildProgramStats(this.scParticipationRepo),
      // Assumes outreach lives in ProgramParticipation with a `program` column.
      // Adjust if outreach has its own entity or a different discriminator.
      this.buildProgramStats(this.allParticipationRepo, {
        clause: 'p.programId = :program',
        params: { program: 'outreach' },
      }),
    ]);

    return [
      { id: 'ascg', program: 'ASCG', description: 'After-school STEM Clubs for Girls', ...ascg },
      { id: 'cbc', program: 'CBC', description: 'Coding Bootcamps for Women', ...cbc },
      { id: 'sc', program: 'SC', description: 'STEM Camps', ...sc },
      { id: 'outreach', program: 'OUTREACH', description: 'STEM Outreach', ...outreach },
    ];
  }

  private async buildProgramStats(
    repo: Repository<any>,
    filter?: { clause: string; params: Record<string, any> },
  ) {
    const qb = repo
      .createQueryBuilder('p')
      .innerJoin('p.student', 'student')
      .select('COUNT(DISTINCT student.id)', 'uniqueStudents')
      .addSelect('COUNT(p.id)', 'totalParticipations')
      .addSelect('MIN(p.year)', 'since');

    if (filter) qb.where(filter.clause, filter.params);

    const raw = await qb.getRawOne();

    const uniqueStudents = Number(raw?.uniqueStudents ?? 0);
    const totalParticipations = Number(raw?.totalParticipations ?? 0);

    return {
      uniqueStudents,
      totalParticipations,
      returningParticipations: totalParticipations - uniqueStudents,
      since: raw?.since ? Number(raw.since) : null,
    };
  }
}