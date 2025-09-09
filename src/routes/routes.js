import { useContext } from 'react';
import ScreensStack from '../routes/stackRoutes';
import AuthRoutes from './authRoutes';
import { AuthContext } from '../contexts/authentication';

export default function Routes() {
  const { userSigned } = useContext(AuthContext);
  const signed = userSigned;

  return signed ? <ScreensStack /> : <AuthRoutes />;
}
