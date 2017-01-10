import { NavController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { Authentication } from '../../providers/authentication';
import { ListStuffPage } from '../listStuff/listStuff';

import { Http } from '@angular/http';

/**
 * 
 * 
 * @export
 * @class CreateAccountPage
 */
@Component({
  templateUrl: 'createAccount.html',
})
export class CreateAccountPage {
  /**
   * 
   * @memberOf CreateAccountPage
   */
  creds
  /**
   * 
   * @memberOf CreateAccountPage
   */
  nav
  /**
   * 
   * @memberOf CreateAccountPage
   */
  token
  /**
   * Creates an instance of CreateAccountPage.
   * 
   * @param {NavController} nav
   * @param {Authentication} auth
   * @param {Http} http
   * 
   * @memberOf CreateAccountPage
   */
  constructor(private alertCtrl: AlertController, nav: NavController, public auth: Authentication, public http: Http) {

    this.token = localStorage.getItem('token');

    this.creds = {
      first_name: "",
      last_name: "",
      username: "",
      password: ""
    }
    this.nav = nav
  }

  /**
   * 
   * @memberOf CreateAccountPage
   */
  cancelClicked() {
    this.nav.pop()
  }

  errorAlert(_message) {
    let alert = this.alertCtrl.create({
      title: 'ERROR',
      subTitle: _message,
      buttons: ['OK']
    });
    alert.present();
  }
  /**
   * 
   * @memberOf CreateAccountPage
   */
  createAccountClicked() {
    console.log("create account with:", this.creds)

    this.auth.createUser(this.creds).subscribe(
      (data: any) => {
        console.log('Account Created Success', data)
        this.nav.setRoot(ListStuffPage, {});
      },
      (err) => {
        console.log("Error Creating Account In:", err);
        this.errorAlert(err.message)
      }
    );
  }

}
