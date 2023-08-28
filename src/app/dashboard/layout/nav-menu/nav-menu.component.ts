import { AuthService } from 'src/app/auth/auth.services';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {

  constructor(private router:Router,private authService: AuthService){}

  logout():void{
    this.authService.logout();
    this.router.navigate(['auth','login'],{}
    )
  }
}
