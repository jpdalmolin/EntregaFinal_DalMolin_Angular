import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        // /dashboard/courses
        path: '',
        component: CoursesComponent,
      }
      
      
      
    ])
  ],
  exports: [RouterModule],
})
export class CoursesRoutingModule { }
