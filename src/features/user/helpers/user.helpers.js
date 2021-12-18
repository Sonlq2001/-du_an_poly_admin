import * as Yup from 'yup';
export const initForm = {
  name: null,
  avatar: null,
  email: null,
  description: null,
  roles: [],
  student_code: null,
};

export const schema = Yup.object().shape({
  name: Yup.string()
    .required('Vui lòng nhập môn học !')
    .min(5, 'Ký tự phải lớn hơn 5'),
  email: Yup.string()
    .email('Email không hợp lệ !')
    .required('Vui lòng nhập email !'),
  type: Yup.string().required('Vui lòng chọn loại   !'),
});

export const initFormAdd = {
  name: '',
  email: '',
  campus_id: '',
  major_id: '',
  type: '',
};
