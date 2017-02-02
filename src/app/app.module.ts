import { ToDoService } from './../providers/todoService';
import { TodoReducer, TodoEffects } from './../reducers/todo';
import { AuthEffects } from './../reducers/authentication.effects';
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

import { AuthenticationReducer } from './../reducers/authentication';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


const appEffectsRun = [
  EffectsModule.run(AuthEffects),
  EffectsModule.run(TodoEffects),
];

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
    IonicModule.forRoot(MyApp),
    StoreModule.provideStore({ auth: AuthenticationReducer, todos: TodoReducer }),
    ...appEffectsRun,
    StoreDevtoolsModule.instrumentOnlyWithExtension()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    ListStuffPage,
    AddStuffModal,
    CreateAccountPage
  ],
  providers: [Authentication, ToDoService,{ provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule { }
