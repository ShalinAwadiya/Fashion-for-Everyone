<!--- The following README.md sample file was adapted from https://gist.github.com/PurpleBooth/109311bb0361f32d87a2#file-readme-template-md by Gabriella Mosquera for academic use ---> 
# Assignment 1

* *Date Created*: 04  06 2022
* *Last Modification Date*: 04  06 2022
* *Git URL*: https://git.cs.dal.ca/anandani/csci-5709-b00911392-pooja-anandani/-/tree/assignment1
* *Heroku URL*:https://assignment1-cart.herokuapp.com/

## Authors
* [Pooja Anandani](pooja.anandani@dal.ca) - *(Owner)*

### Prerequisites

* node: v16+
* react js: v17+


### Installing

* npm install *(this will install the required npm packages)*
* npm run dev *(this will start the server)*


### Coding style tests

- W3 Complience check - Passed *(Tested on this [site](https://validator.w3.org/))*
## Built With

<!--- Provide a list of the frameworks used to build this application, your list should include the name of the framework used, the url where the framework is available for download and what the framework was used for, see the example below --->

* [React Js](https://reactjs.org/) - Java script library for ui
* [Heroku](https://www.heroku.com/) - Deployment
* [MaterialUI](https://mui.com/) - Comphresive ui tool

## Sources Used
1. https://mui.com/ : The library components of material ui was used to design an interactive ui
2. https://www.npmjs.com/package/react-toastify : The toast was used to display success message on applying coupon.
3. https://react-redux.js.org/api/hooks: To maintain the global state in the project
4. https://medium.com/swlh/how-do-i-deploy-my-code-to-heroku-using-gitlab-ci-cd-6a232b6be2e4 - To set up CI/CD pipeline for deployment
5. https://codesandbox.io/examples/package/react-shopping-cart - Referring on how to build cart management system in react. 
6. https://www.youtube.com/watch?v=FKd5qHCkCPg&t=364s&ab_channel=ThapaTechnical - Understanding cart management and how to build it in react. 

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



### Reducer.js


```
export const reducer = (state, action) => {
    if (action.type === "REMOVE") {
        return {
            ...state,
            item: state.item.filter((currentElemenet) => {
                return currentElemenet.id !== action.payload;
            }

            ),
        }
    }
    if (action.type === "INCREMENT") {
        let inccart = state.item.map((currentElemenet) => {
            if (currentElemenet.id === action.payload) {
                return { ...currentElemenet, quantity: currentElemenet.quantity + 1 };
            }
            return currentElemenet
        });
        return { ...state, item: inccart }

    }

    if (action.type === "DECREMENT") {
        const inccart = state.item.map((currentElemenet) => {
            if (currentElemenet.id === action.payload) {
                return { ...currentElemenet, quantity: currentElemenet.quantity - 1 };
            }
            return currentElemenet
        })
        .filter((currentElemenet)=>currentElemenet.quantity !==0);
        return {...state, item: inccart}
    }

    if (action.type === "TOTAL") {
        let { totalItem, totalAmount } = state.item.reduce(
          (accum, curVal) => {
            let { price, quantity } = curVal;
    
            let updatedTotalAmount = price * quantity;
            accum.totalAmount += updatedTotalAmount;
    
            accum.totalItem += quantity;
            return accum;
          },
          {
            totalItem: 0,
            totalAmount: 0,
          }
        );
        return { ...state, totalItem, totalAmount };
      }
      return state;

    };

```

The code above was created by adapting the code in [video on youtube](https://www.youtube.com/watch?v=FKd5qHCkCPg&t=364s&ab_channel=ThapaTechnical ) 

- The code in [Reducer.js](https://www.youtube.com/watch?v=FKd5qHCkCPg&t=364s&ab_channel=ThapaTechnical ) was implemented by thapa technical
- [Reducer.js](https://www.youtube.com/watch?v=FKd5qHCkCPg&t=364s&ab_channel=ThapaTechnical )'s Code was used because I want to perform basic cart operations and I was new to reactjs
- [Reducer.js](https://www.youtube.com/watch?v=FKd5qHCkCPg&t=364s&ab_channel=ThapaTechnical )'s Code was modified by me where I want to change logic of calculating total amount.

## Acknowledgments

* https://reactjs.org/
* https://reactjs.org/
* https://mui.com/material-ui/material-icons/
* https://www.zara.com/ca/en/fitted-dress-p04174315.html?v1=177649067
* https://www.collinsdictionary.com/us/dictionary/english/dress
* https://www.cosmopolitan.com/uk/fashion/style/a38568686/tiktok-fashion-trends/
