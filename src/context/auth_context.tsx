import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import authService from '../api/auth';

type AuthContextType = {
  userToken: UserToken | null;
  signup(user: UserInfo): Promise<void>;
  login(loginInfo: LoginInfo): Promise<void>;
  logout(): Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  userToken: null,
  signup: async () => {},
  login: async () => {},
  logout: async () => {},
});

export function AuthContextProvider({ children }: PropsWithChildren) {
  const [userToken, setUserToken] = useState<UserToken | null>(null);

  useEffect(() => {
    authService
      .me()
      .then((token) => {
        if (token) {
          setUserToken(token);
        }
      })
      .catch(() => setUserToken(null));
  }, [userToken]);

  const signup = useCallback(async (user: UserInfo) => {
    const token = await authService.signup(user);
    setUserToken(token);
  }, []);

  const login = useCallback(async (loginInfo: LoginInfo) => {
    const token = await authService.login(loginInfo);
    setUserToken(token);
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUserToken(null);
  }, []);

  const context = useMemo(
    () => ({ userToken, signup, login, logout }),
    [userToken, signup, login, logout]
  );

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
