import { createFeature, createReducer, on } from '@ngrx/store';

import { COURSES_MOCK } from '../mocks';
import { Course } from '../models';
import { CoursesActions } from './courses.actions';

export const coursesesFeatureKey = 'courseses';

export interface State  {
  data:Course[]
  courseDetail:Course|null,
  loading:boolean;
  error:unknown;
}


export const initialState: State = ({
  data:[],
  courseDetail:null,
  loading:false,
  error:null,
});

export const reducer = createReducer(
  initialState,

  on(CoursesActions.loadCourses,state => {
    return{
      ...state,
      
      loading: true
    }

  }),
  on(CoursesActions.loadCoursesSuccess, (state, action) => {
    return {
      ...state,
      data: action.data,
      loading: false
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

