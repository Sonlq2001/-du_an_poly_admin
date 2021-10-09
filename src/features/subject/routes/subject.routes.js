import { lazy } from 'react';

import { SUBJECT_PATH } from './../constants/subject.paths';

const SUBJECT_SCREEN = {
  id: 'id_subject',
  path: SUBJECT_PATH.LIST,
  component: lazy(() => import('./../screens/SubjectScreen')),
};

export const SUBJECT_ROUTES = [SUBJECT_SCREEN];
