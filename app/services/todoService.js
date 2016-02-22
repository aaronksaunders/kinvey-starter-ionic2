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
    ToDoService.prototype._uploadPhotoUsingGoogleURL = function (_data, _imageData, _size) {
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
    ToDoService.prototype._uploadPhotoToKinvey = function (_imageData, _size) {
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
                return that._uploadPhotoUsingGoogleURL(_data, _imageData, _size);
            }, function (_error) {
                console.log("fetch error: ", _error);
                return _error;
            });
        }
        catch (EE) {
            alert("Error in uploadPhoto:" + JSON.stringify(EE));
        }
    };
    ToDoService.prototype._readImageFileFromCamera = function (_fileInfo, _that, _callback) {
        try {
            var fileReader = new FileReader();
            fileReader.onloadend = function (evt) {
                var array = evt.target.result;
                var len = array.byteLength;
                _that._uploadPhotoToKinvey(array, len).then(function (_result) {
                    _callback({
                        success: true,
                        result: _result
                    });
                }, function (_error) {
                    throw _error;
                });
            };
            fileReader.onerror = function (_error) {
                console.log(_error);
                throw _error;
            };
            _fileInfo.file(function (s) {
                fileReader.readAsArrayBuffer(s);
            }, function (_error) {
                throw _error;
            });
        }
        catch (EE) {
            alert("Error in readThis:" + JSON.stringify(EE));
            _callback({
                success: false,
                result: EE
            });
        }
    };
    ToDoService.prototype.addPhoto = function (_callback) {
        var that = this;
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            encodingTyp: Camera.EncodingType.PNG
        });
        function onSuccess(imageURI) {
            window.resolveLocalFileSystemURL(imageURI, function (_file) {
                that._readImageFileFromCamera(_file, that, _callback);
            }, function (_error) {
                _callback({
                    success: false,
                    result: _error
                });
            });
        }
        function onFail(message) {
            alert('Failed because: ' + message);
            _callback({
                success: false,
                result: message
            });
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
