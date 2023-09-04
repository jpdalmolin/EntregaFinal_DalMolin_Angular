import { Course, UpdateCoursesData } from '../models';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { CreateCoursePayload } from '../models';
import { HttpErrorResponse } from '@angular/common/http';

export const CoursesActions = createActionGroup({
  source: 'Courses/API',
  events: {
    'Load Courses': emptyProps(),
    'Load Courses Success': props<{ data: Course[] }>(),
    'Load Courses Failure': props<{ error: HttpErrorResponse }>(),
    
    'Load Courses Detail': props<{ courseId: number }>(),
    'Load Courses Detail Success': props<{ data: Course[] }>(),
    'Load Courses Detail Failure': props<{ error: HttpErrorResponse }>(),

    'Create Course': props<{ payload: CreateCoursePayload }>(),
    'Create Course Success': props<{ data: Course }>(),
    'Create Course Failure': props<{ error: HttpErrorResponse }>(),

    'Edit Course': props<{ payload: UpdateCoursesData }>(),
    'Edit Course Success': props<{ data: Course }>(),
    'Edit Course Failure': props<{ error: HttpErrorResponse }>(),
   
  }
});
