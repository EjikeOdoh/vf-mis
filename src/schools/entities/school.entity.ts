import { Category } from "src/common/enum";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class School {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', nullable: false, unique: true })
    school!: string;

    @Column({ type: 'enum', enum: Category })
    category!: string;
}
