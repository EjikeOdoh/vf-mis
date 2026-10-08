import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Grade {
  @PrimaryGeneratedColumn('rowid')
  id!: number;

  @Column({ type: 'int' })
  year!: number;

  @Column()
  subject!: string;

  @Column()
  paired!: string;

  @Column({ type: 'int' })
  term1!: number;

  @Column({ type: 'int' })
  term2!: number;

  @Column({ type: 'int' })
  term3!: number;

  @Column({ type: 'int' })
  improved!: number;

  @Column({ type: 'int' })
  stable!: number;

  @Column({ type: 'int' })
  declined!: number;
}