import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import { AiOutlineSave } from 'react-icons/ai';
import { toast } from 'react-toastify';

import ElementInput from 'components/FormElements/ElementInput/ElementInput';
import { Button } from 'components/Button/Button';
import { GroupAction, ContentForm } from './AddUser.styles';
import ElementSelect from 'components/FormElements/ElementSelect/ElementSelect';
import { initFormAdd, schema,isinitFormAdd } from 'features/user/helpers/user.helpers';
import { getMajors } from 'features/majors/redux/majors.slice';
import { getCampuses } from 'features/campuses/redux/campuses.slice';
import { postUsers } from 'features/user/redux/user.slice';
import { MajorData } from 'features/user/constants/user.constants';


const ActionUser = ({ setOpen }) => {
  const dispatch = useDispatch();
  const {  messenger, superAdmin ,campus_id } = useSelector(
    (state) => ({
      messenger: state.user?.messenger,
      superAdmin: state.auth?.userLogin?.superAdmin,
      campus_id: state.auth?.userLogin?.campus_id,
    })
  );
  const [isLoading, setLoading] = useState(false);
  const [roleMini ,setRoleMini] =  useState(false)
  const [valueMajor,setValueMajor] = useState("")
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
    ...(superAdmin ?  [{ label: 'Giáo vụ', value: 4 }] : []),
  ];
 
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initFormAdd }
        validationSchema={schema}
        onSubmit={async (values, { resetForm }) => {
          setLoading(true);
          values.campus_id = campus_id
          values.major_id = !roleMini ?  "" :  valueMajor
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
        {({ handleSubmit }) => {
          return (
            <ContentForm>
              <div className="from-group">
                <label htmlFor="">Tên giảng viên </label>
                <ElementInput
                  type="text"
                  placeholder="Tên giảng viên "
                  name="name"
                />
              </div>
              <div className="from-group">
                <label htmlFor=""> Email </label>
                <ElementInput type="text" placeholder="Email" name="email" />
                {messenger && <div> {messenger.email[0]} </div>}
              </div>
        
              <div className="from-group">
                <label htmlFor=""> Chức vụ  </label>
                <div className="box-select">
                  <ElementSelect
                    type="text"
                    placeholder="Chức vụ "
                    className="select"
                    name="type"
                    options={TYPE_ROLE}
                    setRoleMini={setRoleMini}
                    setValueMajor={setValueMajor}
                  />
                </div>
              </div>
           {roleMini === true  &&  <div className="from-group">
                <label htmlFor=""> Chuyên ngành </label>
                <div className="box-select">
                  <ElementSelect
                    type="text"
                    placeholder="Chuyên Ngành "
                    className="select"
                    name="major_id"
                    options={MajorData}
                    setRoleMini={setRoleMini}
                    setValueMajor={setValueMajor}
                  />
                </div>
              </div>  
        }
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
