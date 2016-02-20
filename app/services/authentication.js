var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var http_1 = require('angular2/http');
require('rxjs/RX');
var config_1 = require('./config');
var Authentication = (function () {
    function Authentication(http) {
        this.http = http;
        this.token = localStorage.getItem('token');
    }
    Authentication.prototype.createUser = function (userInfo) {
        var _this = this;
        var params = JSON.stringify({
            username: userInfo.username,
            password: userInfo.password,
            first_name: userInfo.first_name,
            last_name: userInfo.last_name
        });
        return this.http.post(config_1.KINVEY_BASE_URL + 'user/kid1781/', params, {
            headers: new http_1.Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + config_1.KINVEY_AUTH,
                'X-Kinvey-API-Version': 3
            })
        })
            .map(function (res) {
            var data = res.json();
            _this.token = data._kmd.authtoken;
            localStorage.setItem('token', _this.token);
            return data;
        });
    };
    Authentication.prototype.login = function (username, password) {
        var _this = this;
        var params = JSON.stringify({
            username: username,
            password: password
        });
        return this.http.post(config_1.KINVEY_BASE_URL + 'user/kid1781/login', params, {
            headers: new http_1.Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + config_1.KINVEY_AUTH,
                'X-Kinvey-API-Version': 3
            })
        })
            .map(function (res) {
            var data = res.json();
            _this.token = data._kmd.authtoken;
            localStorage.setItem('token', _this.token);
            return data;
        });
    };
    ;
    Authentication.prototype.logout = function () {
        var _this = this;
        var params = JSON.stringify({});
        return this.http.post(config_1.KINVEY_BASE_URL + 'user/kid1781/_logout', params, {
            headers: new http_1.Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Kinvey ' + this.token,
                'X-Kinvey-API-Version': 3
            })
        })
            .map(function (res) {
            _this.token = undefined;
            localStorage.removeItem('token');
            return true;
        });
    };
    Authentication = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], Authentication);
    return Authentication;
})();
exports.Authentication = Authentication;
