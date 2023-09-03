import { Course } from "../../courses/models";
import { User } from "../../users/models";

export interface Inscription{
    id:number;
    courseId:number;
    userId:number;
}

export interface InscriptionWithCourseAndUser extends Inscription{
    course:Course;
    user:User;
}
export interface CreateInscriptionPayload {
    courseId: number | null;
    userId: number | null;
  }