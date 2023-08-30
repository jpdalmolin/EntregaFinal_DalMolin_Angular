import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { CommonModule } from '@angular/common';
import { Course } from './models';
import { CoursesActions } from './store/courses.actions';
import { CoursesFormDialogComponent } from './components/course-form-dialog/course-form-dialog.component';
import { CoursesTableComponent } from './components/courses-table/courses-table.component';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { selectCoursesArray } from './store/courses.selectors';
import { selectCoursesDetailName } from './store/courses.selectors';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',

})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]>;

  constructor(private store: Store) {
    this.courses$ = this.store.select(selectCoursesArray);
  }

  displayedColumns = ['id', 'name', 'actions']

  ngOnInit(): void {
    this.store.dispatch(CoursesActions.loadCourses())
  }
}
