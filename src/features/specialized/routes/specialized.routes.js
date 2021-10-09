import { lazy } from 'react';

import { SPECIALIZED_PATH } from './../constants/specialized.paths';

const SPECIALIZED_SCREEN = {
  id: 'id_specialize',
  path: SPECIALIZED_PATH.LIST,
  component: lazy(() => import('./../screens/SpecializedScreen')),
  pageTitle: 'Quản trị chuyên ngành',
};

export const SPECIALIZED_ROUTES = [SPECIALIZED_SCREEN];
