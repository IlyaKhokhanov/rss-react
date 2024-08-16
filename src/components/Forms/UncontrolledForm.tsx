import { ChangeEvent, useRef, useState } from 'react';
import styles from './Form.module.scss';
import { convertBase64 } from '../../utils';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setBase64 } from '../../redux/slices/application';

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

  const dispatch = useAppDispatch();
  const { countries } = useAppSelector((state) => state.application);

  function submitHandler() {}

  async function handlePicture(
    e: ChangeEvent<HTMLInputElement>,
  ): Promise<void> {
    if ('files' in e.target && e.target.files) {
      const file: File = e.target.files[0];
      const base64 = await convertBase64(file);
      if (typeof base64 !== 'string') return;
      dispatch(setBase64(base64));
    }
  }

  function filterCountries(e: ChangeEvent<HTMLInputElement>): void {
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
          type="text"
          placeholder="Name"
          name="name"
          ref={nameRef}
        />

        <input
          className={styles.input}
          type="number"
          placeholder="Age"
          name="age"
          ref={ageRef}
        />

        <input
          className={styles.input}
          type="text"
          placeholder="Email"
          name="email"
          ref={emailRef}
        />

        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          name="password"
          ref={passwordRef}
        />

        <input
          className={styles.input}
          type="password"
          placeholder="Confirm password"
          name="confirm"
          ref={confirmRef}
        />

        <select className={styles.input} name="gender" ref={genderRef}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <div className={styles.picture}>
          <label
            htmlFor="picture"
            style={{ fontSize: 20, marginLeft: 10, marginBottom: 5 }}
          >
            Picture
          </label>
          <input
            className={styles.input}
            type="file"
            name="picture"
            ref={pictureRef}
            id="picture"
            onChange={handlePicture}
          />
        </div>

        <input
          className={styles.input}
          style={{ marginBottom: countriesList.length ? 5 : 20 }}
          type="text"
          placeholder="Country, e.g. Australia"
          name="country"
          ref={countryRef}
          onChange={filterCountries}
        />

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

        <div className={styles.terms}>
          <input type="checkbox" name="terms" ref={termsRef} id="terms" />
          <label htmlFor="terms">A Terms and Conditions agreement</label>
        </div>

        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default UncontrolledForm;
