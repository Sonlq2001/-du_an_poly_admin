import React, { memo } from 'react';

import ElementCheckbox from 'components/FormElements/ElementCheckbox/ElementCheckbox';
import { GroupField, GroupRole } from './PopupUser.styles';
import { Button } from 'components/Button/Button';

const PopupUser = ({ content, setOpen }) => {
  return (
    <>
      <GroupField>
        <label htmlFor="" className="label-field">
          Họ tên
        </label>
        <p className="content-field">{content.name}</p>
      </GroupField>
      <GroupField>
        <label htmlFor="" className="label-field">
          Email
        </label>
        <p className="content-field">{content.email}</p>
      </GroupField>
      <GroupField>
        <label htmlFor="" className="label-field">
          Điện thoại
        </label>
        <p className="content-field">{content.phone}</p>
      </GroupField>
      <GroupField>
        <label htmlFor="" className="label-field">
          Vai trò
        </label>
        <GroupRole>
          <ElementCheckbox label="Giảng viên" name="role1" id="role1" />
          <ElementCheckbox label="Giáo vụ" name="role2" id="role2" />
          <ElementCheckbox label="Admin" name="role3" id="role3" />
          <ElementCheckbox label="Quyền 1" name="role4" id="role4" />
          <ElementCheckbox label="Quyền 2" name="role5" id="role5" />
        </GroupRole>
      </GroupField>

      <GroupField>
        <Button onClick={() => setOpen(false)}>Hủy</Button>
        <Button color="primary">Lưu</Button>
      </GroupField>
    </>
  );
};

export default memo(PopupUser);
