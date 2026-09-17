import { Student } from "src/students/entities/student.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('cbc_participations')
export class CbcParticipation {
    @PrimaryGeneratedColumn('identity')
    id!: number;

    @Column({ name: 'student_id', type: 'uuid', nullable: false })
    studentId!: string;

    @ManyToOne(() => Student, (student) => student.cbcParticipation, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'student_id' })
    student!: Student;

    @Column({ type: 'integer', nullable: false })
    year!: number;
}
