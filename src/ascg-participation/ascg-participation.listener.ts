import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AscgParticipation } from "./entities/ascg-participation.entity";
import { Repository } from "typeorm";
import { OnEvent } from "@nestjs/event-emitter";
import { StudentEvents } from "src/students/events/student.events";
import { AscgStudentCreatedEvent } from "src/common/events/ascg-student-created.event";

@Injectable()
export class AscgParticipationListener {
    logger = new Logger(AscgParticipationListener.name);
    constructor(
        @InjectRepository(AscgParticipation) private readonly ascgParticipationRepository: Repository<AscgParticipation>
    ) { }

    @OnEvent(StudentEvents.ASCG_STUDENT_CREATED)
    async createAscgParticipation(event: AscgStudentCreatedEvent) {
        this.logger.log(event);
        const participation = this.ascgParticipationRepository.create(event);
        return await this.ascgParticipationRepository.save(participation);
    }
}