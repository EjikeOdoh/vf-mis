import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tracks')
export class Track {
    @PrimaryGeneratedColumn('identity')
    id!: number;

    @Column({ type: 'varchar', unique: true })
    track!: string;
}
