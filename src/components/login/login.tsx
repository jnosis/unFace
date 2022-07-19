import React, { useRef } from 'react';
import Actions from '../actions/actions';
import styles from './login.module.css';

type LoginProps = {
  isLogin: boolean;
  onSignClick(user?: LoginInfo): void;
};

const Login = ({ isLogin, onSignClick }: LoginProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (isLogin) {
      onSignClick();
      return;
    }

    const loginInfo: LoginInfo = {
      username: usernameRef.current?.value || '',
      password: passwordRef.current?.value || '',
    };
    onSignClick(loginInfo);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <form ref={formRef} className={styles.form}>
          {!isLogin && (
            <>
              <label className={`${styles.field} ${styles.username}`}>
                Username
                <input
                  ref={usernameRef}
                  className={styles.input}
                  type='text'
                  name='username'
                  placeholder='username'
                />
              </label>
              <label className={`${styles.field} ${styles.password}`}>
                Password
                <input
                  ref={passwordRef}
                  className={styles.input}
                  type='password'
                  name='password'
                  placeholder='password'
                />
              </label>
            </>
          )}
          <Actions
            actions={[
              {
                type: 'submit',
                title: !isLogin ? 'Sign in' : 'Sign out',
                isDisable: false,
                onClick: onSubmit,
              },
            ]}
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
