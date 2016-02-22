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
var todoService_1 = require('../../services/todoService');
var authentication_1 = require('../../services/authentication');
var login_1 = require('../../pages/user/login');
var addStuffModal_1 = require('../../pages/listStuff/addStuffModal');
var ListStuffPage = (function () {
    function ListStuffPage(app, nav, navParams, auth, tdService) {
        this.auth = auth;
        this.tdService = tdService;
        this.nav = nav;
        this.loadData();
    }
    ListStuffPage.prototype.loadData = function () {
        var _this = this;
        this.tdService.getAllItems().subscribe(function (data) {
            console.log('getAllItems', data);
            _this.itemList = data;
        }, function (err) { return console.log("Error Retrieving Data:", JSON.parse(err._body).description); }, function () { console.log("All Good With The Data"); });
    };
    ListStuffPage.prototype.doShowModal = function () {
        var _this = this;
        var myModal = ionic_1.Modal.create(addStuffModal_1.AddStuffModal, {});
        this.nav.present(myModal);
        myModal.onDismiss(function (data) {
            console.log(data);
            if (data) {
                _this.tdService.addItem(data).subscribe(function (data) {
                    console.log('Item Added', data);
                    alert("New Item Added To List");
                    _this.loadData();
                }, function (err) { return console.log("Error Adding Item:", JSON.parse(err._body).description); }, function () { console.log("All Good With The Data"); });
            }
        });
    };
    ListStuffPage.prototype.doLogout = function () {
        var _this = this;
        this.tdService.addPhoto();
        return;
        this.auth.logout().subscribe(function (data) {
            console.log('logging out', data);
            _this.nav.setRoot(login_1.LoginPage, {});
        }, function (err) { return console.log("Error Logging Out:", JSON.parse(err._body).description); }, function () { console.log("All Good With The Data"); });
    };
    ListStuffPage = __decorate([
        ionic_1.Page({
            templateUrl: 'build/pages/listStuff/listStuff.html',
            providers: [todoService_1.ToDoService],
        }), 
        __metadata('design:paramtypes', [ionic_1.IonicApp, ionic_1.NavController, ionic_1.NavParams, authentication_1.Authentication, todoService_1.ToDoService])
    ], ListStuffPage);
    return ListStuffPage;
})();
exports.ListStuffPage = ListStuffPage;
