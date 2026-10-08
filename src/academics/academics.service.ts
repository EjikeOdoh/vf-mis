import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateAcademicsBatchDto,
  CreateAcademicsDto,
  CreateGpaDto,
  CreateGradeDto,
  CreatePerformanceDto,
} from './dto/create-academics-batch.dto';
import { Academics } from './entities/academics.entity';
import { GPA } from './entities/gpa.entity';
import { Grade } from './entities/grades.entity';
import { Performance } from './entities/performance.entity';
import { UpdateAcademicsDto } from './dto/update-academics.dto';
import { UpdateGpaDto } from './dto/update-gpa.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { UpdatePerformanceDto } from './dto/update-performance.dto';

@Injectable()
export class AcademicsService {
  constructor(
    @InjectRepository(Academics)
    private readonly academicsRepository: Repository<Academics>,

    @InjectRepository(GPA)
    private readonly gpaRepository: Repository<GPA>,

    @InjectRepository(Grade)
    private readonly gradeRepository: Repository<Grade>,

    @InjectRepository(Performance)
    private readonly performanceRepository: Repository<Performance>,
  ) { }

  async createBatch(createAcademicsBatchDto: CreateAcademicsBatchDto) {
    const { academics = [], gpa = [], grades = [], performance = [] } = createAcademicsBatchDto ?? {};

    if (
      academics.length === 0 &&
      gpa.length === 0 &&
      grades.length === 0 &&
      performance.length === 0
    ) {
      throw new BadRequestException('At least one academic record is required.');
    }

    const [savedAcademics, savedGpa, savedGrades, savedPerformance] = await Promise.all([
      academics.length
        ? this.academicsRepository.save(this.academicsRepository.create(academics))
        : [],
      gpa.length
        ? this.gpaRepository.save(this.gpaRepository.create(gpa))
        : [],
      grades.length
        ? this.gradeRepository.save(this.gradeRepository.create(grades))
        : [],
      performance.length
        ? this.performanceRepository.save(this.performanceRepository.create(performance))
        : [],
    ]);

    return {
      academics: savedAcademics,
      gpa: savedGpa,
      grades: savedGrades,
      performance: savedPerformance,
    };
  }

  async findByYear(year: number) {
    if (!Number.isFinite(year)) {
      throw new BadRequestException('Year must be a valid number.');
    }

    const [academics, gpa, grades, performance] = await Promise.all([
      this.academicsRepository.find({ where: { year } }),
      this.gpaRepository.find({ where: { year } }),
      this.gradeRepository.find({ where: { year } }),
      this.performanceRepository.find({ where: { year } }),
    ]);

    const summaryRow = academics[0] ?? null;
    const gpaTrend = [...gpa]
      .sort((a, b) => a.term.localeCompare(b.term))
      .map((item) => ({
        term: item.term,
        gpa: Number(item.gpa),
        numberOfRecords: item.numberOfRecords,
        percentage: Number(item.percentage),
      }));

    const movementBySubject = grades.map((item) => ({
      subject: item.subject,
      paired: item.paired,
      term1: item.term1,
      term2: item.term2,
      term3: item.term3,
      improved: item.improved,
      stable: item.stable,
      declined: item.declined,
    }));

    const performanceByTerm = [...performance]
      .sort((a, b) => a.term.localeCompare(b.term))
      .map((item) => ({
        term: item.term,
        excellent: item.excellent,
        good: item.good,
        fair: item.fair,
        poor: item.poor,
      }));

    const totalRecords = gpa.reduce((sum, record) => sum + record.numberOfRecords, 0);
    const avgGpa = gpa.length
      ? gpa.reduce((sum, record) => sum + Number(record.gpa), 0) / gpa.length
      : 0;

    const summary = {
      year,
      improved: summaryRow?.improved ?? 0,
      stable: summaryRow?.stable ?? 0,
      declined: summaryRow?.declined ?? 0,
      netGpaChange: Number((avgGpa - 3.5).toFixed(2)),
      totalRecords,
      averageGpa: Number(avgGpa.toFixed(2)),
    };

    return {
      year,
      summary,
      records: {
        academics,
        gpa,
        grades,
        performance,
      },
      gpaTrend,
      movementBySubject,
      performanceByTerm,
    };
  }

  async createAcademics(createAcademicsDto: CreateAcademicsDto): Promise<Academics> {
    const academics = this.academicsRepository.create(createAcademicsDto);
    return await this.academicsRepository.save(academics);
  }

  async editAcademics(id: number, updateAcademicsDto: UpdateAcademicsDto): Promise<Academics> {
    const academics = await this.academicsRepository.findOne({ where: { id } });
    if (!academics) {
      throw new BadRequestException(`Academics with ID ${id} not found.`);
    }
    Object.assign(academics, updateAcademicsDto);
    return this.academicsRepository.save(academics);
  }

  async deleteAcademics(id: number): Promise<void> {
    const academics = await this.academicsRepository.findOne({ where: { id } });
    if (!academics) {
      throw new BadRequestException(`Academics with ID ${id} not found.`);
    }
    await this.academicsRepository.remove(academics);
  }

  async createGrade(createGradeDto: CreateGradeDto): Promise<Grade> {
    const grade = this.gradeRepository.create(createGradeDto);
    return this.gradeRepository.save(grade);
  }

  async editGrade(id: number, updateGradeDto: UpdateGradeDto): Promise<Grade> {
    const grade = await this.gradeRepository.findOne({ where: { id } });
    if (!grade) {
      throw new BadRequestException(`Grade with ID ${id} not found.`);
    }
    Object.assign(grade, updateGradeDto);
    return this.gradeRepository.save(grade);
  }

  async deleteGrade(id: number): Promise<void> {
    const grade = await this.gradeRepository.findOne({ where: { id } });
    if (!grade) {
      throw new BadRequestException(`Grade with ID ${id} not found.`);
    }
    await this.gradeRepository.remove(grade);
  }

  async createPerformance(createPerformanceDto: CreatePerformanceDto): Promise<Performance> {
    const performance = this.performanceRepository.create(createPerformanceDto);
    return this.performanceRepository.save(performance);
  }

  async editPerformance(id: number, updatePerformanceDto: UpdatePerformanceDto): Promise<Performance> {
    const performance = await this.performanceRepository.findOne({ where: { id } });
    if (!performance) {
      throw new BadRequestException(`Performance with ID ${id} not found.`);
    }
    Object.assign(performance, updatePerformanceDto);
    return this.performanceRepository.save(performance);
  }

  async delelePerformance(id: number): Promise<void> {
    const performance = await this.performanceRepository.findOne({ where: { id } });
    if (!performance) {
      throw new BadRequestException(`Performance with ID ${id} not found.`);
    }
    await this.performanceRepository.remove(performance);
  }

  async createGPA(createGpaDto: CreateGpaDto): Promise<GPA> {
    const gpa = this.gpaRepository.create(createGpaDto);
    return this.gpaRepository.save(gpa);
  }

  async editGPA(id: number, updateGpaDto: UpdateGpaDto): Promise<GPA> {
    const gpa = await this.gpaRepository.findOne({ where: { id } });
    if (!gpa) {
      throw new BadRequestException(`GPA with ID ${id} not found.`);
    }
    Object.assign(gpa, updateGpaDto);
    return this.gpaRepository.save(gpa);
  }

  async deleteGPA(id: number): Promise<void> {
    const gpa = await this.gpaRepository.findOne({ where: { id } });
    if (!gpa) {
      throw new BadRequestException(`GPA with ID ${id} not found.`);
    }
    await this.gpaRepository.remove(gpa);
  }


}
