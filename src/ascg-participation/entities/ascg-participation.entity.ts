import { School } from "src/schools/entities/school.entity";
import { Student } from "src/students/entities/student.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('ascg_participations')
@Unique(['studentId', 'year'])
export class AscgParticipation {
    @PrimaryGeneratedColumn('identity')
    id!: number;

    @Column({ type: 'uuid', nullable: false })
    studentId!: string;

    @Column({ type: 'uuid', nullable: false })
    schoolId!: string;

    @Column({nullable: true})
    programId?: string;

    @ManyToOne(() => Student, (student) => student.ascgParticipation, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'studentId' })
    student!: Student;

    @Column({ type: 'integer' })
    year!: number;
}
