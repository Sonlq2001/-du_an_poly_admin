import React from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import _get from 'lodash.get';

import { From, GroupButton } from './Refuse.styles';
import { Button } from 'components/Button/Button';
import { approveProduct } from '../../../redux/product.slice';

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
    onSubmit: async (values) => {
      // status là từ chối
      const detail = {
        id: item.id,
        status: 0,
        message: values.reason,
      };
      setItemRefuse(false);
      const response = await dispatch(approveProduct(detail));
      if (approveProduct.fulfilled.match(response)) {
        toast.success('Từ chối thành công !');
      } else {
        toast.error(_get(response.payload, 'name[0]'));
      }
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
