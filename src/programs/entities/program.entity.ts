import { Column, Entity, PrimaryColumn, Unique } from "typeorm";

@Entity('programs')
@Unique(['id', 'program'])
export class Program {
    @PrimaryColumn()
    id!: string;

    @Column()
    program!: string;

    @Column()
    description!: string;
}
