# kinvey-starter-ionic2

#### Checkout the repo and run `npm install` to download the required node modules for the project

### Setup
Edit the configuration file, [`app/services/config.ts`](https://github.com/aaronksaunders/kinvey-starter-ionic2/blob/master/app/services/config.ts) to contain the proper credentials from your kinvey account

```Javascript
export let KINVEY_BASE_URL = "https://baas.kinvey.com/";
let appKey = "YOUR-APP-KEY-GOES-HERE"
let secretKey = "YOUR-SECRET-KEY-GOES-HERE"
export let KINVEY_AUTH = btoa(appKey + ':' + secretKey)
```

Make sure in your kinvey console to create a collect named `todo-collection` and the object is structured like this
```Javascript
{
  description: "Sample To Do Description"
  title: "Sample To Do"
  status: "open"
}
```

**The application demonstrates the following:**
* Login
* Create Account
* View Data Collection
* Delete Object From Data Collection - *swipe list item to expose delete button* (In Progress)
* Add Object to Data Collection

---
[Ionic 1 Version of Starter Project Can Be Found Here](https://github.com/aaronksaunders/kinvey-starter-ionic)
