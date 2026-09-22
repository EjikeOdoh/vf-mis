import { CampType } from "src/common/enum";
import { Student } from "src/students/entities/student.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('sc_participations')
@Unique(['studentId', 'type', 'year'])
export class ScParticipation {
    @PrimaryGeneratedColumn('identity')
    id!: number;

    @Column({ name: 'studentId', type: 'uuid', nullable: false })
    studentId!: string;

    @ManyToOne(() => Student, (student) => student.scParticipation, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'studentId' })
    student!: Student;

    @Column({ type: 'simple-enum', enum: CampType, nullable: false })
    type!: CampType;

    @Column({ type: 'integer', nullable: false })
    year!: number;
}
