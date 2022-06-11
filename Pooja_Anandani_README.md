# Tutorial 3

* *Date Created*: 07/06/2022
* *Last Modification Date*:  07/06/2022
* *Lab URL*: https://git.cs.dal.ca/anandani/csci-5709-b00911392-pooja-anandani/-/tree/tutorial3
* *Deployed URL*: https://tutorial3-registeration-form.herokuapp.com/

## Authors

* [Pooja Anandani] (pooja.anandani@dal.ca) - *(Owner)*


## Getting Started


### Prerequisites

To have a local copy of this tutoial up and running on your local machine, you will first need to install the following:
* node: v16+

### Installing

* npm install *(this will install the required npm packages)*
* npm start dev *(this will start the server)*

## Deployment

The deploment is done with CI/CD pipeline to heroku. 

## Built With

* [React Js](https://reactjs.org/) - Java script library for ui
* [Heroku](https://www.heroku.com/) - Deployment
* [MaterialUI](https://mui.com/) - Comphresive ui tool

### .gitlab-ci.yml

The code  was created by adapting the code in [gitlab-ci.yml](https://medium.com/swlh/how-do-i-deploy-my-code-to-heroku-using-gitlab-ci-cd-6a232b6be2e4) as shown below: 

```
image: node:latest

stages:
    - deployment

deployment:
    type: deploy
    stage: deployment
    image: ruby:latest
    script:
        - apt-get update -qy
        - apt-get install -y ruby-dev
        - gem install dpl

```



```
image: node:latest

before_script:
    - apt-get update -qy
    - apt-get install -y ruby-dev
    - gem install dpl

stages:
    - staging
    - production

staging:
    type: deploy
    stage: staging
    image: ruby:latest
    script:
        - dpl --provider=heroku --app=$HEROKU_APP_STAGING --api-key=$HEROKU_API_KEY
    only:
        - staging

production:
    type: deploy
    stage: production
    image: ruby:latest
    script:
        - dpl --provider=heroku --app=$HEROKU_APP_PRODUCTION --api-key=$HEROKU_API_KEY
    only:
        - master

```

- The code in [.gitlab-ci.yml] was implemented by https://medium.com/swlh/how-do-i-deploy-my-code-to-heroku-using-gitlab-ci-cd-6a232b6be2e4
- [.gitlab-ci.yml](The code above was created by adapting the code in [.gitlab-ci.yml](https://medium.com/swlh/how-do-i-deploy-my-code-to-heroku-using-gitlab-ci-cd-6a232b6be2e4)'s Code was used because I want to implement CI/CD pipeline for my frontend.
- [.gitlab-ci.yml](The code above was created by adapting the code in [.gitlab-ci.yml](https://medium.com/swlh/how-do-i-deploy-my-code-to-heroku-using-gitlab-ci-cd-6a232b6be2e4's Code was modified by me because according to my branch

## Sources Used

1. https://mui.com/ : The library components of material ui was used to design an interactive ui
2. https://formik.org/ - To getvalues in and out of form state. Validation and error messages.
3. https://medium.com/swlh/how-do-i-deploy-my-code-to-heroku-using-gitlab-ci-cd-6a232b6be2e4 - To set up CI/CD pipeline for deployment

## Acknowledgments

* https://formik.org/
* https://www.youtube.com/watch?v=bMSHmf_ckM8
