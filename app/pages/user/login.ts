import {Page, NavController} from 'ionic-framework/ionic';
import {CreateAccountPage} from '../createAccount/createAccount';
import {ListStuffPage} from '../listStuff/listStuff';
import {Authentication} from '../../services/authentication';

@Page({
  templateUrl: 'build/pages/user/login.html',
})
export class LoginPage {

  username
  password

  constructor(public nav: NavController, public auth: Authentication) {
    //This will hold data from our form
    this.username = null;
    this.password = null;
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
