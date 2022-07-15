// Author: Deep Adeshra (dp974154@dal.ca)
/**
 * Reference: https://dimitr.im/form-validation-react-hooks
**/

import { useEffect, useState } from "react";

function validate(validations, values, fieldName) {
  const validation = validations[fieldName];

  if (!validation) {
    return null;
  }
  const value = values[fieldName];
  const errors = []

  for (const i in validation) {
    errors.push(validation[i](value));
  }

  return errors.filter(error => error !== '').join(', ');
}

function useForm({ initialValues = {}, validations = {}, onSubmit = () => { } }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setValid] = useState(true);

  const changeHandler = event => {
    const fieldName = event.target.name;
    const newValues = { ...values, [fieldName]: event.target.value };
    const error = validate(validations, newValues, fieldName);
    const newErrors = { ...errors, [fieldName]: error };

    setValues(newValues);
    setValid(Object.keys(newErrors).length === 0);
    setErrors(newErrors);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    //check if all fields are valid
    const newErrors = {};

    for (const fieldName in validations) {
      const error = validate(validations, values, fieldName);

      if (error) {
        newErrors[fieldName] = error;
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length != 0) {
      return;
    }

    onSubmit(values);
  }

  return {
    values,
    setValid,
    setErrors,
    setValues,
    changeHandler,
    isValid,
    errors,
    submitHandler
  };
}

export default useForm;