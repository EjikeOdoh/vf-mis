import { Injectable, Logger } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { InjectRepository } from "@nestjs/typeorm";
import { AscgStudentCreatedEvent } from "src/common/events/ascg-student-created.event";
import { StudentEvents } from "src/students/events/student.events";
import { AscgProfile } from "./entities/ascg-profile.entity";
import { Repository } from "typeorm";

@Injectable()
export class AscgProfileListener {

    constructor(
        @InjectRepository(AscgProfile) private readonly ascgProfileRepository: Repository<AscgProfile>
    ) { }

    @OnEvent(StudentEvents.ASCG_STUDENT_CREATED)
    async createProfile(event: AscgStudentCreatedEvent) {
        Logger.log(event);
        const profile = this.ascgProfileRepository.create(event);
        return await this.ascgProfileRepository.save(profile);
    }
}