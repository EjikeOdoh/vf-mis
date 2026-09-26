import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { InjectRepository } from "@nestjs/typeorm";
import { CbcStudentCreatedEvent } from "src/common/events/cbc-student-created.event";
import { StudentEvents } from "src/students/events/student.events";
import { CbcProfile } from "./entities/cbc-profile.entity";
import { QueryFailedError, Repository } from "typeorm";

@Injectable()
export class CbcProfileListener {

    constructor(
        @InjectRepository(CbcProfile) private readonly cbcProfileRepository: Repository<CbcProfile>
    ) { }

    @OnEvent(StudentEvents.STUDENT_CREATED)
    async createCbcProfile(event: CbcStudentCreatedEvent) {
        if (event.programId === "cbc") {
            try {
                const profile = this.cbcProfileRepository.create(event as Partial<CbcProfile>);
                await this.cbcProfileRepository.save(profile);
            } catch (error) {
                if (
                    error instanceof QueryFailedError &&
                    ((error as any).driverError?.code === 'SQLITE_CONSTRAINT_UNIQUE' ||
                        (error as any).driverError?.code === '23505' ||
                        (error as any).driverError?.message?.includes('UNIQUE constraint failed'))
                ) {
                    return;
                }

                throw error;
            }
        }
    }
}