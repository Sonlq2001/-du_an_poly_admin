import { lazy } from "react";

const SUBJECT_SCREEN = {
	id: "id_subject",
	path: "/subject",
	component: lazy(() => import("./../screens/SubjectScreen")),
};

export const SUBJECT_ROUTES = [SUBJECT_SCREEN];
