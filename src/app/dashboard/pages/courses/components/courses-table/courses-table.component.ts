import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Courses } from '../../models';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.scss']
})
export class CoursesTableComponent {
  displayedColumns: string[] = ['id', 'Curso', 'Description', 'Actions'];

  @Input()
  dataSource: Courses[] = [];

  @Output()
  deleteCourses = new EventEmitter<Courses>();

  @Output()
  editCourses = new EventEmitter<Courses>();
}
