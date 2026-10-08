export enum Category {
  JUNIOR = 'junior',
  SENIOR = 'senior',
}

export enum Program {
  ASCG = 'ASCG',
  CBC = 'CBC',
  SC = 'SC',
  OUTREACH = 'OUTREACH',
}

export enum AcademicTerm {
  TERM_1 = 'Term 1',
  TERM_2 = 'Term 2',
  TERM_3 = 'Term 3',
}

export enum PriorTechEducation {
  NONE = 'none',
  SELF_TAUGHT = 'self_taught',
  ONLINE_COURSE = 'online_course',
  BOOTCAMP = 'bootcamp',
  FORMAL_EDUCATION = 'formal_education',
  OTHER = 'other',
}

export enum PriorTechExperience {
  NONE = 'none',
  LESS_THAN_1_YEAR = 'less_than_1_year',
  ONE_TO_TWO_YEARS = '1_to_2_years',
  TWO_TO_THREE_YEARS = '2_to_3_years',
  THREE_PLUS_YEARS = '3_plus_years',
}

export enum CbcOutcome {
  EMPLOYED_FULL_TIME = 'employed_full_time',
  EMPLOYED_PART_TIME = 'employed_part_time',
  FREELANCE = 'freelance',
  INTERNSHIP = 'internship',
  SELF_EMPLOYED = 'self_employed',
  FURTHER_EDUCATION = 'further_education',
  UNEMPLOYED = 'unemployed',
  OTHER = 'other',
  UNKNOWN = 'unknown',
}

export enum TechEngagement {
  FULLY_ENGAGED = 'fully_engaged',
  PARTIALLY_ENGAGED = 'partially_engaged',
  NOT_ENGAGED = 'not_engaged',
  UNKNOWN = 'unknown',
}

export enum CampType {
  SSC = 'ssc',
  DSC = 'dsc',
}

export enum Cohort {
  ONE = 'one',
  TWO = 'two',
  WEEKEND = 'weekend',
}

export interface CreateAcademicsDto {
  year: number;
  improved: number;
  stable: number;
  declined: number;
}

export type UpdateAcademicsDto = Partial<CreateAcademicsDto>;

export interface CreateGpaDto {
  year: number;
  term: AcademicTerm;
  gpa: number;
  numberOfRecords: number;
  percentage: number;
}

export type UpdateGpaDto = Partial<CreateGpaDto>;

export interface CreateGradeDto {
  year: number;
  subject: string;
  paired: string;
  term1: number;
  term2: number;
  term3: number;
  improved: number;
  stable: number;
  declined: number;
}

export type UpdateGradeDto = Partial<CreateGradeDto>;

export interface CreatePerformanceDto {
  year: number;
  term: AcademicTerm;
  excellent: number;
  good: number;
  fair: number;
  poor: number;
}

export type UpdatePerformanceDto = Partial<CreatePerformanceDto>;

export interface CreateAcademicsBatchDto {
  academics: CreateAcademicsDto[];
  gpa: CreateGpaDto[];
  grades: CreateGradeDto[];
  performance: CreatePerformanceDto[];
}

export interface CreateAscgProfileDto {
  studentId?: string;
  schoolId?: string;
  fatherLastName?: string;
  fatherFirstName?: string;
  fatherPhone?: string;
  fatherEducation?: string;
  motherLastName?: string;
  motherFirstName?: string;
  motherPhone?: string;
  motherEducation?: string;
  numberOfBrothers?: string;
  numberOfSisters?: string;
  positionInFamily?: string;
  specialization?: string;
  favouriteSubject?: string;
  mostDifficultSubject?: string;
  careerChoice1?: string;
  careerChoice2?: string;
  year?: number;
}

export type UpdateAscgProfileDto = Partial<CreateAscgProfileDto>;

export interface CreateCbcProfileDto {
  school?: string;
  priorTechEducation?: string;
  priorTechExperience?: string;
  track?: string;
  completedProgram?: boolean;
  outcomeAt6Months?: string;
  outcomeAt12Months?: string;
  roleTitle?: string;
  company?: string;
  industry?: string;
  techEngagementLevel?: string;
  cohort?: Cohort;
}

export type UpdateCbcProfileDto = Partial<CreateCbcProfileDto>;

export interface CreateAscgParticipationDto {
  studentId?: string;
  schoolId: string;
  year: number;
}

export type UpdateAscgParticipationDto = Partial<CreateAscgParticipationDto>;

export interface CreateCbcParticipationDto {
  studentId?: string;
  track?: string;
  trackId?: string;
  cohort?: Cohort;
  year: number;
}

export type UpdateCbcParticipationDto = Partial<CreateCbcParticipationDto>;

