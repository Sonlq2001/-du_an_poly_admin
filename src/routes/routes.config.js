import { DASHBOARD_ROUTES } from "./../features/dashboard/routes/dashboard.routes";
import { CONFIRM_ROUTES } from "./../features/confirm/routes/confirm.routes";

export const LIST_ROUTES = [...CONFIRM_ROUTES, ...DASHBOARD_ROUTES];
