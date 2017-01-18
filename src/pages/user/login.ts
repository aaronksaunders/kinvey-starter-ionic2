import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { CreateAccountPage } from '../createAccount/createAccount';
import { ListStuffPage } from '../listStuff/listStuff';

import { Store } from '@ngrx/store';
import { AuthenticationReducer, AuthActions} from '../../reducers/authentication';
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
   * @memberOf LoginPage
   */
  username
  /**
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
  constructor(public nav: NavController,
    private store: Store<any>) {
    //This will hold data from our form
    this.username = null;
    this.password = null;


    let s = this.store.select('auth').subscribe(
      (data: any) => {
        console.log("auth store changed - ", data)
        if (data.user) {
          s.unsubscribe();
          this.nav.setRoot(ListStuffPage, {});
        }
      },
      error => {
        console.log(error)
      }
    )

    //
    this.checkAuth()
  }

  /**
   * 
   * 
   * 
   * @memberOf LoginPage
   */
  checkAuth() {
    this.store.dispatch({ type: AuthActions.CHECK_AUTH });
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


    this.store.dispatch({
      type: AuthActions.LOGIN,
      payload: {
        username: this.username, password: this.password
      }
    });

    //    console.log('Login Success', data)
    //    this.nav.setRoot(ListStuffPage, {});

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