export interface CreateScParticipationDto {
  studentId?: string;
  school?: string;
  type?: CampType;
  year: number;
}

export type UpdateScParticipationDto = Partial<CreateScParticipationDto>;

export interface CreateProgramParticipationDto {
  studentId?: string;
  programId?: string;
  year: number;
}

export type UpdateProgramParticipationDto = Partial<CreateProgramParticipationDto>;

export interface CreateSchoolDto {
  id: string;
  school: string;
  category: Category;
}

export type UpdateSchoolDto = Partial<CreateSchoolDto>;

export interface CreateProgramDto {
  program: Program;
  description: string;
}

export type UpdateProgramDto = Partial<CreateProgramDto>;

export interface CreateTrackDto {
  track: string;
}

export type UpdateTrackDto = Partial<CreateTrackDto>;

export interface CreateUserDto {
  name: string;
  email: string;
  passwordHash?: string;
  avatarUrl?: string;
  microsoftId?: string;
}

export type UpdateUserDto = Partial<CreateUserDto>;

export type CreateStudentDto =
  CreateAscgProfileDto &
  CreateCbcProfileDto &
  CreateAscgParticipationDto &
  CreateScParticipationDto &
  CreateCbcParticipationDto & {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    email?: string;
    phone?: string;
    address?: string;
    country: string;
    yearJoined: number;
    programId?: string;
  };

export type UpdateStudentDto = Partial<CreateStudentDto>;

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RefreshTokenDto {
  refreshToken: string;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  token: string;
  newPassword: string;
}

export interface AcademicRecord {
  id: number;
  year: number;
  improved: number;
  stable: number;
  declined: number;
}

export interface GpaRecord {
  id: number;
  year: number;
  term: AcademicTerm;
  gpa: number;
  numberOfRecords: number;
  percentage: number;
}

export interface GradeRecord {
  id: number;
  year: number;
  subject: string;
  paired: string;
  term1: number;
  term2: number;
  term3: number;
  improved: number;
  stable: number;
  declined: number;
}

export interface PerformanceRecord {
  id: number;
  year: number;
  term: AcademicTerm;
  excellent: number;
  good: number;
  fair: number;
  poor: number;
}

export interface SchoolRecord {
  id: string;
  school: string;
  category: Category;
  program: Program;
}

export interface ProgramRecord {
  id: string;
  program: Program;
  description: string;
}

export interface TrackRecord {
  id: number;
  track: string;
}

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  microsoftId?: string | null;
  avatarUrl?: string | null;
  passwordHash?: string | null;
  refreshTokenHash?: string | null;
  passwordResetTokenHash?: string | null;
  passwordResetTokenExpiresAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface StudentRecord {
  id: string;
  firstName: string;
  lastName: string;
  email?: string | null;
  phone?: string | null;
  dateOfBirth: string;
  address?: string | null;
  country: string;
  yearJoined: number;
  consent: boolean;
  combo: string;
  programId?: string | null;
}

export interface AscgProfileRecord {
  id: number;
  studentId?: string | null;
  schoolId?: string | null;
  fatherLastName?: string | null;
  fatherFirstName?: string | null;
  fatherPhone?: string | null;
  fatherEducation?: string | null;
  motherLastName?: string | null;
  motherFirstName?: string | null;
  motherPhone?: string | null;
  motherEducation?: string | null;
  numberOfBrothers?: string | null;
  numberOfSisters?: string | null;
  positionInFamily?: string | null;
  specialization?: string | null;
  favouriteSubject?: string | null;
  mostDifficultSubject?: string | null;
  careerChoice1?: string | null;
  careerChoice2?: string | null;
  year?: number | null;
}

export interface CbcProfileRecord {
  id: number;
  school?: string | null;
  priorTechEducation?: string | null;
  priorTechExperience?: string | null;
  track?: string | null;
  completedProgram?: boolean | null;
  outcomeAt6Months?: string | null;
  outcomeAt12Months?: string | null;
  roleTitle?: string | null;
  company?: string | null;
  industry?: string | null;
  techEngagementLevel?: string | null;
  cohort?: Cohort | null;
}

export interface AscgParticipationRecord {
  id: number;
  studentId?: string | null;
  schoolId: string;
  year: number;
}

export interface CbcParticipationRecord {
  id: number;
  studentId?: string | null;
  track?: string | null;
  trackId?: string | null;
  cohort?: Cohort | null;
  year: number;
}

export interface ScParticipationRecord {
  id: number;
  studentId?: string | null;
  school?: string | null;
  type?: CampType | null;
  year: number;
}

export interface ProgramParticipationRecord {
  id: number;
  studentId?: string | null;
  programId?: string | null;
  year: number;
}
