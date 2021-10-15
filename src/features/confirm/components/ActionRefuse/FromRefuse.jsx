import React from 'react';
import { useFormik } from 'formik';
import { From, GroupAction } from './FromRefuse.styles';
import { Button } from './../../../../components/Button/Button';
import { AiOutlineSave } from 'react-icons/ai';
import * as yup from 'yup';
const FromRefuse = ({ data, setOpen }) => {
  const formik = useFormik({
    initialValues: {
      reason: '',
    },
    validationSchema: yup.object().shape({
      reason: yup
        .string()
        .max(200)
        .required(' * Lý do  không được để trống ! '),
    }),
    onSubmit: (values, { resetForm }) => {
      // console.log('ở đây', data, values);
      resetForm();
      setOpen(false);
    },
  });
  return (
    <>
      <From onSubmit={formik.handleSubmit}>
        <textarea
          name="reason"
          id=""
          cols="30"
          rows="10"
          placeholder="từ trôi"
          onChange={formik.handleChange}
        ></textarea>
        {formik.errors.reason && formik.touched.reason ? (
          <span className={formik.errors.reason ? 'error' : ''}>
            {' '}
            {formik.errors.reason}{' '}
          </span>
        ) : null}
        <GroupAction>
          <Button
            size="medium"
            onClick={() => {
              setOpen(false);
            }}
          >
            Hủy
          </Button>
          <Button
            size="medium"
            color="primary"
            icon={<AiOutlineSave />}
            type="submit"
          >
            Lưu
          </Button>
        </GroupAction>
      </From>
    </>
  );
};

export default FromRefuse;
