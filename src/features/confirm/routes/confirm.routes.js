import { lazy } from "react";

const ConfirmScreen = lazy(() =>
	import("./../screens/ConfirmScreens/ConfirmScreen")
);

const CONFIRM_SCREEN = {
	id: "id_confirm",
	path: "/confirm",
	component: ConfirmScreen,
};

export const CONFIRM_ROUTES = [CONFIRM_SCREEN];
