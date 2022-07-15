// Author: Deep Adeshra (dp974154@dal.ca)
import { isEmail, isEmpty } from "./common-validators"

const loginValidator = {
  email: [
    (email) => { return isEmpty(email) },
    (email) => { return isEmail(email) }
  ],
  password: [
    (password) => { return isEmpty(password) },
  ],
}

export default loginValidator;