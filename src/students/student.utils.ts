import { CreateAscgProfileDto } from 'src/ascg-profile/dto/create-ascg-profile.dto';
import { CreateStudentDto } from './dto/create-student.dto';
import { CreateCbcProfileDto } from 'src/cbc-profile/dto/create-cbc-profile.dto';
import { CreateAscgParticipationDto } from 'src/ascg-participation/dto/create-ascg-participation.dto';
import { CreateCbcParticipationDto } from 'src/cbc-participation/dto/create-cbc-participation.dto';
import { CreateScParticipationDto } from 'src/sc-participation/dto/create-sc-participation.dto';
import { CreateProgramDto } from 'src/programs/dto/create-program.dto';
import { CreateProgramParticipationDto } from 'src/program-participation/dto/create-program-participation.dto';

const ASCG_PROFILE_KEYS = [
  'year',
  'schoolId',
  'fatherLastName',
  'fatherFirstName',
  'fatherPhone',
  'fatherEducation',
  'motherLastName',
  'motherFirstName',
  'motherPhone',
  'motherEducation',
  'numberOfBrothers',
  'numberOfSisters',
  'positionInFamily',
  'specialization',
  'favouriteSubject',
  'mostDifficultSubject',
  'careerChoice1',
  'careerChoice2',
] satisfies readonly (keyof CreateAscgProfileDto)[];

const CBC_PROFILE_KEYS = [
  'cohort',
  'school',
  'priorTechEducation',
  'priorTechExperience',
  'track',
  'completedProgram',
  'outcomeAt6Months',
  'outcomeAt12Months',
  'roleTitle',
  'company',
  'industry',
  'techEngagementLevel',
] satisfies readonly (keyof CreateCbcProfileDto)[];


const ASCG_PARTICIPATION_KEYS = [
    'schoolId',
    'year'
] satisfies readonly (keyof CreateAscgParticipationDto)[];

const CBC_PARTICIPATION_KEYS = [
    'cohort',
    'track',
    'trackId',
    'year',

] satisfies readonly (keyof CreateCbcParticipationDto)[]

const SC_PARTICIPATION_KEYS = [
    'type',
    'year'
] satisfies readonly (keyof CreateScParticipationDto)[]

const PROGRAM_PARTICIPATION_KEYS = [
    'programId',
    'year'
] satisfies readonly (keyof CreateProgramParticipationDto)[]


function pick<T extends object, K extends keyof T>(
  object: T,
  keys: readonly K[],
): Pick<T, K> {
  return keys.reduce((result, key) => {
    if (object[key] !== undefined) {
      result[key] = object[key];
    }

    return result;
  }, {} as Pick<T, K>);
}

export function extractAscgProfile(
  dto: CreateStudentDto,
): CreateAscgProfileDto {
  return pick(dto, ASCG_PROFILE_KEYS) as CreateAscgProfileDto;
}

export function extractCbcProfile(
  dto: CreateStudentDto,
): CreateCbcProfileDto {
  return pick(dto, CBC_PROFILE_KEYS) as CreateCbcProfileDto;
}

export function extractAscgParticipation(dto: CreateStudentDto): CreateAscgParticipationDto {
  return pick(dto, ASCG_PARTICIPATION_KEYS) as CreateAscgParticipationDto;
}

export function extractCbcParticipation(dto: CreateStudentDto): CreateCbcParticipationDto {
    return pick(dto, CBC_PARTICIPATION_KEYS);
}

export function extractScParticipation(dto: CreateStudentDto): CreateScParticipationDto {
    return pick(dto, SC_PARTICIPATION_KEYS)
}

export function extractProgramParticipation(dto: CreateStudentDto): CreateProgramParticipationDto {
    return pick(dto, PROGRAM_PARTICIPATION_KEYS)
}