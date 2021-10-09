import { lazy } from 'react';

import { USER_PATH } from './../constants/user.paths';

const USER_LIST = {
  id: 'id_user_list',
  path: USER_PATH.LIST,
  component: lazy(() => import('./../screens/UserScreen/UserScreen')),
  pageTitle: 'Quản trị User',
};

export const USER_LIST_ROUTES = [USER_LIST];
