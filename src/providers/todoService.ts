// authentication.ts
import { Injectable } from '@angular/core';
import 'rxjs/RX';
import { Camera, File } from 'ionic-native';

import { Observable } from 'rxjs/Observable';

declare var window: any;
declare var Kinvey: any



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
     * @memberOf ToDoService
     */
    constructor() {
        this.token = localStorage.getItem('token');
    }

    _uploadToKinveyJS(_imageData, _size) {
        var fileContent = _imageData;
        var metadata = {
            "mimeType": "image/png",
            "size": _size,
        };
        return Kinvey.Files.upload(fileContent, metadata)
            .catch((error) => {
                console.log("Error uploading file - ", error)
            });
    }

    /**
    * read the file that we got from the camera plugin, convert the fileReader
    * into a byteArray so that it can be uploaded
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
            var fileReader: FileReader = new window.FileReader();

            /**
             * 
             * 
             * @param {*} evt
             */
            fileReader.onloadend = (evt: any) => {
                var array = evt.target.result
                var len = array.byteLength

                _that._uploadToKinveyJS(array, len).then((_result) => {
                    _callback({
                        success: true,
                        result: _result
                    })
                }, (_error) => {
                    throw _error
                })
            }

            /**
             * 
             * 
             * @param {any} _error
             */
            fileReader.onerror = (_error) => {
                console.log(_error)
                throw _error
            }

            _fileInfo.file((s) => {
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
    * @returns {Promise}
     * 
     * @memberOf ToDoService
     */
    addPhoto() {

        return new Promise((resolve, reject) => {

            let options = {
                quality: 50,
                destinationType: 1, // Camera.DestinationType.FILE_URI,
                sourceType: 0,      // Camera.PictureSourceType.PHOTOLIBRARY,
                encodingType: 1      // Camera.EncodingType.PNG        
            };

            Camera.getPicture(options).then((imageURI) => {
                window.resolveLocalFileSystemURL(imageURI,
                    (_file) => {
                        this._readImageFileFromCamera(_file, this, (_result) => {
                            resolve(_result)
                        })
                    },
                    (_error) => {
                        reject({
                            success: false,
                            result: _error
                        })
                    });
            }).catch((message) => {
                alert('Failed because: ' + message);
                reject({
                    success: false,
                    result: message
                })
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
        return new Observable(observer => {
            let dataStore = Kinvey.DataStore.collection('todo-collection');
            dataStore.save(_item).then((entity) => {
                observer.next(entity);
                observer.complete();
            }).catch((error) => {
                console.log(error)
                console.log(error)
                Observable.throw(error);
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
                    Observable.throw(error);
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
