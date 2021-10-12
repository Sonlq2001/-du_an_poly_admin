import * as Yup from 'yup';

export const initForm = {
  name: '',
};

export const schema = Yup.object().shape({
  name: Yup.string().required('Vui lòng nhập tên chuyên ngành'),
});
