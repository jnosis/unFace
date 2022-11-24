import React, { useState } from 'react';
import { validateUser } from '../../util/validator';
import Action from '../../components/action/action';
import styles from './login.module.css';

type LoginInfoValidation = {
  username: boolean;
  password: boolean;
};

const initialLoginInfo: LoginInfo = {
  username: '',
  password: '',
};

function Login() {
  const [loginInfo, setLoginInfo] = useState<LoginInfo>(initialLoginInfo);
  const [validation, setValidation] = useState<LoginInfoValidation>({
    username: false,
    password: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValidation((validation) => ({
      ...validation,
      [name]: validateUser(name, value),
    }));
    setLoginInfo((loginInfo) => ({ ...loginInfo, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(loginInfo);
  };

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <form className={styles.card} onSubmit={handleSubmit}>
        <div className={styles.fields}>
          <label className={styles.field}>Username</label>
          <input
            className={`${styles.input}${
              validation.username ? '' : ` ${styles.invalid}`
            }`}
            type='text'
            name='username'
            value={loginInfo.username ?? ''}
            placeholder='username'
            required
            onChange={handleChange}
          />
          <label className={styles.field}>Password</label>
          <input
            className={`${styles.input}${
              validation.password ? '' : ` ${styles.invalid}`
            }`}
            type='password'
            name='password'
            value={loginInfo.password ?? ''}
            placeholder='password'
            required
            onChange={handleChange}
          />
        </div>
        <Action type='submit' title='Sign in' isDisable={false} />
      </form>
    </section>
  );
}

export default Login;
