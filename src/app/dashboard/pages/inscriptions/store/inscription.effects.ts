import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, Observable, of } from 'rxjs';
import { Inscription, InscriptionWithCourseAndUser } from '../models';
import { catchError, concatMap } from 'rxjs/operators';
import { map, take } from 'rxjs/operators';

import { Course } from '../../courses/models';
import { CreateInscriptionPayload } from '../models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InscriptionActions } from './inscription.actions';
import { Store } from '@ngrx/store';
import { User } from '../../users/models';
import { environment } from 'src/environments/environment';

@Injectable()
export class InscriptionEffects {


  loadInscriptions$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscriptionActions.loadInscriptions),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(()=>
      this.getInscriptionsFromDB().pipe(
        map(data=>InscriptionActions.loadInscriptionsSuccess({data})),
        catchError(error=>of(InscriptionActions.loadInscriptionsFailure({error}))))
        )
        );
      });



      loadUserOptions$ = createEffect(() => {
        return this.actions$.pipe(
    
          // SOLO FILTRO AQUELLAS ACCIONES QUE SEAN DE TIPO SaleActions.loadSales
          ofType(InscriptionActions.loadUserOptions),
    
    
          concatMap(() =>
            /** An EMPTY observable only emits completion. Replace with your own observable API request */
            this.getUserOptions().pipe(
    
              // SI TODO SALE BIEN....
              map(data => InscriptionActions.loadUserOptionsSuccess({ data })),
    
    
              // SI TODO SALE MAL...
              catchError(error => of(InscriptionActions.loadUserOptionsFailure({ error }))))
          )
        );
      });
    
      loadCourseOptions$ = createEffect(() => {
        return this.actions$.pipe(
    
          // SOLO FILTRO AQUELLAS ACCIONES QUE SEAN DE TIPO SaleActions.loadSales
          ofType(InscriptionActions.loadCourseOptions),
    
    
          concatMap(() =>
            /** An EMPTY observable only emits completion. Replace with your own observable API request */
            this.getCourseOptions().pipe(
    
              // SI TODO SALE BIEN....
              map(data => InscriptionActions.loadCourseOptionsSuccess({ data })),
    
    
              // SI TODO SALE MAL...
              catchError(error => of(InscriptionActions.loadCourseOptionsFailure({ error }))))
          )
        );
      });
    
    
      createInscription$ = createEffect(() => {
        return this.actions$.pipe(
    
          // SOLO FILTRO AQUELLAS ACCIONES QUE SEAN DE TIPO SaleActions.loadSales
          ofType(InscriptionActions.createInscription),
    
    
          concatMap((action) =>
            /** An EMPTY observable only emits completion. Replace with your own observable API request */
            this.createInscription(action.payload).pipe(
    
              // SI TODO SALE BIEN....
              map(data => InscriptionActions.createInscriptionSuccess({ data })),
    
    
              // SI TODO SALE MAL...
              catchError(error => of(InscriptionActions.createInscriptionFailure({ error }))))
          )
        );
      });
    
      createInscriptionSuccess$ = createEffect(() => {
        return this.actions$.pipe(
          // SOLO FILTRO AQUELLAS ACCIONES QUE SEAN DE TIPO SaleActions.loadSales
          ofType(InscriptionActions.createInscriptionSuccess),
          map(() => this.store.dispatch(InscriptionActions.loadInscriptions()))
        );
      }, { dispatch: false });

  constructor(private actions$: Actions,private httpClient:HttpClient,private store:Store) {}

  private getInscriptionsFromDB():Observable<InscriptionWithCourseAndUser[]>{
    return this.httpClient.get<InscriptionWithCourseAndUser[]>(environment.baseApiUrl+'/inscriptions?_expand=course&_expand=user')
  }
  private getUserOptions(): Observable<User[]> {
    return this.httpClient.get<User[]>(environment.baseApiUrl + '/users')
  }

  private getCourseOptions(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(environment.baseApiUrl + '/courses');
  }
  private createInscription(payload: CreateInscriptionPayload): Observable<Inscription> {
    return this.httpClient.post<Inscription>(environment.baseApiUrl + '/inscriptions', payload)
  }
}
