import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Courses } from './courses.model';

export const CoursesActions = createActionGroup({
  source: 'Courses/API',
  events: {
    'Load Courses': emptyProps(),
    'Load Courses Detail': props<{ courseId: number }>(),
  }
});
