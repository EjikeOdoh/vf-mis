import { Student } from "src/students/entities/student.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('ascg_profile')
export class AscgProfile {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', nullable: true })
    studentId?: string;

    @Column({ type: 'varchar', nullable: true })
    schoolId?: string;

    @Column({ type: 'varchar', nullable: true })
    fatherLastName?: string;

    @Column({ type: 'varchar', nullable: true })
    fatherFirstName?: string;

    @Column({ type: 'varchar', nullable: true })
    fatherPhone?: string;

    @Column({ type: 'varchar', nullable: true })
    fatherEducation?: string;

    @Column({ type: 'varchar', nullable: true })
    motherLastName?: string;

    @Column({ type: 'varchar', nullable: true })
    motherFirstName?: string;

    @Column({ type: 'varchar', nullable: true })
    motherPhone?: string;

    @Column({ type: 'varchar', nullable: true })
    motherEducation?: string;

    @Column({ type: 'int', nullable: true })
    numberOfBrothers?: number;

    @Column({ type: 'int', nullable: true })
    numberOfSisters?: number;

    @Column({ type: 'varchar', nullable: true })
    posistionInFamily?: string;

    @Column({ type: 'varchar', nullable: true })
    specialization?: string;

    @Column({ type: 'varchar', nullable: true })
    favouriteSubject?: string;

    @Column({ type: 'varchar', nullable: true })
    mostDifficultSubject?: string;

    @Column({ type: 'varchar', nullable: true })
    careerChoice1?: string;

    @Column({ type: 'varchar', nullable: true })
    careerChoice2?: string;

    @OneToOne(() => Student, (student) => student.ascgProfile, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'student_id' })
    student!: Student;
}
