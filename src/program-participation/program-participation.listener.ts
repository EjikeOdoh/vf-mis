import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProgramParticipation } from "./entities/program-participation.entity";
import { QueryFailedError, Repository } from "typeorm";
import { AscgParticipation } from "src/ascg-participation/entities/ascg-participation.entity";
import { CbcParticipation } from "src/cbc-participation/entities/cbc-participation.entity";
import { ScParticipation } from "src/sc-participation/entities/sc-participation.entity";
import { OnEvent } from "@nestjs/event-emitter";
import { StudentEvents } from "src/students/events/student.events";
import { AscgStudentCreatedEvent } from "src/common/events/ascg-student-created.event";
import { CbcStudentCreatedEvent } from "src/common/events/cbc-student-created.event";

@Injectable()
export class ProgramParticipationListener {
    constructor(
        @InjectRepository(ProgramParticipation) private readonly participationRepository: Repository<ProgramParticipation>,
        @InjectRepository(AscgParticipation) private readonly ascgRepository: Repository<AscgParticipation>,
        @InjectRepository(CbcParticipation) private readonly cbcRepository: Repository<CbcParticipation>,
        @InjectRepository(ScParticipation) private readonly scRepository: Repository<ScParticipation>
    ) { }

    private isUniqueConstraintError(error: unknown): boolean {
        return (
            error instanceof QueryFailedError &&
            ((error as any).driverError?.code === 'SQLITE_CONSTRAINT_UNIQUE' ||
                (error as any).driverError?.code === '23505' ||
                (error as any).driverError?.message?.includes('UNIQUE constraint failed'))
        );
    }

    @OnEvent(StudentEvents.STUDENT_CREATED)
    async createParticipation(event) {
        try {
            console.debug('[ProgramParticipationListener] STUDENT_CREATED event payload=%o', event);
            const programParticipation = this.participationRepository.create(event as any);
            await this.participationRepository.save(programParticipation);
        } catch (error) {
            if (this.isUniqueConstraintError(error)) {
                return;
            }
            throw error;
        }
    }

    @OnEvent(StudentEvents.ASCG_STUDENT_CREATED)
    async createAscgParticipation(event: AscgStudentCreatedEvent) {
        try {
            const ascgParticipation = this.ascgRepository.create(event as any);
            await this.ascgRepository.save(ascgParticipation);
        } catch (error) {
            if (this.isUniqueConstraintError(error)) {
                return;
            }
            throw error;
        }
    }

    @OnEvent(StudentEvents.CBC_STUDENT_CREATED)
    async createCbcParticipation(event: CbcStudentCreatedEvent) {
        try {
            const cbcParticipation = this.cbcRepository.create(event as any);
            await this.cbcRepository.save(cbcParticipation);
        } catch (error) {
            if (this.isUniqueConstraintError(error)) {
                return;
            }
            throw error;
        }
    }

    @OnEvent(StudentEvents.SC_STUDENT_CREATED)
    async createScParticipation(event) {
        try {
            const scParticipation = this.scRepository.create(event as any);
            await this.scRepository.save(scParticipation);
        } catch (error) {
            if (this.isUniqueConstraintError(error)) {
                return;
            }
            throw error;
        }
    }

}