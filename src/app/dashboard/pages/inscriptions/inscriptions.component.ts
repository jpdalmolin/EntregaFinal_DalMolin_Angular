import { Component, OnInit } from '@angular/core';

import { InscriptionActions } from './store/inscription.actions';
import { InscriptionDialogComponent } from './components/inscription-dialog/inscription-dialog.component';
import { InscriptionWithCourseAndUser } from './models';
import { MatDialog } from '@angular/material/dialog';
import {Observable} from 'rxjs';
import { Store } from '@ngrx/store';
import { selectInscriptions } from './store/inscription.selectors';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrls: ['./inscriptions.component.scss']
})
export class InscriptionsComponent implements OnInit {
  displayedColumns=['id','user','course'];
  inscriptions$:Observable<InscriptionWithCourseAndUser[]>;
  
  constructor(private store:Store, private matDialog: MatDialog){
  this.inscriptions$=this.store.select(selectInscriptions)
  }
  ngOnInit(): void {
    this.store.dispatch(InscriptionActions.loadInscriptions())
    
  }
  onAdd(): void {
    this.matDialog.open(InscriptionDialogComponent);
  }
}
