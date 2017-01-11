import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { CreateAccountPage } from '../createAccount/createAccount';
import { ListStuffPage } from '../listStuff/listStuff';
import { Authentication } from '../../providers/authentication';

/**
 * 
 * 
 * @export
 * @class LoginPage
 */
@Component({
  templateUrl: 'login.html',
})

export class LoginPage {

  /**
   * 
   * 
   * 
   * @memberOf LoginPage
   */
  username
  /**
   * 
   * 
   * 
   * @memberOf LoginPage
   */
  password

  /**
   * Creates an instance of LoginPage.
   * 
   * @param {NavController} nav
   * @param {Authentication} auth
   * 
   * @memberOf LoginPage
   */
  constructor(public nav: NavController, public auth: Authentication) {
    //This will hold data from our form
    this.username = null;
    this.password = null;

    this.checkAuth()
  }

  /**
   * 
   * 
   * 
   * @memberOf LoginPage
   */
  checkAuth() {
    if (localStorage.getItem('token')) {
      this.nav.setRoot(ListStuffPage, {});
    }
  }

  /**
   * 
   * 
   * @param {any} event
   * 
   * @memberOf LoginPage
   */
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

  /**
   * 
   * 
   * @param {any} event
   * 
   * @memberOf LoginPage
   */
  createAccountClicked(event) {
    console.log('You selected', event);
    this.nav.push(CreateAccountPage, {});
  }
}
