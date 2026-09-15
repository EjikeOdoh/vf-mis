import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
