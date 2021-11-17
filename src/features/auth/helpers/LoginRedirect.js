import qs from 'query-string';
import { Redirect, useLocation } from 'react-router-dom';

import { AUTH_PATHS } from './../constants/auth.paths';

const LoginRedirect = () => {
  const location = useLocation();

  return (
    <Redirect
      to="/sign-in"
      // to={{
      //   pathname: AUTH_PATHS.SIGN_IN,
      //   search: qs.stringify({
      //     redirect: location.pathname + location.search,
      //   }),
      // }}
    />
  );
};

export default LoginRedirect;
