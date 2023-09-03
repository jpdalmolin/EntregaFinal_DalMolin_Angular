import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { selectCourseOptions, selectUserOptions } from '../../store/inscription.selectors';

import { Course } from '../../../courses/models';
import { InscriptionActions } from '../../store/inscription.actions';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { User } from '../../../users/models';

@Component({
  selector: 'app-inscription-dialog',
  templateUrl: './inscription-dialog.component.html',
  styles: [
  ]
})
export class InscriptionDialogComponent implements OnInit {

    courseIdControl = new FormControl(null, Validators.required);
    userIdControl = new FormControl(null, Validators.required);

  inscriptionForm = new FormGroup({
    courseId: this.courseIdControl,
    userId: this.userIdControl,
  });

  userOptions$: Observable<User[]>;
  courseOptions$: Observable<Course[]>;

  constructor(private store: Store, private matDialogRef: MatDialogRef<InscriptionDialogComponent>) {
    this.userOptions$ = this.store.select(selectUserOptions);
    this.courseOptions$ = this.store.select(selectCourseOptions);
  }

  ngOnInit(): void {
    this.store.dispatch(InscriptionActions.loadUserOptions());
    this.store.dispatch(InscriptionActions.loadCourseOptions());
  }

  onSubmit(): void {
    if (this.inscriptionForm.invalid) {
      this.inscriptionForm.markAllAsTouched();
    } else {
      this.store.dispatch(InscriptionActions.createInscription({ payload: this.inscriptionForm.getRawValue() }));
      this.matDialogRef.close();
    }
  }
}