import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('programs')
export class Program {
    @PrimaryColumn()
    id!: string;

    @Column()
    program!: string;

    @Column()
    description!: string;
}
