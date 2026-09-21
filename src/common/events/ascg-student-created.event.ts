export class AscgStudentCreatedEvent {
    constructor(
        public readonly studentId: string,
        public readonly schoolId: string,
        public readonly programId: string,
        public readonly fatherLastName?: string,
        public readonly fatherFirstName?: string,
        public readonly fatherPhone?: string,
        public readonly fatherEducation?: string,
        public readonly motherLastName?: string,
        public readonly motherFirstName?: string,
        public readonly motherPhone?: string,
        public readonly motherEducation?: string,
        public readonly numberOfBrothers?: number,
        public readonly numberOfSisters?: number,
        public readonly positionInFamily?: string,
        public readonly specilization?: string,
        public readonly favouriteSubject?: string,
        public readonly mostDifficultSubject?: string,
        public readonly careerChoice1?: string,
        public readonly careerChoice2?: string,
    ) {}
}