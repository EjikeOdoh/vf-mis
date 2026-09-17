import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tracks')
export class Track {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    track!: string;
}
