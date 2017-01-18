
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

// pages
import { LoginPage } from '../pages/user/login';
import { CreateAccountPage } from '../pages/createAccount/createAccount';
import { ListStuffPage } from '../pages/listStuff/listStuff';


import { Store } from '@ngrx/store';
import { AuthActions } from './../reducers/authentication';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage;
  pages

  constructor(platform: Platform,
    private store: Store<any>) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    // set our app's pages
    this.pages = [
      { title: 'Welcome To My APp', component: LoginPage },
      { title: 'Create Account', component: CreateAccountPage },
      { title: 'List Some Stuff', component: ListStuffPage }
    ];

    // LISTEN FOR CHANGES ON THE AUTH Store
    let s = this.store.select('auth').subscribe(
      (data: any) => {
        console.log("auth store changed - ", data)
        if (data.kinveyInitialized ) {
          s.unsubscribe();
          this.rootPage =  data.user ? ListStuffPage : LoginPage;
        }
      },
      error => {
        console.log(error)
      });

      // Initialize Kinvey
    this.store.dispatch({
      type: AuthActions.INIT_KINVEY
    });
  }
}
