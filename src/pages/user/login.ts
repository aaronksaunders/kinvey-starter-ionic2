import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { CreateAccountPage } from '../createAccount/createAccount';
import { ListStuffPage } from '../listStuff/listStuff';
import { JSAuthentication } from '../../providers/_authentication';

@Component({
  templateUrl: 'login.html',
})

export class LoginPage {

  username
  password

  constructor(public nav: NavController, public auth: JSAuthentication) {
    //This will hold data from our form
    this.username = null;
    this.password = null;

    this.checkAuth()
  }

  checkAuth() {
    if (localStorage.getItem('token')) {
      this.nav.setRoot(ListStuffPage, {});
    }
  }

  loginClicked(event) {
    console.log('You selected', event);

    console.log("username: " + this.username + " password " + this.password)

    this.auth.login(this.username, this.password)
      .subscribe(
      (data: any) => {
        console.log('Login Success', data)
        this.nav.setRoot(ListStuffPage, {});
      },
      (err) => console.log("Error Loging In:", JSON.parse(err._body).description),
      () => { console.log("error") }
      );
  }

  createAccountClicked(event) {
    console.log('You selected', event);
    this.nav.push(CreateAccountPage, {});
  }
}
