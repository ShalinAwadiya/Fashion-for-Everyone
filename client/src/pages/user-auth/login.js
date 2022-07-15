// Author: Deep Adeshra (dp974154@dal.ca)

import useForm from "../../hooks/useForm";
import { ToastContainer, toast } from 'react-toastify';
import { useCallback } from "react";
import loginValidator from "../../validators/login-validators";
import { logInWithEmailAndPassword, signInWithGoogle } from "../../utils/firebase";

function Login() {
  const initialValues = {
    email: "",
    password: ""
  };

  const onSubmit = () => {
    logInWithEmailAndPassword(values.email, values.password);
  };

  const {
    values,
    changeHandler,
    errors,
    touched,
    submitHandler
  } = useForm({ initialValues: initialValues, validations: loginValidator, onSubmit: onSubmit });


  return (
    <div id="Login">
      <ToastContainer />
      <div className="login-form mt-3  shadow-lg bg-white">
        <h3 className="text-center">Login</h3>
        <hr />

        <div className="google-button" onClick={signInWithGoogle}>
          <a href="#" className="btn">
            <img width="15px" className="google-icon" alt="Google login"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
            Login with Google
          </a>
        </div>

        <p className="text-center form-text text-muted" style={{ marginTop: '15px' }}>Or using your email address</p>

        <div className="col-md-12 mt-4">
          <div className="form-group">
            <input name="email" value={values.email} onChange={changeHandler} type="email" className="form-control" aria-describedby="emailHelp" placeholder="Enter Your email" />
            {errors.email ? <small className="error">{errors.email}</small> : <small>Your email address</small>}
          </div>
          <div className="form-group">
            <input value={values.password} onChange={changeHandler} name="password" type="password" className="form-control" placeholder="Password" />
            {errors.password ? <small className="error">{errors.password}</small> : <small>Your password</small>}
          </div>
          <button type="submit" onClick={submitHandler} className="btn btn-primary signup-btn">Login</button>
          <small>Forget password? <a className="text-primary cursor-pointer" href="/forget-password"> click here</a> </small>
        </div>
      </div>
    </div>
  )
}

export default Login;