import { lazy } from "react";

const DashboardScreen = lazy(() =>
	import("./../screens/DashboardScreens/DashboardScreen")
);

export const DASHBOARD_SCREEN = {
	id: "id_dashboard",
	path: "/",
	exact: true,
	component: DashboardScreen,
};

export const DASHBOARD_ROUTES = [DASHBOARD_SCREEN];
