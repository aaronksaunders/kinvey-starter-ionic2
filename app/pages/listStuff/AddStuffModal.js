var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ionic_1 = require('ionic-framework/ionic');
var AddStuffModal = (function () {
    function AddStuffModal(viewCtrl) {
        this.viewCtrl = viewCtrl;
        this.viewCtrl = viewCtrl;
        this.todo = {};
    }
    AddStuffModal.prototype.close = function (response) {
        var data = { 'foo': 'bar' };
        if (response.title) {
            this.viewCtrl.dismiss(response);
        }
        else {
            this.viewCtrl.dismiss(null);
        }
    };
    AddStuffModal = __decorate([
        ionic_1.Page({
            templateUrl: 'build/pages/listStuff/addStuffModal.html'
        }), 
        __metadata('design:paramtypes', [ionic_1.ViewController])
    ], AddStuffModal);
    return AddStuffModal;
})();
exports.AddStuffModal = AddStuffModal;
