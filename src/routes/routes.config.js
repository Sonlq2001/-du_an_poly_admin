import { DASHBOARD_ROUTES } from './../features/dashboard/routes/dashboard.routes';
import { CONFIRM_ROUTES } from './../features/confirm/routes/confirm.routes';
import { USER_LIST_ROUTES } from '././../features/user/routes/user.routes';
import { SUBJECT_ROUTES } from '././../features/subject/routes/subject.routes';
import { MAJORS_ROUTES } from '../features/majors/routes/majors.routes';
import { UPLOAD_EXCEL_ROUTES } from './../features/uploadExcel/routes/upload-excel.routes';
import { AUTH_ROUTES } from './../features/auth/routes/auth.routes';
import { FEEDBACK_ROUTES } from './../features/feedback/routes/feedback.routes';
import { PAGE404_ROUTES } from './../features/page404/routes/page404.routes';
import { PRODUCT_TYPE_ROUTES } from './../features/product-type/routes/product-type.routes';
import { SEMESTER_ROUTES } from './../features/semester/routes/semester.routes';

export const ROOT_ROUTE = '/';
export const AUTH_ROUTE = '/sign-in';

export const LIST_ROUTES = [
  ...SEMESTER_ROUTES,
  ...PRODUCT_TYPE_ROUTES,
  ...FEEDBACK_ROUTES,
  ...SUBJECT_ROUTES,
  ...AUTH_ROUTES,
  ...UPLOAD_EXCEL_ROUTES,
  ...MAJORS_ROUTES,
  ...USER_LIST_ROUTES,
  ...CONFIRM_ROUTES,
  ...DASHBOARD_ROUTES,
  ...PAGE404_ROUTES,
];
