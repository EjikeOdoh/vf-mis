import type {
  AcademicRecord,
  AcademicTerm,
  AscgParticipationRecord,
  AscgProfileRecord,
  CbcParticipationRecord,
  CbcProfileRecord,
  GpaRecord,
  GradeRecord,
  PerformanceRecord,
  ProgramParticipationRecord,
  ProgramRecord,
  SchoolRecord,
  ScParticipationRecord,
  StudentRecord,
  TrackRecord,
} from './dtos';

export interface SafeUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string | null;
  microsoftId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResult {
  accessToken: string;
  refreshToken: string;
  user: SafeUser;
}

export interface AppControllerResponses {
  getHello: { message: string };
}

export interface AcademicsControllerResponses {
  createBatch: {
    academics: AcademicRecord[];
    gpa: GpaRecord[];
    grades: GradeRecord[];
    performance: PerformanceRecord[];
  };
  createAcademics: AcademicRecord;
  updateAcademics: AcademicRecord;
  deleteAcademics: void;
  createGrade: GradeRecord;
  updateGrade: GradeRecord;
  deleteGrade: void;
  createPerformance: PerformanceRecord;
  updatePerformance: PerformanceRecord;
  deletePerformance: void;
  createGpa: GpaRecord;
  updateGpa: GpaRecord;
  deleteGpa: void;
  findByYear: {
    year: number;
    summary: {
      year: number;
      improved: number;
      stable: number;
      declined: number;
      netGpaChange: number;
      totalRecords: number;
      averageGpa: number;
    };
    records: {
      academics: AcademicRecord[];
      gpa: GpaRecord[];
      grades: GradeRecord[];
      performance: PerformanceRecord[];
    };
    gpaTrend: Array<{
      term: AcademicTerm;
      gpa: number;
      numberOfRecords: number;
      percentage: number;
    }>;
    movementBySubject: Array<{
      subject: string;
      paired: string;
      term1: number;
      term2: number;
      term3: number;
      improved: number;
      stable: number;
      declined: number;
    }>;
    performanceByTerm: Array<{
      term: AcademicTerm;
      excellent: number;
      good: number;
      fair: number;
      poor: number;
    }>;
  };
  getAcademicSummary: {
    year: number;
    summary: {
      year: number;
      improved: number;
      stable: number;
      declined: number;
      netGpaChange: number;
      totalRecords: number;
      averageGpa: number;
    };
    records: {
      academics: AcademicRecord[];
      gpa: GpaRecord[];
      grades: GradeRecord[];
      performance: PerformanceRecord[];
    };
    gpaTrend: Array<{
      term: AcademicTerm;
      gpa: number;
      numberOfRecords: number;
      percentage: number;
    }>;
    movementBySubject: Array<{
      subject: string;
      paired: string;
      term1: number;
      term2: number;
      term3: number;
      improved: number;
      stable: number;
      declined: number;
    }>;
    performanceByTerm: Array<{
      term: AcademicTerm;
      excellent: number;
      good: number;
      fair: number;
      poor: number;
    }>;
  };
}

export interface AuthControllerResponses {
  register: AuthResult;
  login: AuthResult;
  refresh: AuthResult;
  logout: { success: true };
  getProfile: SafeUser;
  resetPassword: { success: true } | { message: string };
}

export interface ProgramsControllerResponses {
  create: ProgramRecord;
  findAll: ProgramRecord[];
  findOne: ProgramRecord;
  update: ProgramRecord;
  remove: void;
}

export interface SchoolsControllerResponses {
  create: SchoolRecord;
  deleteAll: void;
  createMany: SchoolRecord[];
  findAll: SchoolRecord[];
  findOne: SchoolRecord;
  update: SchoolRecord;
  remove: void;
}

export interface StudentsControllerResponses {
  create: StudentRecord;
  createMany: StudentRecord[];
  findAll: StudentRecord[];
  delete: void;
  findOne: StudentRecord;
  update: StudentRecord;
  remove: void;
}

export interface TracksControllerResponses {
  create: TrackRecord;
  createBatch: TrackRecord[];
  findAll: TrackRecord[];
  findOne: TrackRecord;
  update: TrackRecord;
  remove: void;
}

export interface UsersControllerResponses {
  [key: string]: never;
}

export interface ProgramParticipationControllerResponses {
  create: ProgramParticipationRecord;
  findAll: ProgramParticipationRecord[];
  findOne: ProgramParticipationRecord;
  update: ProgramParticipationRecord;
  remove: void;
}

export interface AscgParticipationControllerResponses {
  create: AscgParticipationRecord;
  findAll: AscgParticipationRecord[];
  findOne: AscgParticipationRecord;
  update: AscgParticipationRecord;
  remove: void;
}

export interface CbcParticipationControllerResponses {
  create: CbcParticipationRecord;
  findAll: CbcParticipationRecord[];
  findOne: CbcParticipationRecord;
  update: CbcParticipationRecord;
  remove: void;
}

export interface ScParticipationControllerResponses {
  create: ScParticipationRecord;
  findAll: ScParticipationRecord[];
  findOne: ScParticipationRecord;
  update: ScParticipationRecord;
  remove: void;
}

export interface AscgProfileControllerResponses {
  create: AscgProfileRecord;
  findAll: AscgProfileRecord[];
  findOne: AscgProfileRecord;
  update: AscgProfileRecord;
  remove: void;
}

export interface CbcProfileControllerResponses {
  create: CbcProfileRecord;
  findAll: CbcProfileRecord[];
  findOne: CbcProfileRecord;
  update: CbcProfileRecord;
  remove: void;
}

export interface StatsControllerResponses {
  getOverview: Record<string, unknown>;
  getReach: Record<string, unknown>;
}

export type ControllerResponseMap = {
  app: AppControllerResponses;
  academics: AcademicsControllerResponses;
  auth: AuthControllerResponses;
  programs: ProgramsControllerResponses;
  schools: SchoolsControllerResponses;
  students: StudentsControllerResponses;
  tracks: TracksControllerResponses;
  users: UsersControllerResponses;
  programParticipation: ProgramParticipationControllerResponses;
  ascgParticipation: AscgParticipationControllerResponses;
  cbcParticipation: CbcParticipationControllerResponses;
  scParticipation: ScParticipationControllerResponses;
  ascgProfile: AscgProfileControllerResponses;
  cbcProfile: CbcProfileControllerResponses;
  stats: StatsControllerResponses;
};
