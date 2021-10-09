import React from 'react';
import { Formik } from 'formik';
import { ContentForm, GroupAction } from './ActionSubject.styles';
import ElementInput from './../../../../components/FormElements/ElementInput/ElementInput';
import ElementSelect from './../../../../components/FormElements/ElementSelect/ElementSelect';
import { Button } from './../../../../components/Button/Button';
import { AiOutlineSave } from 'react-icons/ai';
import { schema } from './../../helpers/subject.helpers';
const ActionSubject = ({ setItemSpecialized, item, setOpen }) => {
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
        {({ handleSubmit }) => {
          return (
            <ContentForm>
              <div className="from-group">
                <label htmlFor="">Chuyên Ngành </label>
                <div className="box-select">
                  <ElementSelect
                    className="select"
                    name="major_id"
                    placeholder="Chọn giảng viên"
                    options={[
                      { value: '1', label: 'Thiết kế đồ họa ' },
                      { value: '2', label: 'Thiết kế Website' },
                    ]}
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
                <ElementInput type="text" placeholder="Mã Môn " name="code" />
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

export default ActionSubject;
