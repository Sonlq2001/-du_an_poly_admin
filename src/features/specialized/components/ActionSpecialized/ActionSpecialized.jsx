import React from 'react';
import { Formik } from 'formik';
import { AiOutlineSave } from 'react-icons/ai';

import { ContentForm, GroupAction } from './ActionSpecialized.styles';
import { schema } from './../../helpers/specialized.helpers';
import ElementInput from './../../../../components/FormElements/ElementInput/ElementInput';
import ElementSelect from './../../../../components/FormElements/ElementSelect/ElementSelect';
import { Button } from './../../../../components/Button/Button';

const ActionSpecialized = ({ item, setItemSpecialized, setOpen }) => {
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={item}
        validationSchema={schema}
        onSubmit={(values) => {
          if (item.name === '') {
            // TODO: add
          } else {
            // TODO: edit
          }
        }}
      >
        {({ handleSubmit, resetForm, setStatus }) => {
          return (
            <ContentForm>
              <div className="from-group">
                <label htmlFor="">Giảng viên</label>
                <div className="box-select">
                  <ElementSelect
                    className="select"
                    name="teacher"
                    placeholder="Chọn giảng viên"
                    options={[
                      { value: '1', label: 'Trần Hữu Thiện' },
                      { value: '2', label: 'Lê Trọng Đạt' },
                      { value: '3', label: 'Lê Trọng Đạt' },
                      { value: '4', label: 'Lê Trọng Đạt' },
                    ]}
                  />
                </div>
              </div>
              <div className="from-group">
                <label htmlFor=""> Chuyên ngành </label>
                <ElementInput
                  type="text"
                  placeholder="Tên chuyên ngành"
                  name="name"
                />
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

export default ActionSpecialized;
