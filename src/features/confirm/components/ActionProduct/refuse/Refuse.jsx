import React, { useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import { WrapFrom, GroupButton } from './Refuse.styles';
import { Button } from 'components/Button/Button';
import {
  postProductApprove,
  putProductChairmanApproved,
} from '../../../redux/product.slice';
import { defaultMessage } from 'constants/app.constants';

const Refuse = ({ item, setItemRefuse, setDisableButton }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const { userLogin } = useSelector((state) => ({
    userLogin: state.auth?.userLogin,
  }));

  return (
    <Formik
      enableReinitialize
      initialValues={{ message: '' }}
      validationSchema={Yup.object().shape({
        message: Yup.string()
          .required('Vui lòng điền nội dung !')
          .max(50, 'Số ký tự đã vượt quá !'),
      })}
      onSubmit={async (values, { resetForm }) => {
        setIsLoading(true);
        const detail = {
          id: item.id,
          status: 0,
          message: values.message,
        };
        setDisableButton(true);

        const actionDispatch = userLogin?.facultyChairman
          ? putProductChairmanApproved
          : postProductApprove;

        const response = await dispatch(actionDispatch(detail));
        if (actionDispatch.fulfilled.match(response)) {
          toast.success('Từ chối thành công !');
          window.location.reload();
        } else {
          toast.error(defaultMessage.problems);
        }
        setDisableButton(false);
        setIsLoading(false);
        setItemRefuse(false);

        resetForm({ message: '' });
      }}
    >
      {({ handleChange, handleBlur, values }) => {
        return (
          <Form>
            <WrapFrom>
              <textarea
                name="message"
                className="form-control"
                placeholder="Nội dung..."
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength="51"
                rows="3"
                value={values.message}
              />
              <ErrorMessage
                name="message"
                className="error-message"
                component="div"
              />
              <GroupButton>
                <label
                  onClick={() => setItemRefuse(false) + setDisableButton(false)}
                >
                  Hủy
                </label>
                <Button
                  type="submit"
                  color="primary"
                  size="lg"
                  loading={isLoading}
                  disabled={isLoading}
                >
                  Đồng ý
                </Button>
              </GroupButton>
            </WrapFrom>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Refuse;
