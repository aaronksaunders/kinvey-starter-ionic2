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
var login_1 = require('./pages/user/login');
var createAccount_1 = require('./pages/createAccount/createAccount');
var listStuff_1 = require('./pages/listStuff/listStuff');
var authentication_1 = require('./services/authentication');
var MyApp = (function () {
    function MyApp(platform) {
        this.rootPage = login_1.LoginPage;
        platform.ready().then(function () {
        });
        this.pages = [
            { title: 'Welcome To My APp', component: login_1.LoginPage },
            { title: 'Create Account', component: createAccount_1.CreateAccountPage },
            { title: 'List Some Stuff', component: listStuff_1.ListStuffPage }
        ];
        this.rootPage = login_1.LoginPage;
    }
    MyApp = __decorate([
        ionic_1.App({
            template: '<ion-nav [root]="rootPage"></ion-nav>',
            config: {},
            providers: [authentication_1.Authentication],
        }), 
        __metadata('design:paramtypes', [ionic_1.Platform])
    ], MyApp);
    return MyApp;
})();
exports.MyApp = MyApp;
