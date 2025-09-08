import AppRoutes from './appRoutes';
import AuthRoutes from './authRoutes';

export default function Routes() {
  const signed = false;

  return signed ? <AppRoutes /> : <AuthRoutes />;
}
