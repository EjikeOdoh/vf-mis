import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Academics {
  @PrimaryGeneratedColumn('rowid')
  id!: number;

  @Column({ type: 'int' })
  year!: number;

  @Column({ type: 'int' })
  improved!: number;

  @Column({ type: 'int' })
  stable!: number;

  @Column({ type: 'int' })
  declined!: number;
}