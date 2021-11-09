import { lazy } from 'react';

import { SUBJECT_PATH } from '../constants/subject.paths';

const CATEGORY_SUBJECT_SCREEN = {
  id: 'id_subject',
  pageTitle: 'Quản trị môn học',
  path: '/category_subject',
  component: lazy(() => import('../screens/CategorySubjectScreen')),
};

export const CATEGORY_SUBJECT_ROUTES = [CATEGORY_SUBJECT_SCREEN];
