import { isEmail, isEmpty } from "./common-validators"

const forgetPasswordValidator = {
  email: [
    (email) => { return isEmpty(email) },
    (email) => { return isEmail(email) }
  ],
}

export default forgetPasswordValidator;