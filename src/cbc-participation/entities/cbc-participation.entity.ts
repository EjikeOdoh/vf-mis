import { Cohort } from "src/common/enum";
import { Student } from "src/students/entities/student.entity";
import { Track } from "src/tracks/entities/track.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('cbc_participations')
@Unique(['studentId', 'cohort', 'trackId', 'year'])
export class CbcParticipation {
    @PrimaryGeneratedColumn('identity')
    id!: number;

    @Column({ name: 'studentId', type: 'uuid', nullable: false })
    studentId!: string;

    @ManyToOne(() => Student, (student) => student.cbcParticipation, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'studentId' })
    student!: Student;

    @Column({ type: 'simple-enum', enum: Cohort, nullable: false })
    cohort!: Cohort;

    @Column('varchar')
    trackId!: string;

    @ManyToMany(() => Track, (track) => track.id, { nullable: false })
    @JoinColumn({ name: 'trackId' })
    track!: Track;

    @Column({ type: 'integer', nullable: false })
    year!: number;
}
