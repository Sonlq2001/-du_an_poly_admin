import { lazy } from "react";

const UserList = lazy(() => import("./../screens/UserScreen/UserScreen"));

const USER_LIST = {
	id: "id_user_list",
	path: "/user",
	component: UserList,
};

export const USER_LIST_ROUTES = [USER_LIST];
