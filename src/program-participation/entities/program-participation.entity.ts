import { Program } from "src/programs/entities/program.entity";
import { Student } from "src/students/entities/student.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('program_participations')
@Unique(['studentId', 'programId', 'year'])
export class ProgramParticipation {
    @PrimaryGeneratedColumn('identity')
    id!: number;

    @Column({ type: 'uuid', nullable: false })
    studentId!: string;

    @Column({ type: 'varchar', nullable: false })
    programId!: string;

    @ManyToOne(() => Student, (student) => student.programParticipation, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'studentId' })
    student!: Student;

    @Column({ type: 'integer', nullable: false })
    year!: number;
}
