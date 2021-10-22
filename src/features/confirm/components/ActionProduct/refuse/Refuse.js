import React from 'react';
import { useFormik } from 'formik';
import { From } from './Refuse.styles';
const Refuse = ({ item, setItemRefuse }) => {
  const formik = useFormik({
    initialValues: {
      lydo: '',
    },
    validate: (values) => {
      const errors = {};
      if (!values.lydo) {
        errors.lydo = 'Required';
      } else if (values.lydo.length < 20) {
        errors.lydo = 'Quá it ';
      }
      return errors;
    },
    onSubmit: (values) => {
      console.log('value', values);
    },
  });
  return (
    <From onSubmit={formik.handleSubmit}>
      <textarea
        name="lydo"
        id="input"
        class="form-control"
        rows="3"
        required="required"
        onChange={formik.handleChange}
      >
        {' '}
      </textarea>
      {formik.errors.lydo ? (
        <div className="erors">{formik.errors.lydo}</div>
      ) : null}
      <button> lưu</button>
    </From>
  );
};

export default Refuse;
