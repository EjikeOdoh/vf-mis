import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { AscgStudentCreatedEvent } from "src/common/events/ascg-student-created.event";
import { StudentEvents } from "src/students/events/student.events";

@Injectable()
export class AscgProfileListener {

    @OnEvent(StudentEvents.STUDENT_CREATED)
    async createProfile(event: AscgStudentCreatedEvent) {
        console.log(event);
    }
}