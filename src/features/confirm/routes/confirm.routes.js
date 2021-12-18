import { lazy } from 'react';

import { CONFIRM_PATHS } from '../constants/confirm.paths';
const ConfirmScreen = lazy(() =>
  import('../screens/ConfirmScreens/ConfirmScreen')
);

const CONFIRM_SCREEN = {
  id: 'id_confirm',
  path: `${CONFIRM_PATHS.LIST}/:path?`,
  component: ConfirmScreen,
  pageTitle: 'Quản trị sản phẩm',
  isPrivateRoute: true,
};

export const CONFIRM_ROUTES = [CONFIRM_SCREEN];
