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
