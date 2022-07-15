// Author: Deep Adeshra (dp974154@dal.ca)

import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import AXIOS_CLIENT from "../../utils/apiClient";
import ProfileDefaultPic from "../../assets/images/profile-default.jpg"
import updateProfileValidator from "../../validators/updateProfile-validator";
import useForm from "../../hooks/useForm";
import { auth, getUserProfile, updateFirebaseUserProfile } from "../../utils/firebase";


function Profile(props) {
  const [userDetails, setUserDetails] = useState({
    email: "",
    name: "",
    password: ""
  });

  const getUserDetails = async () => {
    try {
      // setValues(await getUserProfile());
      const res = await AXIOS_CLIENT.get('/users');
      setValues(res.data)
    } catch (err) {
      console.log(err)
      toast.error("Something went wrong!");
    }
  }

  const updateUserProfile = async () => {
    try {
      await updateFirebaseUserProfile(values);
      const res = await AXIOS_CLIENT.put('/users', values);
      await(getUserDetails())
      toast.success("Done!!");
    } catch (err) {
      console.log(err)
      toast.error("Something went wrong!");
    }
  }

  const {
    values,
    changeHandler,
    errors,
    submitHandler,
    setValues
  } = useForm({ initialValues: userDetails, validations: updateProfileValidator, onSubmit: updateUserProfile });

  useEffect(() => {
    getUserDetails();
  }, [])

  return (
    <div className="col-md-6 card mx-auto rounded shadow mt-5">
      <ToastContainer />
      <h3 className="text-center mt-3 text-muted">Profile settings</h3>
      <div className="col-md-6 mx-auto d-flex flex-column">
        <img className="rounded-circle z-depth-2 m-4" alt="50x50" src={userDetails.picture || ProfileDefaultPic}
          data-holder-rendered="true" />

        <div className="form-group">
          <input value={values.name} name="name" onChange={changeHandler} className="form-control" type={"text"} placeholder="name"></input>
          {errors.name ? <small className="error">{errors.name}</small> : <small>Your name</small>}

          <input value={values.email} name="email" onChange={changeHandler} className="form-control mt-3" type={"email"} placeholder="email"></input>
          {errors.email ? <small className="error">{errors.email}</small> : <small>Your email</small>}

          <input value={values.password} name="password" onChange={changeHandler} className="form-control mt-3" type={"password"} placeholder="password"></input>
          {errors.password ? <small className="error">{errors.password}</small> : <small>Your password</small>}

          <div className="mx-auto col-md-6 mt-3">
            <button onClick={submitHandler} className="btn btn-primary w-100 mx-auto"> Update</button>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Profile;