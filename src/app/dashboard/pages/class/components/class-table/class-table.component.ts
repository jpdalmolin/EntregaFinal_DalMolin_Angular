import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Clase } from '../../models';

@Component({
  selector: 'app-class-table',
  templateUrl: './class-table.component.html',
  styleUrls: ['./class-table.component.scss']
})
export class ClassTableComponent {
  displayedColumns: string[] = ['id', 'Clase', 'Description', 'Actions'];

  @Input()
  dataSource: Clase[] = [];

  @Output()
  deleteClass = new EventEmitter<Clase>();

  @Output()
  editClass = new EventEmitter<Clase>();
}
