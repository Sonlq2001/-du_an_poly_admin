import React, { memo, useEffect } from 'react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineSave } from 'react-icons/ai';

import { ContentForm, GroupAction } from './ActionUser.styles';
import ElementInput from 'components/FormElements/ElementInput/ElementInput';
import ElementCheckbox from 'components/FormElements/ElementCheckbox/ElementCheckbox';
import { Button } from 'components/Button/Button';

import { putUsers } from './../../redux/user.slice';
import { getRole } from 'features/role/redux/role.slice';
// import { schema } from './../../helpers/subject.helpers';

// import { postSubject, putSubject } from './../../redux/user.slice';

const ActionUser = ({ item, setOpen, options }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRole());
  }, [dispatch]);

  const { listRole } = useSelector((state) => ({
    listRole: state.role.listRole,
  }));

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={item}
        onSubmit={async (value, { resetForm }) => {
          dispatch(
            putUsers({
              id: value.id,
              user: {
                role: value.roles,
              },
            })
          );
        }}
      >
        {({ handleSubmit }) => {
          return (
            <ContentForm>
              <div className="from-group">
                <label htmlFor="">Tên</label>
                <ElementInput type="text" placeholder="Tên" name="name" />
              </div>

              <div className="from-group">
                <label htmlFor="">Vị trí</label>
                <ElementCheckbox name="roles" data={listRole} />
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

export default memo(ActionUser);
