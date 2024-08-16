import { ValidationError } from 'yup';
import { Errors } from './types';
import * as yup from 'yup';

export const schema = yup.object().shape({
  name: yup
    .string()
    .required()
    .matches(/^[\p{Lu}\p{Lt}].*$/u, 'name must be capitalized'),

  age: yup
    .number()
    .required()
    .typeError('age must be a number')
    .min(18, 'age must more than 17'),

  email: yup.string().email().required(),

  password: yup
    .string()
    .required()
    .test('password-complexity', function (value: string = ''):
      | true
      | yup.ValidationError {
      const lowercaseRegex = /[a-z]/;
      const uppercaseRegex = /[A-Z]/;
      const numberRegex = /[0-9]/;
      const symbolRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-]/;

      const errors = [];

      if (!lowercaseRegex.test(value))
        errors.push('one lowercase letter in latin');
      if (!uppercaseRegex.test(value))
        errors.push('one capital letter in latin');
      if (!numberRegex.test(value)) errors.push('one digit');
      if (!symbolRegex.test(value)) errors.push('one special character');

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
    .required('confirm password')
    .oneOf([yup.ref('password')], 'passwords must match'),

  gender: yup.string().required(),

  terms: yup.boolean().isTrue('you should agree our awesome terms').required(),

  picture: yup
    .mixed()
    .required()
    .test(
      'file-size',
      'attach an image with a size smaller than 1MB',
      (value) => {
        if (isFile(value)) return value && value[0].size <= 1000000;
      },
    )
    .test('file-type', 'png, jpeg or jpg are allowed', (value) => {
      if (isFile(value))
        return value[0].type === 'image/jpeg' || value[0].type === 'image/png';
    }),

  country: yup.string().required(),
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
