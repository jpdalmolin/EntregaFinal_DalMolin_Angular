import { createFeature, createReducer, on } from '@ngrx/store';

import { COURSES_MOCK } from '../mocks';
import { Course } from '../models';
import { CoursesActions } from './courses.actions';

export const coursesesFeatureKey = 'courseses';

export interface State  {
  courses:Course[]
  courseDetail:Course|null,
}


export const initialState: State = ({
  courses:[],
  courseDetail:null,
});

export const reducer = createReducer(
  initialState,

  on(CoursesActions.loadCourses,state => {
    return{
      ...state,
      courses:COURSES_MOCK
    }

  }),

  on(CoursesActions.loadCoursesDetail, (state, action) => {
    return {
      ...state,
      courseDetail: COURSES_MOCK.find((c) => c.id == action.courseId) || null,
    }
  })

  
 
);

export const coursesesFeature = createFeature({
  name: coursesesFeatureKey,
  reducer,
  
});

