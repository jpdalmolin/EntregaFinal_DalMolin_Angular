import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { CoursesModule } from '../courses.module';
import { MatIcon } from '@angular/material/icon';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-courses-detail',
  templateUrl: './courses-detail.component.html',
  styles: [
  ]
})
export class CoursesDetailComponent {
  constructor(private activatedRoute: ActivatedRoute) {
    console.log(this.activatedRoute.snapshot.params);
  }
}