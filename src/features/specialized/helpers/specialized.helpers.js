import * as Yup from 'yup';

export const initForm = {
  name: '',
  teacher: null,
};

export const schema = Yup.object().shape({
  name: Yup.string().required('Vui lòng nhập tên chuyên ngành'),
  teacher: Yup.string().required('Vui lòng chọn giảng viên').nullable(),
});
