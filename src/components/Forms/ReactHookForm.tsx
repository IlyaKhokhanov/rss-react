import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { convertBase64, schema } from '../../utils/utils';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  setBase64,
  setLastItem,
  setHookList,
} from '../../redux/slices/application';
import { FormData } from '../../utils/types';
import Error from '../Error/Error';
import styles from './Form.module.scss';

function ReactHookForm() {
  const [countriesList, setCountriesList] = useState<string[]>([]);
  const [countryText, setCountryText] = useState<string>();
  const dispatch = useAppDispatch();
  const { countries, base64 } = useAppSelector((state) => state.application);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  function successSend(data: FormData) {
    dispatch(
      setHookList({
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
    dispatch(setLastItem('hooklist'));
    reset();
    navigate('/');
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
    register('country').onChange(e);
    const text = e.target.value;
    setCountryText(text);
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
    setCountryText(country);
    setValue('country', country);
    setCountriesList([]);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>React Hook Form</h1>
      <form className={styles.form} onSubmit={handleSubmit(successSend)}>
        <input
          className={styles.input}
          style={{ marginBottom: errors.name ? 0 : 28 }}
          type="text"
          placeholder="Name"
          {...register('name')}
        />

        <Error error={errors.name} />

        <input
          className={styles.input}
          style={{ marginBottom: errors.age ? 0 : 28 }}
          type="number"
          placeholder="Age"
          {...register('age')}
        />

        <Error error={errors.age} />

        <input
          className={styles.input}
          style={{ marginBottom: errors.email ? 0 : 28 }}
          type="text"
          placeholder="Email"
          {...register('email')}
        />

        <Error error={errors.email} />

        <input
          className={styles.input}
          style={{ marginBottom: errors.password ? 0 : 28 }}
          type="password"
          placeholder="Password"
          {...register('password')}
        />

        <Error error={errors.password} />

        <input
          className={styles.input}
          style={{ marginBottom: errors.confirm ? 0 : 28 }}
          type="password"
          placeholder="Confirm password"
          {...register('confirm')}
        />

        <Error error={errors.confirm} />

        <select
          className={styles.input}
          style={{ marginBottom: errors.gender ? 0 : 28 }}
          {...register('gender')}
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
            id="picture"
            {...register('picture')}
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
          value={countryText ? countryText : ''}
          {...register('country')}
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
          <input type="checkbox" {...register('terms')} id="terms" />
          <label htmlFor="terms">A Terms and Conditions agreement</label>
        </div>

        <Error error={errors.terms} />

        <button disabled={!isValid} type="submit" className={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default ReactHookForm;
