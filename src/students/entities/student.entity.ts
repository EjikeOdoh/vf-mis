import { AscgParticipation } from "src/ascg-participation/entities/ascg-participation.entity";
import { AscgProfile } from "src/ascg-profile/entities/ascg-profile.entity";
import { CbcParticipation } from "src/cbc-participation/entities/cbc-participation.entity";
import { CbcProfile } from "src/cbc-profile/entities/cbc-profile.entity";
import { ProgramParticipation } from "src/program-participation/entities/program-participation.entity";
import { ScParticipation } from "src/sc-participation/entities/sc-participation.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('students')
export class Student {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', nullable: false })
    firstName!: string;

    @Column({ type: 'varchar', nullable: false })
    lastName!: string;

    @Column({ type: 'varchar', nullable: true, unique: true })
    email?: string;

    @Column({ type: 'varchar', nullable: true })
    phone?: string;

    @Column({ type: 'varchar', nullable: true })
    address?: string;

    @Column({ type: 'varchar', nullable: false })
    country!: string;

    @Column({ type: 'int', nullable: false })
    yearJoined!: number;

    @OneToOne(() => AscgProfile, (profile) => profile.student)
    ascgProfile?: AscgProfile;

    @OneToOne(() => CbcProfile, (profile) => profile.student)
    cbcProfile?: CbcProfile;

    @OneToMany(() => AscgParticipation, (participation) => participation.student)
    ascgParticipation?: AscgParticipation[]

    @OneToMany(() => CbcParticipation, (participation) => participation.student)
    cbcParticipation?: CbcParticipation[]

    @OneToMany(() => ScParticipation, (participation) => participation.student)
    scParticipation?: ScParticipation[]

    @OneToMany(() => ProgramParticipation, (participation) => participation.student)
    programParticipation?: ProgramParticipation[]

}
