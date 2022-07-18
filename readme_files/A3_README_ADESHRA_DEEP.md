<!--- This README.md file was adapted from https://gist.github.com/PurpleBooth/109311bb0361f32d87a2#file-readme-template-md by Gabriella Mosquera for academic use --->

# Assignment 3: Group-5

* *Name*: [Deep Adeshra](dp974154@dal.ca)
* *Student ID*: B00894867
* *Course*: CSCI 5709 - Advanced Topics in Web Development
* *Date Created*: July 15, 2022
* *URL of depoyed app*: https://group-5-web.surge.sh/
* *URL For group repository*: https://git.cs.dal.ca/anandani/csci-5709-group5
* *URL For my branch*: https://git.cs.dal.ca/anandani/csci-5709-group5/-/tree/deep-dev

## Professor
---
[Shehzeen Huda](sh655624@dal.ca)

## Teaching Assistant
---
[Aadesh shah](ad735938@dal.ca)


## Authors of the assignment
---
- [Deep Adeshra](dp974154@dal.ca)

## Authors of the project
---
- [Deep Adeshra](dp974154@dal.ca)

- [Manan Amin](manan.amin@dal.ca)

- [Minal Khona](mn977442@dal.ca)

- [Pooja Anandani](pooja.anandani@dal.ca)

- [Rishika Bajaj](rs348937@dal.ca)

- [Shalin Awadiya](shalin.awadiya@dal.ca)

- [Shathish Annamalai](sh495601@dal.ca)


## Built With
---
* [MongoDB](https://www.mongodb.com/)
* [ExpressJs](https://expressjs.com/)
* [Reactjs](https://reactjs.org/)
* [NodeJS](https://nodejs.org/en/)

## Installation
---

```
cd client
npm install
cd ..
cd server
npm install
```

## Starting the application
---
The following commands will run the application on your localhost.
```
cd client
npm run dev
cd ..
cd server
npm run dev
```


## Feature developed
----
- User management and Profile management

### APIs

- GET /users
  This API will get the details of the user.
- PUT /users
  This API update the user details such as name, email and password
- POST /user
  This API is responsible for registering the users

## List of files created
---
### In server directory
- server/app.js
- server/routes/users.js
- server/models/user.js
- server/middlewares/authorization.js
- server/middlewares/user_role_middleware.js
- server/controllers/userController.js
- server/config/firebase-admin.js
- server/config/firebaseAdminKeys.json


### In client directory
- client/src/pages/user-auth/forget-password.js
- client/src/pages/user-auth/login.js
- client/src/pages/user-auth/profile.js
- client/src/pages/user-auth/signup.js
- client/src/pages/user-auth/reset-password.js
- client/src/pages/user-auth/verify-email.js
- client/src/pages/user-auth/action.js
- client/src/validators/common-validators.js
- client/src/validators/forget-password-validator.js
- client/src/validators/login-validators.js
- client/src/validators/signup-validator.js
- client/src/validators/updateProfile-validator.js
- client/src/utils/apiClient.js
- client/src/utils/firebase.js
- client/src/utils/routeProtector.js
- client/src/hooks/useForm.js

## Tasks
---
- User Singup:  Responsible for onboarding new users
- User email validation: Responsible for varifying user's email
- User login: Responsible for authentication of users
- User Forget Password: Responsible for reseting password for the user
- User Profile edit: Responsible for changing user details

## Code Integration
---
- Every group members have developed their feature's frontend and backend individually
- For backend we created REST APIs and those APIs is called from frontend using AXIOS
- Everyone has created their code in their individul branch, and then raised PR to
merge their code in main branch
- PR was reviewd by team memebers and approved for merge.
- After everyone's code is merged, we checked it in local and then deployed it on cloud.
- For frontend deployment, we are using [Surge](surge.io) and for backend we are using [Heroku](heroku.com)
- Deployed version is also tested by us and bugs were fixed which are found in production.


## Sources Used
---

- [Firebase](https://firebase.google.com/docs/reference/js) SDK is used for maintaing the user authentication with [Google](google.com). It gives the ability to accesing account without rememring password and user will be authenticated by his [Gmail](gmail.com) account only.
- [Express validator](https://express-validator.github.io/docs/) is used for validation of request body and request query params. This is needed because request body can have invalid payload and it could cause internal server errors.
- [CORS middleware](https://expressjs.com/en/resources/middleware/cors.html) is used for allowing cross-origin resource acccess. This is needed because frontend and backend will be hosted on different domains.
- [Google](google.com) logo for signup and login page is taken from [here](https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png")
- In "client/src/pages/user-auth/action.js" thic code is adapted from [here](https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript). This code is for getting Query params from URL.
```
function getParameterByName(name) {
  name = name.replace(/[\[\]]/g, '\\$&');

  let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(window.location.href);

  if (!results) {
    return null;
  } else if (!results[2]) {
    return '';
  }

  const result = decodeURIComponent(results[2].replace(/\+/g, ' '))
  return result;
}
```



## Acknowledgments and References
---

* [NodeJS](https://nodejs.org/en/) - Our backend server
* [Heroku](https://www.heroku.com/) - Our backend deployemnet platform
* [MongoDB](https://www.mongodb.com/) - Our NoSQL database
* [Firebase](https://firebase.google.com/) - Our Social Authentication provider
* [ExpressJs](https://expressjs.com/) - Our REST API framework
* [Reactjs](https://reactjs.org/) - Our frontend framework
* [StackOverflow](https://stackoverflow.com/) - Our error resolver - we use this extensively for resolving errors while development
* [Surge](surge.io) - Our frontend deployment platform
*  Deep Adeshra, Manan Amin, Minal Khona, Pooja Anandani, Rishika Bajaj, Shalin Awadiya,Shathish Annamalai  "Proposal." Summer Term, Dalhousie University, [Online document], 2022. [Accessed: 15-Jul-2022].
