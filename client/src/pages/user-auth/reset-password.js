import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import useForm from "../../hooks/useForm";
import { auth } from "../../utils/firebase";

// Ref: https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function ResetPassword(props) {
  const initialValues = {
    newPassword: "",
  };

  const [actionCode, setActioncode] = useState();
  const [lang, setLang] = useState();
  const [mode, setMOde] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const actionCode = props.actionCode;
    setActioncode(actionCode);
  }, []);

  const handleResetPassword = () => {
    verifyPasswordResetCode(auth, actionCode)
      .then((email) => {
        confirmPasswordReset(auth, actionCode, values.newPassword).then((resp) => {
          toast.success("Password reset done! Login again.")
        }).catch((error) => {
          toast.error("Something went wrong!")
        });
      }).catch((error) => {
        toast.error("Something went wrong! Please check URL again.")
      });
  }

  const onSubmit = () => {
    handleResetPassword()
  }

  const {
    values,
    changeHandler,
    errors,
    touched,
    submitHandler
  } = useForm({ initialValues: initialValues, validations: [], onSubmit: onSubmit });

  return (
    <div id="ForgetPassword">
      <ToastContainer />
      <div className="login-form mt-3 shadow-lg bg-white">
        <h3 className="text-center">Reset Password</h3>
        <hr />
        <p className="text-center form-text text-muted" style={{ marginTop: '15px' }}>Enter new Password</p>
        <div className="col-md-12 mt-4">
          <div className="form-group">
            <input name="newPassword" value={values.newPassword} onChange={changeHandler} type="password" className="form-control" aria-describedby="emailHelp" placeholder="Enter new password" />
            {errors.newPassword ? <small className="error">{errors.newPassword}</small> : <small>Enter new password</small>}
          </div>
          <button type="submit" onClick={submitHandler} className="btn btn-primary signup-btn">Reset password</button>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword;