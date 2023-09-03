export interface Course {
  id: number;
  name: string;
}
export interface CreateCoursesData {
  name: string;
  id: number;
}

export interface UpdateCoursesData {
  name?: string;
  id?:number
}
