import { AscgParticipation } from "src/ascg-participation/entities/ascg-participation.entity";
import { AscgProfile } from "src/ascg-profile/entities/ascg-profile.entity";
import { CbcParticipation } from "src/cbc-participation/entities/cbc-participation.entity";
import { CbcProfile } from "src/cbc-profile/entities/cbc-profile.entity";
import { ProgramParticipation } from "src/program-participation/entities/program-participation.entity";
import { ScParticipation } from "src/sc-participation/entities/sc-participation.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('students')
@Unique(['combo'])
export class Student {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', nullable: false })
    firstName!: string;

    @Column({ type: 'varchar', nullable: false })
    lastName!: string;

    @Column({ type: 'varchar', nullable: true, unique: false })
    email?: string;

    @Column({ type: 'varchar', nullable: true })
    phone?: string;

    @Column({ type: 'date', nullable: false })
    dateOfBirth!: Date;

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

    @Column({type: 'boolean', default: false})
    consent!: boolean;

    @Column()
    combo!: string;

    //Automatically compute combo before save/update
    @BeforeInsert()
    @BeforeUpdate()
    setCombo() {
        if (this.firstName && this.lastName) {
            const [a, b] = [this.firstName.trim().toLowerCase(), this.lastName.trim().toLowerCase()].sort();
            this.combo = `${a}-${b}-${this.dateOfBirth}`;
        }
    }

}
