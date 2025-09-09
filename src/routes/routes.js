import { useContext } from 'react';
import AppRoutes from './appRoutes';
import AuthRoutes from './authRoutes';
import { AuthContext } from '../contexts/authentication';

export default function Routes() {
  const { userSigned } = useContext(AuthContext);
  const signed = userSigned;

  return signed ? <AppRoutes /> : <AuthRoutes />;
}
