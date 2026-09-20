import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProgramParticipation } from "./entities/program-participation.entity";
import { Repository } from "typeorm";
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

    @OnEvent(StudentEvents.ASCG_STUDENT_CREATED)
    async createAscgParticipation(event: AscgStudentCreatedEvent) {

        const ascgParticipation = this.ascgRepository.create(event);
        const programParticipation = this.participationRepository.create(event);

        await this.ascgRepository.save(ascgParticipation);
        await this.participationRepository.save(programParticipation);

    }

    @OnEvent(StudentEvents.CBC_STUDENT_CREATED)
    async createCbcParticipation(event: CbcStudentCreatedEvent) {
        console.log(event);
        const cbcParticipation = this.cbcRepository.create(event);
        const programParticipation = this.participationRepository.create(event);

        await this.cbcRepository.save(cbcParticipation);
        await this.participationRepository.save(programParticipation);
    }


}