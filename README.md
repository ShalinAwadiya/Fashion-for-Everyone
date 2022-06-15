<!--- This README.md file was adapted from https://gist.github.com/PurpleBooth/109311bb0361f32d87a2#file-readme-template-md by Gabriella Mosquera for academic use --->
# Assignment 1

* *Date Created*: 04/06/2022
* *Last Modification Date*: 04/06/2022
* *Git URL*: https://git.cs.dal.ca/adeshra/csci-5709-b00894867-assignments
* *Heroku URL*: https://web-assignment-1-deep-adeshra.herokuapp.com/

## Authors
* [Deep Adeshra](dp974154@dal.ca) - (Owner)

### Prerequisites for running this project

* node: v16+
* react js: v17+


### Installing dependencies and running server

* npm install *(this will install the required npm packages)*
* npm start *(this will start the server)*



### Coding style tests

- W3 Complience check - Passed *(Tested on this [site](https://validator.w3.org/))*





## Built With

<!--- Provide a list of the frameworks used to build this application, your list should include the name of the framework used, the url where the framework is available for download and what the framework was used for, see the example below --->

* [React Js](https://reactjs.org/) - Java script library for front-end
* [SCSS](https://sass-lang.com/) - CSS extension language for more structured CSS
* [Heroku](https://www.heroku.com/) - Deployment


## Sources Used
1. https://getbootstrap.com/ : The CSS framework was used to design an interactive and responsive ui
2. https://www.npmjs.com/package/react-toastify : For showing the success and failure messages at the top of the page.
3. https://reactrouter.com/ : The router was used to create the routing between pages
5. https://dimitr.im/form-validation-react-hooks : The blog was used to built my custom form validator hook.

    ## useForm.js
    ```
    function useForm({ initialValues = {}, validations = {}, onSubmit = () => { } }) {

    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [isValid, setValid] = useState(true);

    const changeHandler = event => {
        const fieldName = event.target.name;
        const newValues = { ...values, [fieldName]: event.target.value };
        const error = validate(validations, newValues, fieldName);
        const newErrors = { ...errors, [fieldName]: error };

        setValues(newValues);
        setValid(Object.keys(newErrors).length === 0);
        setErrors(newErrors);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        //check if all fields are valid
        const newErrors = {};

        for (const fieldName in validations) {
        const error = validate(validations, values, fieldName);

        if (error) {
            newErrors[fieldName] = error;
        }
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length != 0) {
        return;
        }

        onSubmit(values);
    }

    return {
            values,
            setValid,
            setErrors,
            setValues,
            changeHandler,
            isValid,
            errors,
            submitHandler
        };
    }

    ```
    The code mentioned above is inspired by this [blog](https://dimitr.im/form-validation-react-hooks).
    ## Changes
    * Error handling was not there in submit event, So added that in my code.
    * Hook was not returning state changing methods, so added that too.
    * Arguments were not able to destructure, so added arguments as object.


## Acknowledgments

* https://reactjs.org/
* https://getbootstrap.com/
* https://dimitr.im/