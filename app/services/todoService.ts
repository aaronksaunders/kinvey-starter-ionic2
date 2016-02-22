// authentication.ts
import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Http, Headers, RequestOptions} from 'angular2/http';
import 'rxjs/RX';

import {KINVEY_BASE_URL, KINVEY_AUTH} from './config';

@Injectable()
export class ToDoService {
  token: string;

  constructor(public http: Http) {
    this.token = localStorage.getItem('token');
  }


  _photo(_data, _imageData, _size) {
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
      }).then(function(_result) {
        console.log("fetch: ", _result)
        alert("File Successfully Saved");
        return _result
      })
    } catch (EE) {
      console.log("Error in _photo:", EE)
      alert("Error in _photo:"+JSON.stringify(EE))
    }
  }

  uploadPhoto(_imageData, _size) {
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
      }).then(function(_result) {
        return _result.json()
      }).then(function(_data) {
        console.log("fetch: ", _data)
        return that._photo(_data, _imageData, _size)
      }, function(_error) {
          console.log("fetch error: ", _error)
        })
    } catch (EE) {
      alert("Error in uploadPhoto:"+JSON.stringify(EE))
    }
  }

  readThis(inputValue, _that) {
    try {
      var myReader: FileReader = new FileReader();

      myReader.onloadend = function(evt) {
        var array = evt.target.result
        var len = array.byteLength

        _that.uploadPhoto(array, len)
      }

      myReader.onload = function(evt) {
        var array = evt.target.result
        var len = array.byteLength

        console.log("in onload from FileReader")
      }

      myReader.onerror = function(e) {
        console.log(e)
      }

      inputValue.file(function(s) {
        myReader.readAsArrayBuffer(s);
      }, function(e) {
          console.log('ee', e);
        })
    } catch (EE) {
      alert("Error in readThis:"+JSON.stringify(EE))
    }
  }

  addPhoto() {
    let that = this

    navigator.camera.getPicture(onSuccess, onFail, {
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      encodingTyp: Camera.EncodingType.PNG
    });

    function onSuccess(imageURI) {
      //let imageDataB64 = /*"data:image/png;base64,"+ */imageData;
      //that.uploadPhoto(that._base64ToArrayBuffer(imageDataB64))
      window.resolveLocalFileSystemURL(imageURI,
        function(_file) {
          that.readThis(_file, that)
        },
        function(_e) {
          console.log(_e)
        });

    }

    function onFail(message) {
      alert('Failed because: ' + message);
    }
  }

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
  getAllItems() {
    return this.http.get(KINVEY_BASE_URL + 'appdata/kid1781/todo-collection', {
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
}
