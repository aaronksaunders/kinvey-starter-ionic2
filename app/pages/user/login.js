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
var createAccount_1 = require('../createAccount/createAccount');
var listStuff_1 = require('../listStuff/listStuff');
var authentication_1 = require('../../services/authentication');
var LoginPage = (function () {
    function LoginPage(nav, auth) {
        this.nav = nav;
        this.auth = auth;
        this.username = null;
        this.password = null;
    }
    LoginPage.prototype.loginClicked = function (event) {
        var _this = this;
        console.log('You selected', event);
        console.log("username: " + this.username + " password " + this.password);
        this.auth.login(this.username, this.password)
            .subscribe(function (data) {
            console.log('Login Success', data);
            _this.nav.setRoot(listStuff_1.ListStuffPage, {});
        }, function (err) { return console.log("Error Loging In:", JSON.parse(err._body).description); }, function () { console.log("error"); });
    };
    LoginPage.prototype.createAccountClicked = function (event) {
        console.log('You selected', event);
        this.nav.push(createAccount_1.CreateAccountPage, {});
    };
    LoginPage = __decorate([
        ionic_1.Page({
            templateUrl: 'build/pages/user/login.html',
        }), 
        __metadata('design:paramtypes', [ionic_1.NavController, authentication_1.Authentication])
    ], LoginPage);
    return LoginPage;
})();
exports.LoginPage = LoginPage;
