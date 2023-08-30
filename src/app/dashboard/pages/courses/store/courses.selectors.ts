import * as fromCourses from './courses.reducer';

import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectCoursesState = createFeatureSelector<fromCourses.State>(
  fromCourses.coursesesFeatureKey
);


export const selectCoursesArray = createSelector(selectCoursesState, (state) => state.courses)

export const selectCoursesDetailName = createSelector(selectCoursesState, (state) => state.courseDetail?.name)