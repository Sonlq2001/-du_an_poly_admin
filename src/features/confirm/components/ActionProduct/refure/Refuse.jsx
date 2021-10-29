import React from 'react';
import { useFormik } from 'formik';
import { From, GroupButton } from './Refuse.styles';
import { Button } from '../../../../../components/Button/Button';
import { useDispatch } from 'react-redux';
import { updateProduct } from '../../../redux/product.slice';
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
      } else if (values.reason.length < 20) {
        errors.reason = 'Không ít hơn 50 ký tự !';
      }
      return errors;
    },
    onSubmit: (values) => {
      console.log('value', values);
      dispatch(updateProduct(item));
      setItemRefuse(false);
    },
  });
  return (
    <From onSubmit={formik.handleSubmit}>
      <textarea
        name="reason"
        id="input"
        className="form-control"
        rows="3"
        required="required"
        onChange={formik.handleChange}
        placeholder="lý do từ trối "
      ></textarea>
      {formik.errors.reason ? (
        <div className="errors">{formik.errors.reason}</div>
      ) : null}
      <GroupButton>
        <label onClick={() => setItemRefuse(false)}> Hủy </label>
        <Button color="primary" size="lg">
          lưu
        </Button>
      </GroupButton>
    </From>
  );
};

export default Refuse;
