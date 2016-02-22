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
var ToDoService = (function () {
    function ToDoService(http) {
        this.http = http;
        this.token = localStorage.getItem('token');
    }
    ToDoService.prototype._photo = function (_data, _imageData, _size) {
        try {
            var url = _data._uploadURL;
            var headers = new window.Headers(_data._requiredHeaders);
            headers.append("Content-Type", "image/png");
            headers.append("Content-Length", _size);
            console.log(_imageData);
            return fetch(url, {
                method: "PUT",
                headers: headers,
                body: _imageData
            }).then(function (_result) {
                console.log("fetch: ", _result);
                alert("File Successfully Saved");
                return _result;
            });
        }
        catch (EE) {
            console.log("Error in _photo:", EE);
            alert("Error in _photo:" + JSON.stringify(EE));
        }
    };
    ToDoService.prototype.uploadPhoto = function (_imageData, _size) {
        var that = this;
        try {
            var headers = new window.Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('X-Kinvey-API-Version', '3');
            headers.append('Authorization', 'Kinvey ' + this.token);
            headers.append('X-Kinvey-Content-Type', "image/png");
            var params = JSON.stringify({
                "_filename": "myFilename.png",
                "_public": true,
                "size": _size,
                "mimeType": "image/png"
            });
            return fetch('https://baas.kinvey.com/blob/kid1781', {
                method: "POST",
                headers: headers,
                body: params
            }).then(function (_result) {
                return _result.json();
            }).then(function (_data) {
                console.log("fetch: ", _data);
                return that._photo(_data, _imageData, _size);
            }, function (_error) {
                console.log("fetch error: ", _error);
            });
        }
        catch (EE) {
            alert("Error in uploadPhoto:" + JSON.stringify(EE));
        }
    };
    ToDoService.prototype.readThis = function (inputValue, _that) {
        try {
            var myReader = new FileReader();
            myReader.onloadend = function (evt) {
                var array = evt.target.result;
                var len = array.byteLength;
                _that.uploadPhoto(array, len);
            };
            myReader.onload = function (evt) {
                var array = evt.target.result;
                var len = array.byteLength;
                console.log("in onload from FileReader");
            };
            myReader.onerror = function (e) {
                console.log(e);
            };
            inputValue.file(function (s) {
                myReader.readAsArrayBuffer(s);
            }, function (e) {
                console.log('ee', e);
            });
        }
        catch (EE) {
            alert("Error in readThis:" + JSON.stringify(EE));
        }
    };
    ToDoService.prototype.addPhoto = function () {
        var that = this;
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            encodingTyp: Camera.EncodingType.PNG
        });
        function onSuccess(imageURI) {
            window.resolveLocalFileSystemURL(imageURI, function (_file) {
                that.readThis(_file, that);
            }, function (_e) {
                console.log(_e);
            });
        }
        function onFail(message) {
            alert('Failed because: ' + message);
        }
    };
    ToDoService.prototype.addItem = function (_item) {
        var url = config_1.KINVEY_BASE_URL + 'appdata/kid1781/todo-collection';
        var params = JSON.stringify(_item);
        return this.http.post(url, params, {
            headers: new http_1.Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Kinvey ' + this.token,
                'X-Kinvey-API-Version': 3
            })
        })
            .map(function (res) {
            var data = res.json();
            return data;
        });
    };
    ToDoService.prototype.getAllItems = function () {
        return this.http.get(config_1.KINVEY_BASE_URL + 'appdata/kid1781/todo-collection', {
            headers: new http_1.Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Kinvey ' + this.token,
                'X-Kinvey-API-Version': 3
            })
        })
            .map(function (res) {
            var data = res.json();
            return data;
        });
    };
    ToDoService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ToDoService);
    return ToDoService;
})();
exports.ToDoService = ToDoService;
