import * as Yup from "yup";

export const schema = Yup.object().shape({
	subject: Yup.string().required("Vui lòng nhập môn học !"),
	code: Yup.string().required("Vui lòng nhập mã số sinh viên !"),
	gender: Yup.string().required("Vui lòng chọn giới tính !"),
	teacher: Yup.string().required("Vui lòng chọn giảng viên !"),
});

export const initForm = {
	subject: "",
	code: "",
	gender: "",
	teacher: "",
};
