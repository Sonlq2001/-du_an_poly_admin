import { lazy } from 'react';
const ROLE_SCREEN = {
  id: 'id_role',
  path: '/role',
  component: lazy(() => import('./../screens/RoleScreen/RoleScreen')),
  pageTitle: 'Phân Quyền',
};

export const ROLE_ROUTES = [ROLE_SCREEN];
