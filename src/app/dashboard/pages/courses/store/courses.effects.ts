import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { ActivatedRoute } from '@angular/router';
import { Course } from '../models';
import { CoursesActions } from './courses.actions';
import { CreateCoursePayload } from '../models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UpdateCoursesData } from '../models';
import { catchError } from 'rxjs/operators';
import { concatMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { selectCoursesDetailId } from './courses.selectors';

@Injectable()
export class CoursesEffects {

  courseEditId$:Observable<number|undefined>;
  loadCoursess$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CoursesActions.loadCourses),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(()=>
      this.getCoursesFromDB().pipe(
        map(data=>CoursesActions.loadCoursesSuccess({data})),
        catchError(error=>of(CoursesActions.loadCoursesFailure({error}))))
        )
    );
  });

 

  createCourse$ = createEffect(() => {
    return this.actions$.pipe(

      // SOLO FILTRO AQUELLAS ACCIONES QUE SEAN DE TIPO SaleActions.loadSales
      ofType(CoursesActions.createCourse),


      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.createCourse(action.payload).pipe(

          // SI TODO SALE BIEN....
          map(data => CoursesActions.createCourseSuccess({ data })),


          // SI TODO SALE MAL...
          catchError(error => of(CoursesActions.createCourseFailure({ error }))))
      )
    );
  });

  createCourseSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      // SOLO FILTRO AQUELLAS ACCIONES QUE SEAN DE TIPO SaleActions.loadSales
      ofType(CoursesActions.createCourseSuccess),
      map(() => this.store.dispatch(CoursesActions.loadCourses()))
    );
  }, { dispatch: false });

  editCourse$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CoursesActions.editCourse),
      
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap((action)=>
      this.editCourse(action.payload).pipe(
        map(data=>CoursesActions.editCourseSuccess({data})),
        catchError(error=>of(CoursesActions.editCourseFailure({error}))))
        )
    );
  });
  editCourseSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      // SOLO FILTRO AQUELLAS ACCIONES QUE SEAN DE TIPO SaleActions.loadSales
      ofType(CoursesActions.editCourseSuccess),
      map(() => this.store.dispatch(CoursesActions.loadCourses()))
    );
  }, { dispatch: false });

  constructor(private actions$: Actions,private httpClient:HttpClient,private store:Store,private activatedRoute: ActivatedRoute ) {
    this.courseEditId$=this.store.select(selectCoursesDetailId)
  }

  private getCoursesFromDB():Observable<Course[]>{
    return this.httpClient.get<Course[]>(environment.baseApiUrl+'/courses')
  }

  private createCourse(payload: CreateCoursePayload): Observable<Course> {
    return this.httpClient.post<Course>(environment.baseApiUrl + '/courses', payload)
  }
  private editCourse(payload:UpdateCoursesData): Observable<Course> {
  return this.httpClient.put<Course>(environment.baseApiUrl + '/courses/'+this.activatedRoute.snapshot.params['id'], payload)
  }
  
 



}
