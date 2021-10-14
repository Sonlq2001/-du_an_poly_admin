import { Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import DefaultLayout from './../layouts/DefaultLayout/DefaultLayout';
import { LIST_ROUTES } from './routes.config';
import Loading from './../components/Loading/Loading';
import { AUTH_ROUTE, ROOT_ROUTE } from './routes.config';

const WrapRoute = ({
  component: Component,
  path,
  layout,
  exact,
  isAuthRoute,
}) => {
  const RouteLayout = layout || DefaultLayout;
  const isExact = exact || false;
  const { accessToken } = useSelector((state) => state.auth);

  if (!accessToken && !isAuthRoute) {
    return <Redirect to={AUTH_ROUTE} />;
  }

  if (accessToken && isAuthRoute) {
    return <Redirect to={ROOT_ROUTE} />;
  }

  // if (path === '/google/auth/:token' && !accessToken) {
  //   return <Redirect to={AUTH_ROUTE} />;
  // }

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
    <Suspense fallback={<Loading />}>
      <Switch>
        {LIST_ROUTES.map((route) => (
          <WrapRoute key={route.id} {...route} />
        ))}
      </Switch>
    </Suspense>
  );
};

export default Routes;
