// Author: Deep Adeshra (dp974154@dal.ca)
import { isEmpty, isEmail } from "./common-validators"

const signupValidator = {
  firstName: [
    (firstName) => { return isEmpty(firstName) }
  ],
  email: [
    (email) => { return isEmpty(email) },
    (email) => { return isEmail(email) }
  ],
  password: [
    (password) => { return isEmpty(password) },
    (password) => { return checkPassword(password) }
  ],
}

export function checkPassword(password) {
  return (!password || password.trim().length < 8) ?
    'Password must be at least 8 characters long' : '';
}

export default signupValidator;