import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { InjectRepository } from "@nestjs/typeorm";
import { AscgStudentCreatedEvent } from "src/common/events/ascg-student-created.event";
import { StudentEvents } from "src/students/events/student.events";
import { AscgProfile } from "./entities/ascg-profile.entity";
import { QueryFailedError, Repository } from "typeorm";

@Injectable()
export class AscgProfileListener {

    constructor(
        @InjectRepository(AscgProfile) private readonly ascgProfileRepository: Repository<AscgProfile>
    ) { }

    @OnEvent(StudentEvents.STUDENT_CREATED)
    async createProfile(event: AscgStudentCreatedEvent) {
        if (event.programId !== "cbc") {
            try {
                const profile = this.ascgProfileRepository.create(event);
                return await this.ascgProfileRepository.save(profile);
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