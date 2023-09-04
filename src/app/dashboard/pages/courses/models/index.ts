export interface Course {
  id: number;
  name: string;
}
export interface CreateCoursesData {
  name: string;
  id: number;
}

export interface UpdateCoursesData {
  name?: string|null;

}

export interface CreateCoursePayload{
  name:string|null;
  
}
