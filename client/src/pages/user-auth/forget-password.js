// Author: Deep Adeshra (dp974154@dal.ca)
import useForm from "../../hooks/useForm";
import { ToastContainer, toast } from 'react-toastify';
import { useCallback } from "react";
import forgetPasswordValidator from "../../validators/forget-password-validator";
import { sendPasswordReset } from "../../utils/firebase";

function ForgetPassword(props) {
  const initialValues = {
    email: "",
  };

  const onSubmit = () => {
    sendPasswordReset(values.email);
  };

  const {
    values,
    changeHandler,
    errors,
    touched,
    submitHandler
  } = useForm({ initialValues: initialValues, validations: forgetPasswordValidator, onSubmit: onSubmit });

  return (
    <div id="ForgetPassword">
      <ToastContainer />
      <div className="login-form mt-3 shadow-lg bg-white">
        <h3 className="text-center">Forget Password</h3>
        <hr />
        <p className="text-center form-text text-muted" style={{ marginTop: '15px' }}>Enter your email address</p>
        <div className="col-md-12 mt-4">
          <div className="form-group">
            <input name="email" value={values.email} onChange={changeHandler} type="email" className="form-control" aria-describedby="emailHelp" placeholder="Enter Your email" />
            {errors.email ? <small className="error">{errors.email}</small> : <small>Your email address</small>}
          </div>
          <button type="submit" onClick={submitHandler} className="btn btn-primary signup-btn">Send me a link</button>
        </div>
      </div>
    </div>
  )
}

export default ForgetPassword;