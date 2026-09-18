import { Category, Program } from "src/common/enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('schools')
export class School {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', nullable: false, unique: true })
    school!: string;

    @Column({ type: 'simple-enum', enum: Category })
    category!: string;

    @Column({ type: 'simple-enum', enum: Program, default: Program.ASCG })
    program!: Program;
}
