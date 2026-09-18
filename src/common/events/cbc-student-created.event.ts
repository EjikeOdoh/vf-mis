export class CbcStudentCreatedEvent {
    constructor(
        public readonly studentId: string,
        public readonly school?: string,
        public readonly priorTechEducation?: string,
        public readonly priorTechExperience?: string,
        public readonly track?: string,
        public readonly completedProgram?: boolean,
        public readonly outcomeAt6Months?: string,
        public readonly outcomeAt12Months?: string,
        public readonly roleTitle?: string,
        public readonly company?: string,
        public readonly industry?: string,
        public readonly techEngagementLevel?: string
    ) {}
}