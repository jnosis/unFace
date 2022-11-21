import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

type AuthContextType = {
  userToken: UserToken;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function createAuthContext({ children }: PropsWithChildren) {
  const [userToken, setUserToken] = useState<UserToken | null>(null);

  return (
    <AuthContext.Provider value={userToken && { userToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
