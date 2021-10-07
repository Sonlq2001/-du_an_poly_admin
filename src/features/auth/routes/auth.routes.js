import { lazy } from 'react';
import { PATH_AUTH } from './../constants/auth.endpoints';
const AuthLayout = lazy(() => import('../layouts/AuthLayoutScreens'));
export const SIGN_IN_SCREEN = {
  id: 'id_sign_in',
  path: PATH_AUTH.SIGN_IN,
  component: lazy(() => import('./../screens/SignIn/SignInScreen')),
  layout: AuthLayout,
};

export const AUTH_ROUTES = [SIGN_IN_SCREEN];
