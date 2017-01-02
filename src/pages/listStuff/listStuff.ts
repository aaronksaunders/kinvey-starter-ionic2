import { Component } from '@angular/core';
import { NavController, NavParams, IonicApp, ModalController } from 'ionic-angular';
import { ToDoService } from '../../providers/todoService';
import { Authentication } from '../../providers/authentication';
import { LoginPage } from '../../pages/user/login';
import { AddStuffModal } from '../../pages/listStuff/addStuffModal';

@Component({
  templateUrl: 'listStuff.html',
  providers: [ToDoService],
  //directives: [NgFor],
})

export class ListStuffPage {
  nav
  itemList
  visibleObject
  imageList

  constructor(app: IonicApp, nav: NavController, navParams: NavParams,
    public auth: Authentication,
    public tdService: ToDoService,
    private modalCtrl : ModalController) {
    this.nav = nav;

    this.visibleObject = "todos"
    this.loadData("todos")
  }

  loadData(_visibleObject) {
    if (_visibleObject === "todos") {
      this.tdService.getAllItems().subscribe(
        (data) => {
          console.log('getAllItems', data)
          this.itemList = data
        },
        (err) => console.log("Error Retrieving Data:", JSON.parse(err._body).description),
        () => { console.log("All Good With The Data") }
      );
    }

    if (_visibleObject === "images") {
      this.tdService.getAllImages().subscribe(
        (data) => {
          console.log('getAllImages', data)
          this.imageList = data
        },
        (err) => console.log("Error Retrieving Data:", JSON.parse(err._body).description),
        () => { console.log("All Good With The Data") }
      );
    }

    this.visibleObject = _visibleObject
  }

  doShowModal() {
    let myModal = this.modalCtrl.create(AddStuffModal, {});

    // get data back
    myModal.onDidDismiss(data => {
      console.log(data)
      if (data) {
        // add item and refresh view
        this.tdService.addItem(data).subscribe(
          (data) => {
            console.log('Item Added', data)
            alert("New Item Added To List")
            this.loadData(this.visibleObject)
          },
          (err) => console.log("Error Adding Item:", JSON.parse(err._body).description),
          () => { console.log("All Good With The Data") }
        );
      }
    });

    // display the modalCtrl    
    myModal.present();
  }


  doShowCamera() {
    this.tdService.addPhoto((result) => {
      console.log("doShowCamera", result)
    })
  }

  doLogout() {

    this.auth.logout().subscribe(
      (data) => {
        console.log('logging out', data)
        this.nav.setRoot(LoginPage, {});
      },
      (err) => console.log("Error Logging Out:", JSON.parse(err._body).description),
      () => { console.log("All Good With The Data") }
    );
  }
}
