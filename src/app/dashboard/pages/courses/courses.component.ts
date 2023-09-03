import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { CommonModule } from '@angular/common';
import { Course } from './models';
import { CoursesActions } from './store/courses.actions';
import { CoursesFormDialogComponent } from './components/course-form-dialog/course-form-dialog.component';
import { CoursesService } from './courses.service';
import { CoursesTableComponent } from './components/courses-table/courses-table.component';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { selectCoursesArray } from './store/courses.selectors';
import { selectCoursesDetailName } from './store/courses.selectors';
import { selectIsAdmin } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',

})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]>;

  constructor(private store: Store, private coursesService: CoursesService) {
    this.courses$ = this.store.select(selectCoursesArray);
    this.isAdmin$=this.store.select(selectIsAdmin);
  }

  displayedColumns = ['id', 'name', 'actions']
  public isAdmin$:Observable<boolean>

  ngOnInit(): void {
    this.store.dispatch(CoursesActions.loadCourses())
  }
}
