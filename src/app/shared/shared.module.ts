import { AgrandadoDirective } from './directives/agrandado.directive';
import { CommonModule } from '@angular/common';
import { ControlErrorMessagePipe } from './pipes/control-error-message.pipe';
import { FullNamePipe } from './pipes/full-name.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RepetirDirective } from './directives/repetir.directive';
import { ResaltadoDirective } from './directives/resaltado.directive';

@NgModule({
  declarations: [
    FullNamePipe,
    ControlErrorMessagePipe,
    ResaltadoDirective,
    RepetirDirective,
    AgrandadoDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatTableModule,
    FullNamePipe,
    ControlErrorMessagePipe,
    ResaltadoDirective,
    RepetirDirective,
    AgrandadoDirective
  ]
})
export class SharedModule { }
