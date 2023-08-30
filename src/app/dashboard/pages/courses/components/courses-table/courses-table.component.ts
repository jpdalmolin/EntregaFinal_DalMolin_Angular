import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Course } from '../../models';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.scss']
})
export class CoursesTableComponent {
  displayedColumns: string[] = ['id', 'Curso', 'Actions'];

  @Input()
  dataSource: Course[] = [];

  @Output()
  deleteCourses = new EventEmitter<Course>();

  @Output()
  editCourses = new EventEmitter<Course>();
}
