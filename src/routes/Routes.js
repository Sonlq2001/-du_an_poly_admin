import { Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import DefaultLayout from './../layouts/DefaultLayout/DefaultLayout';
import { LIST_ROUTES } from './routes.config';
import Loading from './../components/Loading/Loading';
import LoginRedirect from 'features/auth/helpers/LoginRedirect';
import { CONFIRM_PATHS } from 'features/confirm/constants/confirm.paths';

const WrapRoute = ({
  component: Component,
  path,
  layout,
  exact,
  isPrivateRoute,
  pageTitle = '',
}) => {
  const RouteLayout = layout || DefaultLayout;
  const isExact = exact || false;
  const isSignedIn = useSelector((state) => !!state.auth.accessToken);
  const routerPermission = useSelector((state) => state.auth.privateRouter);

  document.title = pageTitle ?? '';
  const privateRouter = routerPermission
    ?.map((pathPrivate) =>
      pathPrivate.url === CONFIRM_PATHS.LIST
        ? `${CONFIRM_PATHS.LIST}/:path?`
        : pathPrivate.url
    )
    .concat('/');
  if (isPrivateRoute && !isSignedIn) {
    return <LoginRedirect />;
  }

  if (privateRouter && !privateRouter.includes(path) && isSignedIn) {
    return <Redirect to="/" />;
  }

  return (
    <Route
      exact={isExact}
      path={path}
      render={(props) => {
        const Content = () => {
          return (
            <RouteLayout>
              <Component {...props} />
            </RouteLayout>
          );
        };
        return <Content />;
      }}
    />
  );
};

const Routes = () => {
  return (
    <Suspense fallback={<Loading isFullScreen />}>
      <Switch>
        {LIST_ROUTES.map((route) => (
          <WrapRoute key={route.id} {...route} />
        ))}
      </Switch>
    </Suspense>
  );
};

export default Routes;
