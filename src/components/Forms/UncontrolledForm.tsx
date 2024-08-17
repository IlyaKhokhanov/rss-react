import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { convertBase64, schema, writeErrors } from '../../utils/utils';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  setBase64,
  setLastItem,
  setRefList,
} from '../../redux/slices/application';
import { Errors, FormData } from '../../utils/types';
import { ValidationError } from 'yup';
import { useNavigate } from 'react-router-dom';
import Error from '../Error/Error';
import styles from './Form.module.scss';

function UncontrolledForm() {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);

  const [countriesList, setCountriesList] = useState<string[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const dispatch = useAppDispatch();
  const { countries, base64 } = useAppSelector((state) => state.application);
  const navigate = useNavigate();

  function successSend(data: FormData) {
    dispatch(
      setRefList({
        age: data.age,
        password: data.password,
        country: data.country || '',
        email: data.email,
        gender: data.gender,
        name: data.name,
        terms: data.terms,
        picture: base64,
      }),
    );
    dispatch(setLastItem('uncontrolled'));
    navigate('/');
  }

  async function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = {
      name: nameRef.current ? nameRef.current.value : '',
      age: ageRef.current && ageRef.current.value ? +ageRef.current.value : -1,
      email: emailRef.current ? emailRef.current.value : '',
      password: passwordRef.current ? passwordRef.current.value : '',
      confirm: confirmRef.current ? confirmRef.current.value : '',
      gender: genderRef.current ? genderRef.current.value : '',
      terms: termsRef.current ? termsRef.current.checked : false,
      picture:
        pictureRef.current && pictureRef.current.files
          ? pictureRef.current.files
          : {},
      country: countryRef.current ? countryRef.current.value : '',
    };
    try {
      await schema.validate(data, { abortEarly: false });
      successSend(data);
    } catch (error) {
      if (error instanceof ValidationError) {
        setErrors(writeErrors(error));
      }
    }
  }

  async function handlePicture(e: ChangeEvent<HTMLInputElement>) {
    if ('files' in e.target && e.target.files) {
      const file: File = e.target.files[0];
      const base64 = await convertBase64(file);
      if (typeof base64 !== 'string') return;
      dispatch(setBase64(base64));
    }
  }

  function filterCountries(e: ChangeEvent<HTMLInputElement>) {
    const text: string = e.target.value;
    if (!text.length) setCountriesList([]);
    else {
      const matches = countries.filter((item) => {
        const regex = new RegExp(`${text}`, 'gi');
        return item.match(regex);
      });
      setCountriesList(matches);
    }
  }

  function setCountry(country: string) {
    if (countryRef.current) countryRef.current.value = country;
    setCountriesList([]);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Uncontrolled Form</h1>
      <form className={styles.form} onSubmit={submitHandler}>
        <input
          className={styles.input}
          style={{ marginBottom: errors.name ? 0 : 28 }}
          type="text"
          placeholder="Name"
          name="name"
          ref={nameRef}
        />

        <Error error={errors.name} />

        <input
          className={styles.input}
          style={{ marginBottom: errors.age ? 0 : 28 }}
          type="number"
          placeholder="Age"
          name="age"
          ref={ageRef}
        />

        <Error error={errors.age} />

        <input
          className={styles.input}
          style={{ marginBottom: errors.email ? 0 : 28 }}
          type="text"
          placeholder="Email"
          name="email"
          ref={emailRef}
        />

        <Error error={errors.email} />

        <input
          className={styles.input}
          style={{ marginBottom: errors.password ? 0 : 28 }}
          type="password"
          placeholder="Password"
          name="password"
          ref={passwordRef}
        />

        <Error error={errors.password} />

        <input
          className={styles.input}
          style={{ marginBottom: errors.confirm ? 0 : 28 }}
          type="password"
          placeholder="Confirm password"
          name="confirm"
          ref={confirmRef}
        />

        <Error error={errors.confirm} />

        <select
          className={styles.input}
          style={{ marginBottom: errors.gender ? 0 : 28 }}
          name="gender"
          ref={genderRef}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <Error error={errors.gender} />

        <div className={styles.picture}>
          <label
            htmlFor="picture"
            style={{ fontSize: 20, marginLeft: 10, marginBottom: 5 }}
          >
            Picture
          </label>
          <input
            className={styles.input}
            style={{ marginBottom: errors.picture ? 0 : 28 }}
            type="file"
            name="picture"
            ref={pictureRef}
            id="picture"
            onChange={handlePicture}
          />
        </div>

        <Error error={errors.picture} />

        <input
          className={styles.input}
          style={{
            marginBottom: countriesList.length || errors.country ? 0 : 28,
          }}
          type="text"
          placeholder="Country, e.g. Australia"
          name="country"
          ref={countryRef}
          onChange={filterCountries}
        />

        <Error error={errors.country} />

        {Boolean(countriesList.length) && (
          <div className={styles.countries}>
            {countriesList.map((country) => {
              return (
                <p
                  className={styles.country}
                  key={country}
                  onClick={(e) => {
                    if (e.target instanceof HTMLElement && e.target.textContent)
                      setCountry(e.target.textContent);
                  }}
                >
                  {country}
                </p>
              );
            })}
          </div>
        )}

        <div
          className={styles.terms}
          style={{ marginBottom: errors.terms ? 0 : 28 }}
        >
          <input type="checkbox" name="terms" ref={termsRef} id="terms" />
          <label htmlFor="terms">A Terms and Conditions agreement</label>
        </div>

        <Error error={errors.terms} />

        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default UncontrolledForm;
