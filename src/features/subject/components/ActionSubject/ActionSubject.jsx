import React, { memo, useEffect } from 'react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { unwrapResult } from '@reduxjs/toolkit';

import { ContentForm, GroupAction } from './ActionSubject.styles';
import ElementInput from 'components/FormElements/ElementInput/ElementInput';
import ElementSelect from 'components/FormElements/ElementSelect/ElementSelect';
import { Button } from 'components/Button/Button';
import { AiOutlineSave } from 'react-icons/ai';
import { schema } from './../../helpers/subject.helpers';

import { postSubject, putSubject } from './../../redux/subject.slice.js';
import { getMajors } from 'features/majors/redux/majors.slice';
import { MapOptions } from 'helpers/convert/map-options';
import { initForm } from './../../helpers/subject.helpers';

const ActionSubject = ({ item, setOpen }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMajors());
  }, [dispatch]);
  const { listMajors } = useSelector((state) => state.majors);
  const listSelectMajor = MapOptions(listMajors);
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={item}
        validationSchema={schema}
        onSubmit={(values, { resetForm }) => {
          if (item?.name === '') {
            dispatch(postSubject(values))
              .then(unwrapResult)
              .then(() => toast.success('Thêm thành công !'))
              .finally(() => {
                resetForm({ ...initForm });
                setOpen(false);
              });
          } else {
            dispatch(putSubject(values))
              .then(unwrapResult)
              .then(() => toast.success('Cập nhật  thành công !'))
              .finally(() => {
                resetForm({ ...initForm });
                setOpen(false);
              });
          }
        }}
      >
        {({ handleSubmit }) => {
          return (
            <ContentForm>
              <div className="from-group">
                <label htmlFor="">Chuyên Ngành </label>
                <div className="box-select">
                  <ElementSelect
                    className="select"
                    name="major_id"
                    placeholder="Chọn chuyên ngành"
                    options={listSelectMajor ? listSelectMajor : []}
                  />
                </div>
              </div>
              <div className="from-group">
                <label htmlFor=""> Môn Học </label>
                <ElementInput
                  type="text"
                  placeholder="Tên chuyên ngành"
                  name="name"
                />
              </div>
              <div className="from-group">
                <label htmlFor=""> Mã Môn </label>
                <ElementInput type="text" placeholder="Mã Môn" name="code" />
              </div>

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
                  onClick={() => handleSubmit()}
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

export default memo(ActionSubject);
