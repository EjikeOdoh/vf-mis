import { Student } from 'src/students/entities/student.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cbc_profile')
export class CbcProfile {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', nullable: true })
    school?: string;

    @Column({ type: 'varchar', nullable: true })
    priorTechEducation?: string;

    @Column({ type: 'varchar', nullable: true })
    priorTechExperience?: string;

    @Column({ type: 'varchar', nullable: true })
    track?: string;

    @Column({ type: 'boolean', nullable: true })
    completedProgram?: boolean;

    @Column({ type: 'varchar', nullable: true })
    outcomeAt6Months?: string;

    @Column({ type: 'varchar', nullable: true })
    outcomeAt12Months?: string;

    @Column({ type: 'varchar', nullable: true })
    roleTitle?: string;

    @Column({ type: 'varchar', nullable: true })
    company?: string;

    @Column({ type: 'varchar', nullable: true })
    industry?: string;

    @Column({ type: 'varchar', nullable: true })
    techEngagementLevel?: string;

    @OneToOne(() => Student, (student) => student.cbcProfile, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'student_id' })
    student!: Student;
}
