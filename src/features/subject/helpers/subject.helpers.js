import * as Yup from 'yup';

export const schema = Yup.object().shape({
  name: Yup.string().required('Vui lòng nhập môn học !'),
  code: Yup.string().required('Vui lòng nhập mã số sinh viên !'),
  major_id: Yup.string().required('Vui lòng chọn giảng viên !'),
});

export const initForm = {
  name: '',
  code: '',
  major_id: '',
};
