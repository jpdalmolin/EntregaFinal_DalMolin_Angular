import { CommonModule } from '@angular/common'
import { InscriptionsComponent } from './inscriptions.component'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

@NgModule({
    imports:[
        CommonModule,
        RouterModule.forChild([
            {
              // /dashboard/home
              path: '',
              component: InscriptionsComponent,
            },
           
           
          ]),
    ],
    exports:[RouterModule]
})


export class InscriptionRoutingModule{}