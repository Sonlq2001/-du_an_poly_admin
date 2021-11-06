import { lazy } from 'react';

import { PERMISSIONS_PATH  } from '../constants/permissions.paths';

const PERMISSIONS_SCREEN = {
  id: 'id_permissions',
  path: '/permissions',
  component: lazy(() => import('./../screens/PermissionsScreen/PermissionsScreen')),
  pageTitle: '',
};

export const PERMISSIONS_ROUTES = [PERMISSIONS_SCREEN];
