import { Component } from '@angular/core';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private login: LoginService, private Router: Router) {}

  logout(){
    this.login.logout();
    this.Router.navigate(['../login']);
  }
}
