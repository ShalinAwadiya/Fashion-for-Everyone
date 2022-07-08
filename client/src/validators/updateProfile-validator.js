import { isAlphabaticString, isEmail, isEmpty } from "./common-validators"

const updateProfileValidator = {
  email: [
    (email) => { return isEmpty(email) },
    (email) => { return isEmail(email) }
  ],
  name: [
    (name) => { return isEmpty(name) },
    (name) => { return isAlphabaticString(name) }
  ]
}

export default updateProfileValidator;