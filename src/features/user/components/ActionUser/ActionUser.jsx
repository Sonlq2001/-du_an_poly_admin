import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, ErrorMessage } from 'formik';
import { AiOutlineSave } from 'react-icons/ai';
import { toast } from 'react-toastify';
import Select from 'react-select';

import ElementInput from 'components/FormElements/ElementInput/ElementInput';
import { Button } from 'components/Button/Button';
import { GroupAction, ContentForm } from './AddUser.styles';
import { initFormAdd, schema } from 'features/user/helpers/user.helpers';
import { getMajors } from 'features/majors/redux/majors.slice';
import { getCampuses } from 'features/campuses/redux/campuses.slice';
import { postUsers } from 'features/user/redux/user.slice';
import { MajorData } from 'features/user/constants/user.constants';

const ActionUser = ({ setOpen }) => {
  const dispatch = useDispatch();
  const [isShowRole, setIsShowRole] = useState(false);
  const { superAdmin, campus_id } = useSelector((state) => ({
    superAdmin: state.auth?.userLogin?.superAdmin,
    campus_id: state.auth?.userLogin?.campus_id,
  }));
  const [isLoading, setLoading] = useState(false);
  const getAll = useCallback(() => {
    dispatch(getCampuses());
    dispatch(getMajors());
  }, [dispatch]);
  useEffect(() => {
    getAll();
  }, [dispatch, getAll]);

  const TYPE_ROLE = [
    { label: 'Giảng viên ', value: 1 },
    { label: 'Chủ nhiệm bộ môn', value: 3 },
    ...(superAdmin ? [{ label: 'Giáo vụ', value: 4 }] : []),
  ];

  const handleChangeRole = (option, setFieldValue) => {
    if (option.value === 4) {
      setIsShowRole(false);
    } else {
      setIsShowRole(true);
    }
    setFieldValue('type', option.value);
  };

  const handleChangeMajor = (option, setFieldValue) => {
    setFieldValue('major_id', option.value);
  };
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initFormAdd}
        validationSchema={schema}
        onSubmit={async (values, { resetForm }) => {
          setLoading(true);
          values.campus_id = campus_id;
          const response = await dispatch(postUsers(values));
          if (postUsers.fulfilled.match(response)) {
            toast.success('Thành công !');
          } else {
            toast.error('Đã gặp 1 số sự cố, vui lòng thử lại sau !');
          }
          resetForm();
          setLoading(false);
          setOpen(false);
        }}
      >
        {({ handleSubmit, setFieldValue }) => {
          return (
            <ContentForm>
              <div className="from-group">
                <label htmlFor="">Tên giảng viên</label>
                <ElementInput
                  type="text"
                  placeholder="Tên giảng viên "
                  name="name"
                />
              </div>
              <div className="from-group">
                <label htmlFor="">Email</label>
                <ElementInput type="text" placeholder="Email" name="email" />
              </div>
              <div className={`from-group`}>
                <label htmlFor="">Chức vụ</label>
                <div className="box-select">
                  <Select
                    options={TYPE_ROLE}
                    placeholder="Chức vụ "
                    className="select"
                    name="type"
                    onChange={(option) =>
                      handleChangeRole(option, setFieldValue)
                    }
                  />
                  <ErrorMessage
                    name="type"
                    component="div"
                    className="error-msg"
                  />
                </div>
              </div>
              {isShowRole && (
                <div className="from-group">
                  <label htmlFor="">Chuyên ngành</label>
                  <div className="box-select">
                    <Select
                      options={MajorData}
                      placeholder="Chức vụ "
                      className="select"
                      name="major_id"
                      onChange={(option) =>
                        handleChangeMajor(option, setFieldValue)
                      }
                    />
                  </div>
                </div>
              )}
              <GroupAction>
                <Button
                  size="medium"
                  onClick={() => {
                    setOpen(false);
                    setLoading(false);
                  }}
                >
                  Hủy
                </Button>
                <Button
                  size="medium"
                  color="primary"
                  icon={<AiOutlineSave />}
                  type="submit"
                  onClick={() => handleSubmit()}
                  loading={isLoading}
                  disabled={isLoading}
                >
                  Lưu
                </Button>
              </GroupAction>
            </ContentForm>
          );
        }}
      </Formik>
    </>
  );
};
export default ActionUser;
