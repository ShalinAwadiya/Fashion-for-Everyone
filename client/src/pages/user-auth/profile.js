import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AXIOS_CLIENT from "../../utils/apiClient";

function Profile(props) {
  const [userDetails, setUserDetails] = useState({});

  const getUserDetails = async () => {
    try {
      const res = await AXIOS_CLIENT.get('/users');
      setUserDetails(res.data.user);
    } catch (err) {
      toast.error("Something went wrong!");
    }
  }

  useEffect(() => {
    getUserDetails();
  }, [])

  return (
    <div className="col-md-6 card mx-auto rounded shadow mt-5">
      <h3 className="text-center mt-3 text-muted">Profile settings</h3>
      <div class="col-md-6 mx-auto d-flex flex-column">
        <img class="rounded-circle z-depth-2 m-4" alt="50x50" src={userDetails.picture}
          data-holder-rendered="true" />

        <div className="form-group">
          <label className="mt-2">Name</label>
          <input value={userDetails.name} className="form-control" type={"text"} placeholder="name"></input>

          <label className="mt-2">Email</label>
          <input value={userDetails.email} className="form-control" type={"email"} placeholder="email"></input>

          <label className="mt-2">Password</label>
          <input value="" className="form-control" type={"password"} placeholder="password"></input>

          <div className="mx-auto col-md-6 mt-3">
            <button className="btn btn-primary w-100 mx-auto"> Update</button>
          </div>

        </div>
      </div>
    </div >
  )
}

export default Profile;