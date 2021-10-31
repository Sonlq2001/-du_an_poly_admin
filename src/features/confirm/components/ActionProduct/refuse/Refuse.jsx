import React from 'react';
import { useFormik } from 'formik';
import { From, GroupButton } from './Refuse.styles';
import { Button } from 'components/Button/Button';
import { useDispatch } from 'react-redux';
import { approveProduct } from '../../../redux/product.slice';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
const Refuse = ({ item, setItemRefuse }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      reason: '',
    },
    validate: (values) => {
      const errors = {};
      if (!values.reason) {
        errors.reason = 'Required';
      } else if (values.reason.length < 10) {
        errors.reason = 'Không ít hơn 10 ký tự !';
      }
      return errors;
    },
    onSubmit: (values) => {
      // status là từ chối
      const detail = {
        id: item.id,
        status: 0,
        message: values.reason,
      };
      setItemRefuse(false);
      dispatch(approveProduct(detail))
        .then(unwrapResult)
        .then(() => toast.success('Từ chối thành công !'))
        .catch((error) => toast.error(error.name[0]))
        .finally(() => setItemRefuse(false));
    },
  });
  return (
    <From onSubmit={formik.handleSubmit}>
      <textarea
        name="reason"
        id="input"
        class="form-control"
        rows="3"
        required="required"
        onChange={formik.handleChange}
        placeholder="lý do từ trối "
      ></textarea>
      {formik.errors.reason ? (
        <div className="errors">{formik.errors.reason}</div>
      ) : null}
      <GroupButton>
        <label onClick={() => setItemRefuse(false)}> Hủy </label>{' '}
        <Button color="primary" size="lg">
          lưu
        </Button>
      </GroupButton>
    </From>
  );
};

export default Refuse;
