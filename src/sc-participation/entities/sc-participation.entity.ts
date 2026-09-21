import { CampType } from "src/common/enum";
import { Student } from "src/students/entities/student.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('sc_participations')
export class ScParticipation {
    @PrimaryGeneratedColumn('identity')
    id!: number;

    @Column({ name: 'student_id', type: 'uuid', nullable: false })
    studentId!: string;

    @ManyToOne(() => Student, (student) => student.scParticipation, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'student_id' })
    student!: Student;

    @Column({ type: 'simple-enum', enum: CampType, nullable: false })
    type!: CampType;

    @Column({ type: 'integer', nullable: false })
    year!: number;
}
