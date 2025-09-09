import { createContext, useState } from 'react';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  async function signIn(email, password) {}

  return <AuthContext.Provider>{children}</AuthContext.Provider>;
}
