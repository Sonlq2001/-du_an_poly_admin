import React, { memo, useEffect } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';

import {
  WrapContent,
  TitleMain,
  TitleControl,
  BoxControl,
  BoxSearchInput,
  InputSearch,
} from '../../../styles/common/common-styles';
import MajorsTable from '../components/MajorsTable/MajorsTable';
import { getMajors } from '../redux/majors.slice';

const MajorsScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMajors());
  }, [dispatch]);

  const { listMajors } = useSelector((state) => state.majors);

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
              Chủ nhiệm
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

      {listMajors && listMajors.length > 0 ? (
        <MajorsTable data={listMajors} />
      ) : (
        <div>Chưa có chuyên ngành nào </div>
      )}
    </>
  );
};
export default memo(MajorsScreen);
