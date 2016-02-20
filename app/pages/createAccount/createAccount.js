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
var authentication_1 = require('../../services/authentication');
var listStuff_1 = require('../listStuff/listStuff');
var CreateAccountPage = (function () {
    function CreateAccountPage(nav, auth) {
        this.auth = auth;
        this.creds = {
            first_name: "",
            last_name: "",
            username: "",
            password: ""
        };
        this.nav = nav;
    }
    CreateAccountPage.prototype.createAccountClicked = function () {
        var _this = this;
        console.log("create account with:", this.creds);
        this.auth.createUser(this.creds)
            .subscribe(function (data) {
            console.log('Account Created Success', data);
            _this.nav.setRoot(listStuff_1.ListStuffPage, {});
        }, function (err) { return console.log("Error Creating Account In:", JSON.parse(err._body).description); }, function () { console.log("error"); });
    };
    CreateAccountPage = __decorate([
        ionic_1.Page({
            templateUrl: 'build/pages/createAccount/createAccount.html',
        }), 
        __metadata('design:paramtypes', [ionic_1.NavController, authentication_1.Authentication])
    ], CreateAccountPage);
    return CreateAccountPage;
})();
exports.CreateAccountPage = CreateAccountPage;
