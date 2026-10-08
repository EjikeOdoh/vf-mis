import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AcademicTerm } from '../../common/enum';

@Entity()
export class GPA {
    @PrimaryGeneratedColumn('rowid')
    id!: number;

    @Column({ type: 'int' })
    year!: number;

    @Column({ type: 'enum', enum: AcademicTerm })
    term!: AcademicTerm;

    @Column('decimal', { precision: 5, scale: 2 })
    gpa!: number;

    @Column({ type: 'int' })
    numberOfRecords!: number;

    @Column('decimal', { precision: 5, scale: 2 })
    percentage!: number;
}