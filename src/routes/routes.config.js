import { DASHBOARD_ROUTES } from "./../features/dashboard/routes/dashboard.routes";
import { CONFIRM_ROUTES } from "./../features/confirm/routes/confirm.routes";
import { USER_LIST_ROUTES } from "././../features/user/routes/user.routes";
import { SPCIALIZED_ROUTES } from "../features/specialized/routes/specialized.routes";
import { PRODUCT_LIST_ROUTES } from "../features/product/routes/product.routes";
import { UPLOAD_EXCEL_ROUTES } from "./../features/uploadExcel/routes/upload-excel.routes";

export const LIST_ROUTES = [
	...UPLOAD_EXCEL_ROUTES,
	...SPCIALIZED_ROUTES,
	...PRODUCT_LIST_ROUTES,
	...USER_LIST_ROUTES,
	...CONFIRM_ROUTES,
	...DASHBOARD_ROUTES,
];
