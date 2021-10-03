import { lazy } from "react";

const UPLOAD_EXCEL_SCREEN = {
	id: "id_upload_excel",
	path: "/upload-excel",
	component: lazy(() => import("./../screens/UploadExcelScreen")),
};

export const UPLOAD_EXCEL_ROUTES = [UPLOAD_EXCEL_SCREEN];
