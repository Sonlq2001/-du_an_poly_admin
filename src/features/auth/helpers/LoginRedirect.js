import { Redirect } from 'react-router-dom';

import { AUTH_PATHS } from './../constants/auth.paths';

const LoginRedirect = () => {
  return <Redirect to={AUTH_PATHS.SIGN_IN} />;
};

export default LoginRedirect;
