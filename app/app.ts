import {App, Platform} from 'ionic-framework/ionic';
import {LoginPage} from './pages/user/login';
import {CreateAccountPage} from './pages/createAccount/createAccount';
import {ListStuffPage} from './pages/listStuff/listStuff';

// https://angular.io/docs/ts/latest/api/core/Type-interface.html
import {Type} from 'angular2/core';
import {Authentication} from './services/authentication';

@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  config: {}, // http://ionicframework.com/docs/v2/api/config/Config/
  providers: [Authentication],
})
export class MyApp {
  rootPage: Type = LoginPage;
  pages

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // The platform is now ready. Note: if this callback fails to fire, follow
      // the Troubleshooting guide for a number of possible solutions:
      //
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //
      // First, let's hide the keyboard accessory bar (only works natively) since
      // that's a better default:
      //
      // Keyboard.setAccessoryBarVisible(false);
      //
      // For example, we might change the StatusBar color. This one below is
      // good for dark backgrounds and light text:
      // StatusBar.setStyle(StatusBar.LIGHT_CONTENT)
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
