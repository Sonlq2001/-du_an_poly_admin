import { DASHBOARD_ROUTES } from './../features/dashboard/routes/dashboard.routes';
import { CONFIRM_ROUTES } from './../features/confirm/routes/confirm.routes';
import { USER_LIST_ROUTES } from '././../features/user/routes/user.routes';
import { SUBJECT_ROUTES } from '././../features/subject/routes/subject.routes';
import { SPCIALIZED_ROUTES } from '../features/specialized/routes/specialized.routes';
import { PRODUCT_LIST_ROUTES } from '../features/product/routes/product.routes';
import { UPLOAD_EXCEL_ROUTES } from './../features/uploadExcel/routes/upload-excel.routes';
import { AUTH_ROUTES } from './../features/auth/routes/auth.routes';
import { SUBJECT_LIST_ROUTES } from '../features/listsubject/routes/Subject.routes';

export const LIST_ROUTES = [
  ...SUBJECT_LIST_ROUTES,
  ...SUBJECT_ROUTES,
  ...AUTH_ROUTES,
  ...UPLOAD_EXCEL_ROUTES,
  ...SPCIALIZED_ROUTES,
  ...PRODUCT_LIST_ROUTES,
  ...USER_LIST_ROUTES,
  ...CONFIRM_ROUTES,
  ...DASHBOARD_ROUTES,
];
