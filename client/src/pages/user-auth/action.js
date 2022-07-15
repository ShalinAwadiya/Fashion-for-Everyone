import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ResetPassword from "./reset-password";

// Ref: https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function Action(props) {
  const navigate = useNavigate();
  const [componentToRender, setComponentToRender] = useState();

  useEffect(() => {
    const mode = getParameterByName('mode');
    const actionCode = getParameterByName('oobCode');

    if (mode != 'resetPassword') {
      navigate('/');
    }
    const resetComponent = <ResetPassword actionCode={actionCode} />
    setComponentToRender(resetComponent)
  }, [])

  return (
    <div>
      {componentToRender}
    </div>
  )
}

export default Action;