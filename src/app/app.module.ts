import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// PAGES
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/user/login';
import { CreateAccountPage } from '../pages/createAccount/createAccount';
import { ListStuffPage } from '../pages/listStuff/listStuff';
import { AddStuffModal } from '../pages/listStuff/addStuffModal';

// PROVIDERS 

import { Authentication } from '../providers/authentication'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CreateAccountPage,
    LoginPage,
    ListStuffPage,
    AddStuffModal
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    ListStuffPage,
    AddStuffModal,
    CreateAccountPage
  ],
  providers: [Authentication, { provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule { }
