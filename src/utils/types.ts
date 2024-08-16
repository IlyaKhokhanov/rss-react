export interface Errors {
  name?: { message: string };
  age?: { message: string };
  email?: { message: string };
  password?: { message: string };
  confirm?: { message: string };
  terms?: { message: string };
  picture?: { message: string };
  country?: { message: string };
  gender?: { message: string };
}

export interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirm: string;
  gender: string;
  terms: boolean;
  picture: object;
  country: string;
}
