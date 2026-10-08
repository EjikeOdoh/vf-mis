import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AcademicsModule } from './academics/academics.module';
import { AscgParticipationModule } from './ascg-participation/ascg-participation.module';
import { AscgProfileModule } from './ascg-profile/ascg-profile.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AccessTokenGuard } from './auth/guards/access-token.guard';
import { CbcParticipationModule } from './cbc-participation/cbc-participation.module';
import { CbcProfileModule } from './cbc-profile/cbc-profile.module';
import { ProgramParticipationModule } from './program-participation/program-participation.module';
import { ProgramsModule } from './programs/programs.module';
import { ScParticipationModule } from './sc-participation/sc-participation.module';
import { SchoolsModule } from './schools/schools.module';
import { StatsModule } from './stats/stats.module';
import { StudentsModule } from './students/students.module';
import { TracksModule } from './tracks/tracks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: 'postgres',
        url: configService.get<string>('CONNECTION_STRING'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    EventEmitterModule.forRoot(),
    JwtModule.register({}),
    AuthModule,
    SchoolsModule,
    StudentsModule,
    AscgProfileModule,
    CbcProfileModule,
    ProgramsModule,
    AscgParticipationModule,
    CbcParticipationModule,
    ScParticipationModule,
    ProgramParticipationModule,
    TracksModule,
    StatsModule,
    AcademicsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
})
export class AppModule {}
