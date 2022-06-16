function Profile(props) {
  return (
    <div className="col-md-6 card mx-auto rounded shadow mt-5">
      <h3 className="text-center mt-3 text-muted">Profile settings</h3>
      <div class="col-md-6 mx-auto">
        <img class="rounded-circle z-depth-2 m-4" alt="50x50" src="https://mdbootstrap.com/img/Photos/Avatars/img%20(31).jpg"
          data-holder-rendered="true" />

        <div className="form-group">
          <label className="mt-2">Name</label>
          <input className="form-control" type={"text"} placeholder="name"></input>
          <label className="mt-2">Email</label>
          <input className="form-control" type={"email"} placeholder="email"></input>
          <label className="mt-2">Phone</label>
          <input className="form-control" type={"text"} placeholder="phone"></input>
          <label className="mt-2">Password</label>
          <input className="form-control" type={"password"} placeholder="password"></input>
          <div className="mx-auto col-md-6 mt-3">
          <button className="btn btn-primary w-100 mx-auto"> Update</button>
          </div>

        </div>
      </div>
    </div >
  )
}

export default Profile;