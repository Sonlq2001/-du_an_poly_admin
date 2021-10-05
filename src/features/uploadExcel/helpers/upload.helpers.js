import * as Yup from 'yup';

const SUPPORTED_FORMATS = [
  '.csv',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel',
];

export const schema = Yup.object().shape({
  branch: Yup.string().required('Vui lòng chọn cơ sở !'),
  file: Yup.mixed()
    .required('Vui lòng chọn file upload !')
    .test('file', 'Định dạng file không đúng !', (value) =>
      SUPPORTED_FORMATS.includes(value?.type)
    )
    .test(
      'file',
      'Kích thước file quá lớn !',
      (value) => value === null || (value && value?.size <= 100000)
    ),
});

export const initForm = {
  branch: '',
  file: null,
};
