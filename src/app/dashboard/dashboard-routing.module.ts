import { HomeComponent } from './pages/home/home.component'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

@NgModule({
    imports:[
        RouterModule.forChild([
            {
              // /dashboard/home
              path: 'home',
              component: HomeComponent,
            },
            {
              path: 'users',
              loadChildren: () => import('./pages/users/users.module').then((m) => m.UsersModule),
              
            },
            {
              path: 'class',
              loadChildren: () => import('./pages/class/class.module').then((m) => m.ClassModule),
              
            },
            {
              path: 'courses',
              loadChildren: () => import('./pages/courses/courses.module').then((m) => m.CoursesModule),
            
            },
            {
              path: '**',
              redirectTo: 'home',
            },
          ]),
    ],
    exports:[RouterModule]
})


export class DashboardRoutingModule{}