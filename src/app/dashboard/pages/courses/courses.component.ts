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

  constructor(private store: Store, private matDialog:MatDialog,private coursesService: CoursesService) {
    this.courses$ = this.store.select(selectCoursesArray);
    this.isAdmin$=this.store.select(selectIsAdmin);
  }

  displayedColumns = ['id', 'name', 'actions']
  public isAdmin$:Observable<boolean>

  ngOnInit(): void {
    this.store.dispatch(CoursesActions.loadCourses())
  }
  onAdd(): void {
    this.matDialog.open(CoursesFormDialogComponent);
  }
  onDelete(id: number): void {
    this.coursesService.deleteCoursesById(id);
  }
  onEditCourse(courseToEdit: Course): void {
    this.matDialog
      // ABRO EL MODAL
      .open(CoursesFormDialogComponent, {
        // LE ENVIO AL MODAL, EL USUARIO QUE QUIERO EDITAR
        data: courseToEdit,
      })
      // Y DESPUES DE QUE CIERRE
      .afterClosed()
      // HAGO ESTO...
      .subscribe({
        next: (courseUpdated) => {
          if (courseUpdated) {
            this.coursesService.updateCoursesById(courseToEdit.id, courseUpdated);
          }
        },
      });
  }
}
