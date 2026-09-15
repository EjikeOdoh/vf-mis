import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SchoolsModule } from './schools/schools.module';
import { StudentsModule } from './students/students.module';
import { AscgProfileModule } from './ascg-profile/ascg-profile.module';
import { CbcProfileModule } from './cbc-profile/cbc-profile.module';
import { ProgramsModule } from './programs/programs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.getOrThrow<string>('CONNECTION_STRING'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    SchoolsModule,
    StudentsModule,
    AscgProfileModule,
    CbcProfileModule,
    ProgramsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
