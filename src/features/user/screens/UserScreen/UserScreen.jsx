import React, { memo } from 'react';
import Select from 'react-select';

import {
  WrapContent,
  TitleMain,
  TitleControl,
  BoxControl,
  BoxSearchInput,
  InputSearch,
} from 'styles/common/common-styles';
import UserTable from './../../components/UserTable/UserTable';
import { DATA_FAKE } from '../../constants/user.constants';

const UserScreen = () => {
  return (
    <>
      <TitleMain>Chuyên ngành</TitleMain>
      <WrapContent>
        <TitleControl>Tìm kiếm</TitleControl>
        <BoxSearchInput>
          <BoxControl className="box-control">
            <label htmlFor="" className="label-control">
              Tên
            </label>
            <InputSearch
              type="text"
              placeholder="Tìm kiếm"
              className="input-filter input-search"
            />
          </BoxControl>

          <BoxControl className="box-control">
            <label htmlFor="" className="label-control">
              Vai trò
            </label>
            <Select
              className="select-option input-search"
              options={[
                { label: 'Quản trị', value: 1 },
                { label: 'Giáo vụ', value: 2 },
                { label: 'Giảng viên', value: 3 },
                { label: 'Sinh viên', value: 4 },
              ]}
              placeholder="Tìm theo vai trò"
            />
          </BoxControl>
        </BoxSearchInput>
      </WrapContent>

      {/* <UserControlTable /> */}
      <UserTable data={DATA_FAKE} />
    </>
  );
};

export default memo(UserScreen);
