import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export type SafeUser = Omit<User, 'passwordHash' | 'refreshTokenHash' | 'passwordResetTokenHash' | 'passwordResetTokenExpiresAt' | 'createdAt' | 'updatedAt'>;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>
  ) { }

  async findById(id: string): Promise<User | null> {
    const user = await this.userRepo
      .findOne({ where: { id } });
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepo
      .findOne({ where: { email } });
    return user;
  }

  async findByMicrosoftId(microsoftId: string): Promise<User | null> {
    const user = await this.userRepo
      .findOne({ where: { microsoftId } });
    return user;
  }

  async createUser(data: CreateUserDto): Promise<User> {
    const user = this.userRepo.create(data);
    console.log(user);
    return this.userRepo.save(user);
  }

  async linkMicrosoftId(userId: string, microsoftId: string): Promise<void> {
    await this.userRepo.update(userId, { microsoftId });
  }

  async updateRefreshTokenHash(userId: string, refreshTokenHash: string): Promise<void> {
    await this.userRepo.update(userId, { refreshTokenHash });
  }

  async clearRefreshTokenHash(userId: string): Promise<void> {
    await this.userRepo.update(userId, { refreshTokenHash: null });
  }

  async setPasswordResetToken(userId: string, passwordResetTokenHash: string, passwordResetTokenExpiresAt: Date): Promise<void> {
    await this.userRepo.update(userId, { passwordResetTokenHash, passwordResetTokenExpiresAt });
  }

  async resetPassword(userId: string, passwordHash: string) {
    await this.userRepo.update(userId, {
      passwordHash,
      passwordResetTokenHash: null,
      passwordResetTokenExpiresAt: null,
      refreshTokenHash: null
    })
  }

  async findByPasswordResetTokenHash(resetTokenHash: string) {
    const user = await this.userRepo.findOne({ where: { passwordResetTokenHash: resetTokenHash } })
    return user
  }

  toSafeUser(user: User): SafeUser {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      microsoftId: user.microsoftId,
      avatarUrl: user.avatarUrl,
    }
  }

}
