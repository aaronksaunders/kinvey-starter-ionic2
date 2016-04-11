import {Page, ViewController} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/listStuff/addStuffModal.html'
})
export class AddStuffModal {
  todo

  constructor(public viewCtrl: ViewController) {
   this.viewCtrl = viewCtrl;
   this.todo = {}
 }

 close(response) {
   let data = { 'foo': 'bar' };

   // pass data back to the caller
   if ( response.title ) {
     this.viewCtrl.dismiss(response);
   } else {
     this.viewCtrl.dismiss(null)
   }
 }
}
