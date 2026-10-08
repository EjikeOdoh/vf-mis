import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AcademicTerm } from '../../common/enum';

@Entity()
export class Performance {
  @PrimaryGeneratedColumn('rowid')
  id!: number;

  @Column({ type: 'int' })
  year!: number;

  @Column({ type: 'enum', enum: AcademicTerm })
  term!: AcademicTerm;

  @Column({ type: 'int' })
  excellent!: number;

  @Column({ type: 'int' })
  good!: number;

  @Column({ type: 'int' })
  fair!: number;

  @Column({ type: 'int' })
  poor!: number;
}