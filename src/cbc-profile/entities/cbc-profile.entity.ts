import { CbcOutcome, PriorTechEducation, PriorTechExperience, TechEngagement } from 'src/common/enum';
import { Student } from 'src/students/entities/student.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cbc_profile')
export class CbcProfile {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', nullable: true })
    school?: string;

    @Column({ type: 'simple-enum', enum: PriorTechEducation, nullable: true, default: PriorTechEducation.NONE })
    priorTechEducation?: PriorTechEducation;

    @Column({ type: 'simple-enum', enum: PriorTechExperience, nullable: true, default: PriorTechExperience.NONE })
    priorTechExperience?: PriorTechEducation;

    @Column({ type: 'varchar', nullable: false })
    trackId?: string;

    @Column({ type: 'boolean', nullable: true, default: true })
    completedProgram?: boolean;

    @Column({ type: 'simple-enum', enum: CbcOutcome, nullable: true })
    outcomeAt6Months?: CbcOutcome;

    @Column({ type: 'simple-enum', enum: CbcOutcome, nullable: true })
    outcomeAt12Months?: CbcOutcome;

    @Column({ type: 'varchar', nullable: true })
    roleTitle?: string;

    @Column({ type: 'varchar', nullable: true })
    company?: string;

    @Column({ type: 'varchar', nullable: true })
    industry?: string;

    @Column({ type: 'simple-enum', enum: TechEngagement, nullable: true, default: TechEngagement.UNKNOWN })
    techEngagementLevel?: TechEngagement;

    @OneToOne(() => Student, (student) => student.cbcProfile, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'student_id' })
    student!: Student;
}
