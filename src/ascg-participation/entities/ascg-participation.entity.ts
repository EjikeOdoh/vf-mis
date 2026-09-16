import { Student } from "src/students/entities/student.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('ascg_participations')
export class AscgParticipation {
    @PrimaryGeneratedColumn('identity')
    id!: number;

    @Column({ name: 'student_id', type: 'uuid', nullable: false })
    studentId!: string;

    @ManyToOne(() => Student, (student) => student.ascgParticipation, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'student_id' })
    student!: Student;

    @Column({type:'integer'})
    year!: number;
}
