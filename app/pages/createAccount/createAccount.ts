import {Page, NavController} from 'ionic-angular';
import {Authentication} from '../../services/authentication';
import {ListStuffPage} from '../listStuff/listStuff';

import {HTTP_PROVIDERS, Http, Headers } from 'angular2/http';

@Page({
  templateUrl: 'build/pages/createAccount/createAccount.html',
})
export class CreateAccountPage {
  creds
  nav
  token
  constructor(nav: NavController, public auth: Authentication,public http: Http) {

    this.token = localStorage.getItem('token');

    this.creds = {
      first_name:"",
      last_name:"",
      username:"",
      password:""
    }
    this.nav = nav
  }

  createAccountClicked() {
    console.log("create account with:", this.creds)

    this.auth.createUser(this.creds)
      .subscribe(
      (data: any) => {
        console.log('Account Created Success', data)
        this.nav.setRoot(ListStuffPage, {});
      },
      (err) => console.log("Error Creating Account In:", JSON.parse(err._body).description),
      () => { console.log("error") }
      );
  }

}
