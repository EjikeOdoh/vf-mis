import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { InjectRepository } from "@nestjs/typeorm";
import { CbcStudentCreatedEvent } from "src/common/events/cbc-student-created.event";
import { StudentEvents } from "src/students/events/student.events";
import { CbcProfile } from "./entities/cbc-profile.entity";
import { Repository } from "typeorm";
import { extractAscgProfile } from "src/students/student.utils";

@Injectable()
export class CbcProfileListener {

    constructor(
        @InjectRepository(CbcProfile) private readonly cbcProfileRepository: Repository<CbcProfile>
    ) { }

    @OnEvent(StudentEvents.STUDENT_CREATED)
    async createCbcProfile(event) {
        if (event.programId === "cbc") {
            const profile = this.cbcProfileRepository.create(event);
            await this.cbcProfileRepository.save(profile);
        }
    }
}