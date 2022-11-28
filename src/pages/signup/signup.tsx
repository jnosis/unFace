import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/auth_context';
import { validateUser } from '../../util/validator';
import Action from '../../components/action/action';
import { env } from '../../../config/env';
import styles from './signup.module.css';

const isPossibleSignup = env.status.signup;

type UserInfoValidation = {
  username: boolean;
  password: boolean;
  name: boolean;
  email: boolean;
};

const initialUserInfo: UserInfo = {
  username: '',
  password: '',
  name: '',
  email: '',
};

function Signup() {
  const { userToken, signup } = useAuthContext();

  const [userInfo, setUserInfo] = useState<UserInfo>(initialUserInfo);
  const [validation, setValidation] = useState<UserInfoValidation>({
    username: false,
    password: false,
    name: false,
    email: false,
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValidation((validation) => ({
      ...validation,
      [name]: validateUser(name, value),
    }));
    setUserInfo((userInfo) => ({ ...userInfo, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPossibleSignup && !Object.values(validation).includes(false)) {
      signup(userInfo);
      navigate('/login');
    }
  };

  useEffect(() => {
    if (userToken) {
      navigate('/', { replace: true });
    }
  }, [userToken]);

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Sign Up</h1>
      <form className={styles.card} onSubmit={handleSubmit}>
        <div className={styles.fields}>
          <label className={styles.field}>Username</label>
          <input
            className={`${styles.input}${
              validation.username ? '' : ` ${styles.invalid}`
            }`}
            type='text'
            name='username'
            value={userInfo.username ?? ''}
            placeholder='username'
            required
            onChange={handleChange}
            disabled={!isPossibleSignup}
          />
          <label className={styles.field}>Password</label>
          <input
            className={`${styles.input}${
              validation.password ? '' : ` ${styles.invalid}`
            }`}
            type='password'
            name='password'
            value={userInfo.password ?? ''}
            placeholder='password'
            required
            onChange={handleChange}
            disabled={!isPossibleSignup}
          />
          <label className={styles.field}>Name</label>
          <input
            className={`${styles.input}${
              validation.name ? '' : ` ${styles.invalid}`
            }`}
            type='text'
            name='name'
            value={userInfo.name ?? ''}
            placeholder='name'
            required
            onChange={handleChange}
            disabled={!isPossibleSignup}
          />
          <label className={styles.field}>Email</label>
          <input
            className={`${styles.input}${
              validation.email ? '' : ` ${styles.invalid}`
            }`}
            type='email'
            name='email'
            value={userInfo.email ?? ''}
            placeholder='email'
            required
            pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
            onChange={handleChange}
            disabled={!isPossibleSignup}
          />
        </div>
        <Action type='submit' title='Sign up' isDisable={!isPossibleSignup} />
      </form>
      {!isPossibleSignup && (
        <span className={styles.status}>Currently unavailable to sign up</span>
      )}
    </section>
  );
}

export default Signup;
