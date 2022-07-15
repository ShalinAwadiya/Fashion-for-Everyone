import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ResetPassword from "./reset-password";
import VerifyEmail from "./verify-email";

// Ref: https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function getParameterByName(name) {
  name = name.replace(/[\[\]]/g, '\\$&');

  let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(window.location.href);

  if (!results) {
    return null;
  } else if (!results[2]) {
    return '';
  }

  const result = decodeURIComponent(results[2].replace(/\+/g, ' '))
  return result;
}

function Action(props) {
  const navigate = useNavigate();
  const [componentToRender, setComponentToRender] = useState();

  useEffect(() => {
    const mode = getParameterByName('mode');
    const actionCode = getParameterByName('oobCode');
    let component = "";

    if (mode == 'resetPassword') {
      component = <ResetPassword actionCode={actionCode} />
    } else if (mode == "verifyEmail") {
      component = <VerifyEmail actionCode={actionCode} />
    }
    setComponentToRender(component)
  }, [])

  return (
    <div>
      {componentToRender}
    </div>
  )
}

export default Action;