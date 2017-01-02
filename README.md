# kinvey-starter-ionic2

#### Tested With Ionic Version 
```
Cordova CLI: 5.4.1
Gulp version:  CLI version 3.9.0
Gulp local:   Local version 3.9.1
Ionic Framework Version: 2.0.0-beta.4
Ionic CLI Version: 2.0.0-beta.24
Ionic App Lib Version: 2.0.0-beta.14
ios-deploy version: 1.8.3
ios-sim version: 3.1.1
OS: Mac OS X El Capitan
Node Version: v0.12.7
Xcode version: Xcode 7.2.1 Build version 7C1002
```

#### Checkout the repo and run `npm install` to download the required node modules for the project

#### Required Plugins
* Camera
* File

### Create Account w/ Kinvey
* We are using the REST API in this project not the angular module
* See the REST API documentation here [REST API Getting Started](http://devcenter.kinvey.com/rest/guides/getting-started)

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
* Login and Logout
* Create New User Account
* View Data Collection
* Delete Object From Data Collection - *swipe list item to expose delete button* (In Progress)
* Add Object to Data Collection
* Using Camera Plugin to capture image and then upload file
* Add File Objects as A Collection

---
[Ionic 1 Version of Starter Project Can Be Found Here](https://github.com/aaronksaunders/kinvey-starter-ionic)

##MORE IONIC2 SAMPLES HERE
- [https://github.com/aaronksaunders/ionic2-firebase-sample](https://github.com/aaronksaunders/ionic2-firebase-sample)
- [https://github.com/aaronksaunders/ionic2-angularfire-sample](https://github.com/aaronksaunders/ionic2-angularfire-sample)
- [https://github.com/aaronksaunders/kinvey-starter-ionic2](https://github.com/aaronksaunders/kinvey-starter-ionic2)
- [https://github.com/aaronksaunders/Ionic2-NutritionSample](https://github.com/aaronksaunders/Ionic2-NutritionSample)
