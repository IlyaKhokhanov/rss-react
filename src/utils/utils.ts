import { ValidationError } from 'yup';
import { Errors } from './types';
import * as yup from 'yup';

export const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is a required field')
    .matches(/^[\p{Lu}\p{Lt}].*$/u, 'Must be capitalized'),

  age: yup
    .number()
    .required('Age is a required field')
    .typeError('Must be a number')
    .min(18, 'Must be more than 17'),

  email: yup.string().email().required('Email is a required field'),

  password: yup
    .string()
    .required('Password is a required field')
    .test('password-complexity', function (value: string = ''):
      | true
      | yup.ValidationError {
      const lowercaseRegex = /[a-z]/;
      const uppercaseRegex = /[A-Z]/;
      const numberRegex = /[0-9]/;
      // eslint-disable-next-line no-useless-escape
      const symbolRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-]/;

      const errors = [];

      if (!lowercaseRegex.test(value))
        errors.push('One lowercase letter in latin');
      if (!uppercaseRegex.test(value))
        errors.push('One capital letter in latin');
      if (!numberRegex.test(value)) errors.push('One digit');
      if (!symbolRegex.test(value)) errors.push('One special character');

      if (errors.length > 0) {
        return this.createError({
          message: `password complexity - ${
            4 - errors.length
          }/4: password must contain at least ${errors.join(', ')}`,
        });
      }
      return true;
    }),

  confirm: yup
    .string()
    .required('Confirm password')
    .oneOf([yup.ref('password')], 'Passwords must match'),

  gender: yup.string().required(),

  terms: yup.boolean().isTrue('You should agree with terms').required(),

  picture: yup
    .mixed()
    .required()
    .test('file-size', 'Image size must be smaller than 1MB', (value) => {
      if (isFile(value)) return value && value[0].size <= 1000000;
    })
    .test('file-type', 'png, jpeg or jpg are allowed', (value) => {
      if (isFile(value))
        return value[0].type === 'image/jpeg' || value[0].type === 'image/png';
    }),

  country: yup.string().required('Country is a required field'),
});

export function convertBase64(file: File) {
  return new Promise((resolve, reject) => {
    const fileReader: FileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (): void => resolve(fileReader.result);
    fileReader.onerror = (error: ProgressEvent<FileReader>): void =>
      reject(error);
  });
}

export function writeErrors(error: ValidationError): Errors {
  const errors: Errors = {};
  error.inner.forEach((err) => {
    if (err.path && !(err.path in errors)) {
      switch (err.path) {
        case 'age':
          errors.age = { message: err.message };
          break;
        case 'name':
          errors.name = { message: err.message };
          break;
        case 'email':
          errors.email = { message: err.message };
          break;
        case 'password':
          errors.password = { message: err.message };
          break;
        case 'confirm':
          errors.confirm = { message: err.message };
          break;
        case 'terms':
          errors.terms = { message: err.message };
          break;
        case 'picture':
          errors.picture = { message: err.message };
          break;
        case 'country':
          errors.country = { message: err.message };
          break;
        case 'gender':
          errors.gender = { message: err.message };
          break;
        default:
      }
    }
  });
  return errors;
}

export function isFile(obj: unknown): obj is FileList {
  if (
    typeof obj === 'object' &&
    obj &&
    '0' in obj &&
    typeof obj[0] === 'object' &&
    obj[0] &&
    'size' in obj[0] &&
    typeof obj[0].size === 'number' &&
    'type' in obj[0] &&
    typeof obj[0].type === 'string'
  )
    return true;
  return false;
}
