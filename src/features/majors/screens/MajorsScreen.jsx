import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import {
  WrapContent,
  TitleMain,
  TitleControl,
  BoxControl,
  BoxSearchInput,
  InputSearch,
} from './../../../styles/common/common-styles';
import MajorsTable from './../components/MajorsTable/MajorsTable';
import { getMajors } from './../redux/majors.slice';
import Loading from './../../../components/Loading/Loading';
import GroupAlert from './../../../components/AlertMessage/AlertMessage';

const MajorsScreen = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(getMajors())
      .then(unwrapResult)
      .finally(() => setIsLoading(true));
  }, [dispatch]);

  const { listMajors } = useSelector((state) => state.majors);

  if (!isLoading) {
    return <Loading />;
  }
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
        </BoxSearchInput>
      </WrapContent>

      {listMajors && listMajors.length > 0 ? (
        <MajorsTable data={listMajors} />
      ) : (
        <div>Chưa có chuyên ngành nào </div>
      )}

      <GroupAlert />
    </>
  );
};
export default memo(MajorsScreen);
