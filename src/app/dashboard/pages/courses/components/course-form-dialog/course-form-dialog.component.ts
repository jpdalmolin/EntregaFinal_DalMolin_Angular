import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Course } from '../../models';
import { CoursesActions } from '../../store/courses.actions';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { noHomeroValidator } from 'src/app/shared/utils/form-validators';
import { selectCoursesArray } from '../../store/courses.selectors';

@Component({
  selector: 'app-course-form-dialog',
  templateUrl: './course-form-dialog.component.html',
  styleUrls: ['./course-form-dialog.component.scss'],
})
export class CoursesFormDialogComponent implements OnInit{
  editingCourse?: Course;
  nameControl = new FormControl<string | null>(null, [
    Validators.required,
    Validators.minLength(2),
    noHomeroValidator(),
  ]);





  coursesForm = new FormGroup({
    name: this.nameControl,
   

  });
  course$:Observable<Course[]>;
  // userForm: FormGroup;

  constructor(private store:Store,private matDialogRef: MatDialogRef<CoursesFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: Course 
    ){
   
    this.course$=this.store.select(selectCoursesArray)
    // this.userForm = this.formBuilder.group({
    //   name: [null, [Validators.required, Validators.min(2)]],
    //   surname: [null, [Validators.required]],
    // });
    if (this.data) {
      this.editingCourse = this.data;
      this.nameControl.setValue(this.data.name);
      

    }
  }
  ngOnInit(): void {
    this.store.dispatch(CoursesActions.loadCourses());
  }
  

  onSubmit(): void {
    if (this.coursesForm.invalid) {
      this.coursesForm.markAllAsTouched();
    } else {
      if(this.editingCourse) {
        this.store.dispatch(CoursesActions.editCourse({payload: this.coursesForm.getRawValue() }))
      }else{
      this.store.dispatch(CoursesActions.createCourse({ payload: this.coursesForm.getRawValue() }));
      this.matDialogRef.close(this.coursesForm.value);
      }
    }
  }
}
