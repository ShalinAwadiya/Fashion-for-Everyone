export function isEmpty(value) {
  return (!value || value.trim().length === 0) ? 'This field is required' : '';
}

export function isEmail(value) {
  return (!value || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) ? 'Invalid email address' : '';
}