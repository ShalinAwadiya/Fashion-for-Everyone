// Author: Deep Adeshra (dp974154@dal.ca)
import useForm from "../../hooks/useForm";
import signupValidator from "../../validators/signup-validator";
import { ToastContainer } from 'react-toastify';
import { registerWithEmailAndPassword, signInWithGoogle } from "../../utils/firebase";

function SignUp(props) {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  };

  const onSubmit = () => {
    // toast.success("User signed up successfully!");
    registerWithEmailAndPassword(`${values.firstName} ${values.lastName}`, values.email, values.password);
  };

  const {
    values,
    changeHandler,
    errors,
    touched,
    submitHandler
  } = useForm({ initialValues: initialValues, validations: signupValidator, onSubmit: onSubmit });


  return (
    <div id="Signup">
      <ToastContainer />
      <div className="signup-form mt-3 shadow-lg bg-white">
        <h3 className="text-center">Sign Up & Start shopping</h3>

        <hr />

        <div className="google-button" onClick={signInWithGoogle}>
          <a href="#" className="btn">
            <img width="15px" className="google-icon" alt="Google login"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
            Sign Up with Google
          </a>
        </div>

        <p className="text-center form-text text-muted" style={{ marginTop: '15px' }}>Or use your email address</p>

        <div className="col-md-12 mt-4">
          <div className="row">
            <div className="form-group col-md-6">
              <input value={values.firstName} onChange={changeHandler} name="firstName" type="text" className="form-control" placeholder="First Name" />
              {errors.firstName ? <small className="error">{errors.firstName}</small> : <small>Your first name</small>}
            </div>

            <div className="form-group col-md-6">
              <input type="text" value={values.lastName} name="lastName" onChange={changeHandler} className="form-control" placeholder="Last Name" />
              {errors.lastName ? <small className="error">{errors.lastName}</small> : <small>Your last name(optinal)</small>}
            </div>
          </div>

          <div className="form-group">
            <input value={values.email} onChange={changeHandler} name="email" type="email" className="form-control" placeholder="Enter Your email" />
            {errors.email ? <small className="error">{errors.email}</small> : <small>Your email address</small>}
          </div>

          <div className="form-group">
            <input value={values.password} onChange={changeHandler} name="password" type="password" className="form-control" placeholder="Password" />
            {errors.password ? <small className="error">{errors.password}</small> : <small>Password with atleast 8 characters</small>}
          </div>

          <button type="submit" className="btn btn-primary signup-btn" onClick={submitHandler}>Sign up</button>
          <small>Already has an account <a className="text-primary cursor-pointer" href="/login">Login</a> here</small>
        </div>
      </div>
    </div>
  )
}

export default SignUp;