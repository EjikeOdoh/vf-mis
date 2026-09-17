import { Program } from "src/programs/entities/program.entity";
import { Student } from "src/students/entities/student.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('program_participations')
export class ProgramParticipation {
    @PrimaryGeneratedColumn('identity')
    id!: number;

    @Column({ name: 'student_id', type: 'uuid', nullable: false })
    studentId!: string;

    @Column({ name: 'program_id', type: 'varchar', nullable: false })
    programId!: string;

    @ManyToOne(() => Student, (student) => student.programParticipation, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'student_id' })
    student!: Student;

    @ManyToOne(() => Program, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'program_id' })
    program!: Program;

    @Column({ type: 'integer', nullable: false })
    year!: number;
}
