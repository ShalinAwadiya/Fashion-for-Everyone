import { applyActionCode } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, reloadUser } from "../../utils/firebase";

function VerifyEmail(props) {
  const [emailVerified, setEmailVerified] = useState();

  useEffect(() => {
    handleVerifyEmail(auth, props.actionCode);
  }, [])

  const handleVerifyEmail = (auth, actionCode) => {
    applyActionCode(auth, actionCode).then((resp) => {
      setEmailVerified(true);
    }).catch((error) => {
      console.log(error)
      setEmailVerified(false);
    });
  }

  return (
    <div className="container d-flex flex-column" style={{ height: '100vh' }}>
      {emailVerified == true && <h1 className="text-center">Email Verified</h1>}
      {emailVerified == false &&
        <div>
          <h1 className="text-center">Something went wrong! Please check link again. </h1>
          <h2 className="text-center">Maybe your email is already verified</h2>
        </div>}
      <a className="btn btn-primary w-50 mx-auto mt-5" href="/">Home</a>
    </div>
  )
}

export default VerifyEmail;