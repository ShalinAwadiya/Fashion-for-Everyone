# Assignment 3: Group-5

* *Name*: Deep Adshra
* *Student ID*: B00894867
* *Course*: CSCI 5709 - Advanced Topics in Web Development
* *Date Created*: July 15, 2022
* *URL of depoyed app*:
* *URL For group repository*: https://git.cs.dal.ca/anandani/csci-5709-group5
* *URL For my branch*: https://git.cs.dal.ca/anandani/csci-5709-group5/-/tree/deep-dev

## Authors
---
- [Deep Adeshra](dp974154@dal.ca)

## Built With
---
* [NodeJS](https://nodejs.org/en/)
* [Heroku](https://www.heroku.com/)
* [MongoDB](https://www.mongodb.com/)
* [Firebase](https://firebase.google.com/)

## Feature developed
----
- User management with Profile management

### APIs

- GET /users
  This API will get the details of the user.
- PUT /users
  This API update the user details such as name, email and password
- POST /user
  This API is responsible for registering the users

## List of files created
----
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

### Tasks
- User Singup:  Responsible for onboarding new users
- User login: Responsible for authentication of users
- User Forget Password: Responsible for reseting password for the user
- User Profile edit: Responsible for changing user details

## Code Integration
---



