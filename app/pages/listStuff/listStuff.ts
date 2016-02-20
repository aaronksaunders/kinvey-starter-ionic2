import {Page, NavController, NavParams, IonicApp, Modal} from 'ionic-framework/ionic';
import {ToDoService} from '../../services/todoService';
import {Authentication} from '../../services/authentication';
import {LoginPage} from '../../pages/user/login';
import {AddStuffModal} from '../../pages/listStuff/addStuffModal';

@Page({
  templateUrl: 'build/pages/listStuff/listStuff.html',
  providers: [ToDoService],
  //directives: [NgFor],
})

export class ListStuffPage {
  nav
  itemList

  constructor(app: IonicApp, nav: NavController, navParams: NavParams,
    public auth: Authentication,
    public tdService: ToDoService) {
    this.nav = nav;

    this.loadData()
  }

  loadData() {
    this.tdService.getAllItems().subscribe(
      (data) => {
        console.log('getAllItems', data)
        this.itemList = data
      },
      (err) => console.log("Error Retrieving Data:", JSON.parse(err._body).description),
      () => { console.log("All Good With The Data") }
      );
  }

  doShowModal() {
    let myModal = Modal.create(AddStuffModal, {});
    this.nav.present(myModal);

    // get data back
    myModal.onDismiss( data => {
      console.log(data)
      if ( data ) {
        // add item and refresh view
        this.tdService.addItem(data).subscribe(
          (data) => {
            console.log('Item Added', data)
            alert("New Item Added To List")
            this.loadData()
          },
          (err) => console.log("Error Adding Item:", JSON.parse(err._body).description),
          () => { console.log("All Good With The Data") }
          );
      }
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
