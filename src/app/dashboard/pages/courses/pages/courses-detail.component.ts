import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { CoursesActions } from '../store/courses.actions';
import { CoursesModule } from '../courses.module';
import { MatIcon } from '@angular/material/icon';
import { MatTable } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import {Observable} from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { Store } from '@ngrx/store';
import { User } from '../../users/models';
import { UserService } from '../../users/user.service';
import { selectCoursesDetailName } from '../store/courses.selectors';

@Component({
  selector: 'app-courses-detail',
  templateUrl: './courses-detail.component.html',
  styles: [
  ]
})

export class CoursesDetailComponent implements OnInit {

    displayedColumns= ['id','name']
    users:User[] = [];
    courseName$:Observable<string|undefined>;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private userService: UserService,
    private store:Store,
    ) {
    console.log(this.activatedRoute.snapshot.params);
    this.courseName$=this.store.select(selectCoursesDetailName)
  }
  ngOnInit(): void {
      this.store.dispatch(CoursesActions.loadCoursesDetail({courseId: this.activatedRoute.snapshot.params['id']}))
      this.userService.getUsersByCoursesId(this.activatedRoute.snapshot.params['id'])
      .subscribe({
        next:(users)=>(this.users=users),
      }

      )
  }
}