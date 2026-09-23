import { Student } from "src/students/entities/student.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('ascg_participations')
export class AscgParticipation {
    @PrimaryGeneratedColumn('identity')
    id!: number;

    @Column({ name: 'studentId', type: 'uuid', nullable: false })
    studentId!: string;

    @Column({ name: 'schoolId', type: 'uuid', nullable: false })
    schoolId!: string;

    @ManyToOne(() => Student, (student) => student.ascgParticipation, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'studentId' })
    student!: Student;

    @Column({ type: 'integer' })
    year!: number;
}
