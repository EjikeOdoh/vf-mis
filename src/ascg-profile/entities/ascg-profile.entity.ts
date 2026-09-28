import { School } from "src/schools/entities/school.entity";
import { Student } from "src/students/entities/student.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('ascg_profile')
@Unique(['studentId', 'schoolId'])
export class AscgProfile {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', nullable: true })
    studentId?: string;

    @Column({ type: 'varchar', nullable: true })
    schoolId?: string;

    @ManyToOne(() => School, { nullable: true })
    @JoinColumn({ name: 'schoolId' })
    school?: School;

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

    @Column({ type: 'varchar', nullable: true })
    numberOfBrothers?: string;

    @Column({ type: 'varchar', nullable: true })
    numberOfSisters?: string;

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
    @JoinColumn({ name: 'studentId' })
    student!: Student;
}
