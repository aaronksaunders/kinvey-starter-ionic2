import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, IonicApp, ModalController } from 'ionic-angular';
import { ToDoService } from '../../providers/todoService';
import { Authentication } from '../../providers/authentication';
import { LoginPage } from '../../pages/user/login';
import { AddStuffModal } from '../../pages/listStuff/addStuffModal';


/**
 * 
 * 
 * @export
 * @class ListStuffPage
 */
@Component({
  templateUrl: 'listStuff.html',
  providers: [ToDoService],

})

export class ListStuffPage {
  /**
   * 
   * @memberOf ListStuffPage
   */
  nav
  /**
   * 
   * @memberOf ListStuffPage
   */
  itemList
  /**
   * 
   * @memberOf ListStuffPage
   */
  visibleObject
  /**
   * 
   * @memberOf ListStuffPage
   */
  imageList

  /**
   * Creates an instance of ListStuffPage.
   * 
   * @param {IonicApp} app
   * @param {NavController} nav
   * @param {NavParams} navParams
   * @param {JSAuthentication} auth
   * @param {ToDoService} tdService
   * @param {ModalController} modalCtrl
   * 
   * @memberOf ListStuffPage
   */
  constructor(app: IonicApp, nav: NavController, navParams: NavParams,
    public auth: Authentication,
    public tdService: ToDoService,
    private modalCtrl: ModalController,
    private ngZone: NgZone) {
    this.nav = nav;

    this.visibleObject = "todos"
    this.loadData("todos")
  }

  onDeleteItem(_item, _itemType) {
    console.log(`deleting a ${_itemType} `, _item)
    this.tdService.deleteItem(_itemType, _item).subscribe(
      (data) => {
        console.log('deleteItem', data);
        this.loadData(this.visibleObject)
      },
      (err) => {
        console.log("Error deleting Data:", err)
        alert(err.message)
      }
    )
  }


  trackItem(_index, _item) {
    return _item ? _item._id : undefined;
  }

  /**
   * 
   * 
   * @param {any} _visibleObject
   * 
   * @memberOf ListStuffPage
   */
  loadData(_visibleObject) {
    if (_visibleObject === "todos") {
      this.tdService.getAllItems().subscribe(
        (data) => {
          console.log('getAllItems', data)
          this.ngZone.run(() => this.itemList = data)
        },
        (err) => console.log("Error Retrieving Data:", JSON.parse(err._body).description),
      );
    }

    if (_visibleObject === "images") {

      let s = this.tdService.getAllImages().subscribe(
        (data) => {
          console.log('getAllImages', data)
          this.ngZone.run(() => this.imageList = data)
        },
        (err) => console.log("Error Retrieving Data:", JSON.parse(err._body).description),
        () => { s.unsubscribe() }
      );
    }

    this.visibleObject = _visibleObject
  }

  /**
   * 
   * 
   * 
   * @memberOf ListStuffPage
   */
  doShowModal() {
    let myModal = this.modalCtrl.create(AddStuffModal, {});

    // get data back
    myModal.onDidDismiss(data => {
      console.log(data)
      if (data) {
        // add item and refresh view
        let s = this.tdService.addItem(data).subscribe(
          (data) => {
            console.log('Item Added', data)
            alert("New Item Added To List")
            this.loadData(this.visibleObject)
          },
          (err) => console.log("Error Adding Item:", JSON.parse(err._body).description),
          () => { s.unsubscribe() }
        );
      }
    });

    // display the modalCtrl    
    myModal.present();
  }


  /**
   * 
   * @memberOf ListStuffPage
   */
  doShowCamera() {
    this.tdService.addPhoto().then((result) => {
      console.log("doShowCamera", result)
    }, (_error) => {
      alert(_error)
    })
  }

  /**
   * 
   * @memberOf ListStuffPage
   */
  doLogout() {

    let s = this.auth.logout().subscribe(
      (data) => {
        console.log('logging out', data)
        this.nav.setRoot(LoginPage, {});
      },
      (err) => console.log("Error Logging Out:", JSON.parse(err._body).description),
      () => { s.unsubscribe() }
    );
  }
}