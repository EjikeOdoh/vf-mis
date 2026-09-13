import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name!: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  email!: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: true })
  microsoftId?: string;

  @Column({ type: 'varchar', length: 512, nullable: true })
  avatarUrl?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  passwordHash!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  refreshTokenHash?: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  passwordResetTokenHash?: string | null;

  @Column({ type: 'timestamptz', nullable: true })
  passwordResetTokenExpiresAt?: Date | null;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}
