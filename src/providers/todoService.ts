// authentication.ts
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/RX';
import 'isomorphic-fetch';
import { Camera, File } from 'ionic-native';

import { Observable } from 'rxjs/Observable';

declare var cordova: any;
declare var window: any;
declare var fetch: any;
declare var Kinvey: any

import { KINVEY_BASE_URL, KINVEY_AUTH } from './config';


/**
 * 
 * 
 * @export
 * @class ToDoService
 */
@Injectable()
export class ToDoService {
    /**
     * 
     * 
     * @type {string}
     * @memberOf ToDoService
     */
    token: string;

    /**
     * Creates an instance of ToDoService.
     * 
     * @param {Http} http
     * 
     * @memberOf ToDoService
     */
    constructor(public http: Http) {
        this.token = localStorage.getItem('token');
    }


    /**
    * using the informatiom from the previous call to
    * uploadPhotoToKinvey, we have a URL to load the file
    * to Google Cloud Storage
    *
    * @param _data {Object} response from the kinvey api call, contains information
    *                       required to upload to google
    * @param _imageData {ByteArray} the actual image data to be uploaded
    * @param _size {Integer} the size of the upload
    *
    * @returns {Promise}
    */
    /**
     * 
     * 
     * @param {any} _data
     * @param {any} _imageData
     * @param {any} _size
     * @returns
     * 
     * @memberOf ToDoService
     */
    _uploadPhotoUsingGoogleURL(_data, _imageData, _size) {
        try {
            let url = _data._uploadURL
            var headers = new window.Headers(_data._requiredHeaders);
            headers.append("Content-Type", "image/png")
            headers.append("Content-Length", _size)
            console.log(_imageData)

            return fetch(url, {
                method: "PUT",
                headers: headers,
                body: _imageData
            }).then(function (_result) {
                console.log("fetch: ", _result)
                alert("File Successfully Saved");
                return _result
            })
        } catch (EE) {
            console.log("Error in _photo:", EE)
            alert("Error in _photo:" + JSON.stringify(EE))
        }
    }

    /**
    * upload the photo to kinvey and then get back a URL that is then used
    * to upload the file to google cloud
    *
    * @param _imageData {ByteArray} the actual image data to be uploaded
    * @param _size {Integer} the size of the upload
    *
    * @returns {Promise}
    */
    /**
     * 
     * 
     * @param {any} _imageData
     * @param {any} _size
     * @returns
     * 
     * @memberOf ToDoService
     */
    _uploadPhotoToKinvey(_imageData, _size) {
        var that = this;
        try {
            var headers = new window.Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('X-Kinvey-API-Version', '3')
            headers.append('Authorization', 'Kinvey ' + this.token)
            headers.append('X-Kinvey-Content-Type', "image/png")

            var params = JSON.stringify({
                "_filename": "myFilename.png",
                "_public": true,
                "size": _size,
                "mimeType": "image/png"
            })

            return fetch('https://baas.kinvey.com/blob/kid1781', {
                method: "POST",
                headers: headers,
                body: params
            }).then(function (_result) {
                return _result.json()
            }).then(function (_data) {
                console.log("fetch: ", _data)
                return that._uploadPhotoUsingGoogleURL(_data, _imageData, _size)
            }, function (_error) {
                console.log("fetch error: ", _error)
                return _error
            })
        } catch (EE) {
            alert("Error in uploadPhoto:" + JSON.stringify(EE))
        }
    }

    /**
    * read the file that we got from the camera plugin, convert the fileReader
    * into a byteArray so that it can be uploaded
    *
    */
    /**
     * 
     * 
     * @param {any} _fileInfo
     * @param {any} _that
     * @param {any} _callback
     * 
     * @memberOf ToDoService
     */
    _readImageFileFromCamera(_fileInfo, _that, _callback) {
        try {
            var fileReader: FileReader = new cordova.FileReader();

            /**
             * 
             * 
             * @param {*} evt
             */
            fileReader.onloadend = function (evt: any) {
                var array = evt.target.result
                var len = array.byteLength

                _that._uploadPhotoToKinvey(array, len).then(function (_result) {
                    _callback({
                        success: true,
                        result: _result
                    })
                }, function (_error) {
                    throw _error
                })
            }

            /**
             * 
             * 
             * @param {any} _error
             */
            fileReader.onerror = function (_error) {
                console.log(_error)
                throw _error
            }

            _fileInfo.file(function (s) {
                fileReader.readAsArrayBuffer(s);
            }, function (_error) {
                throw _error
            })
        } catch (EE) {
            alert("Error in readThis:" + JSON.stringify(EE))
            _callback({
                success: false,
                result: EE
            })
        }
    }

    /**
    * try and add a photo to the database
    *
    * @param _callback {Function} called when the process is complete
    */
    /**
     * 
     * 
     * @param {any} _callback
     * 
     * @memberOf ToDoService
     */
    addPhoto(_callback) {
        let that = this


        let options = {
            quality: 50,
            destinationType: 1, // Camera.DestinationType.FILE_URI,
            sourceType: 0,      // Camera.PictureSourceType.PHOTOLIBRARY,
            encodingType: 1      // Camera.EncodingType.PNG        
        };

        Camera.getPicture(options).then((imageURI) => {
            window.resolveLocalFileSystemURL(imageURI,
                function (_file) {
                    that._readImageFileFromCamera(_file, that, _callback)
                },
                function (_error) {
                    _callback({
                        success: false,
                        result: _error
                    })
                });
        }).catch((message) => {
            alert('Failed because: ' + message);
            _callback({
                success: false,
                result: message
            })
        })

    }

    /**
     * 
     * 
     * @param {any} _item
     * @returns
     * 
     * @memberOf ToDoService
     */
    addItem(_item) {
        let url = KINVEY_BASE_URL + 'appdata/kid1781/todo-collection'
        let params = JSON.stringify(_item)
        return this.http.post(url, params, {
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Kinvey ' + this.token,
                'X-Kinvey-API-Version': 3
            })
        })
            .map((res: any) => {
                let data = res.json();
                return data
            });
    }
    /**
     * 
     * 
     * @returns
     * 
     * @memberOf ToDoService
     */
    getAllImages() {
        return new Observable(observer => {
            var query = new Kinvey.Query();
            Kinvey.Files.find(query)
                .then((files) => {
                    observer.next(files);
                    observer.complete();
                })
                .catch(function (error) {
                    console.log(error)
                    observer.next(error);
                    observer.complete();
                });
        });
    }
    /**
     * 
     * 
     * @returns
     * 
     * @memberOf ToDoService
     */
    getAllItems() {
        let dataStore = Kinvey.DataStore.collection('todo-collection');
        return dataStore.find()
    }
}
