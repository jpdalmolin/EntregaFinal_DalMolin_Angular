import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { CoursesDetailComponent } from './pages/courses-detail.component';
import { CoursesEffects } from './store/courses.effects';
import { CoursesFormDialogComponent } from './components/course-form-dialog/course-form-dialog.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesTableComponent } from './components/courses-table/courses-table.component';
import { EffectsModule } from '@ngrx/effects';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { coursesesFeature } from './store/courses.reducer';

@NgModule({
  declarations: [
    CoursesComponent,
    CoursesFormDialogComponent,
    CoursesTableComponent,
    CoursesDetailComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule,
    RouterModule,
    StoreModule.forFeature(coursesesFeature),
    EffectsModule.forFeature([CoursesEffects])
  ],
  exports:[CoursesComponent],
})
export class CoursesModule { }
