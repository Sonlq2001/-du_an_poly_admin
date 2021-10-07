import { lazy } from 'react';
const SubjectScreenList = lazy(() => import('../screen/SubjectScreen'));
const SUBJECT_SCREE_LIST = {
  id: 'id_subject',
  path: '/subject/list',
  component: SubjectScreenList,
};
export const SUBJECT_LIST_ROUTES = [SUBJECT_SCREE_LIST];
