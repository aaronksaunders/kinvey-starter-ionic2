import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

// pages
import { LoginPage } from '../pages/user/login';
import { CreateAccountPage } from '../pages/createAccount/createAccount';
import { ListStuffPage } from '../pages/listStuff/listStuff';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = LoginPage;
  pages

  constructor(platform: Platform) {
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
    this.rootPage = LoginPage;
  }
}
