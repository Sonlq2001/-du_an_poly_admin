import React, { memo, useEffect, useState } from 'react';
import Select from 'react-select';
// import SubjectTable from './../components/SubjectTable/SubjectTable';
import SubjectTable from '../components/SubjectTable/SubjectTable';
import {
  WrapContent,
  TitleMain,
  TitleControl,
  BoxControl,
  BoxSearchInput,
  InputSearch,
} from './../../../styles/common/common-styles';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from './../redux/subject.slice';
import { getMajors } from './../../majors/redux/majors.slice';
import { unwrapResult } from '@reduxjs/toolkit';
import Loading from './../../../components/Loading/Loading';
import GroupAlert from './../../../components/AlertMessage/AlertMessage';

// gọi api
const SubjectScreen = () => {
  const dispatch = useDispatch();
  const subject = useSelector((state) => state.subject.data);
  const { listMajors } = useSelector((state) => state.majors);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    dispatch(getMajors());
    dispatch(fetchData())
      .then(unwrapResult)
      .finally(() => setIsLoading(true));
  }, [dispatch]);
  const DataMajors =
    listMajors &&
    listMajors.map((item) => {
      return { ...item, label: item.name, value: item.id };
    });

  if (!isLoading) {
    return <Loading />;
  }
  return (
    <>
      <TitleMain> Danh sách môn học</TitleMain>
      <WrapContent>
        <TitleControl>Tìm kiếm</TitleControl>
        <BoxSearchInput>
          <BoxControl className="box-control">
            <label htmlFor="" className="label-control">
              Tìm kiếm
            </label>
            <InputSearch
              type="text"
              placeholder="Tìm kiếm"
              className="input-filter input-search"
            />
          </BoxControl>

          <BoxControl className="box-control">
            <label htmlFor="" className="label-control">
              Chuyên ngành
            </label>
            <Select
              className="select-option input-search"
              options={DataMajors ? DataMajors : []}
              placeholder="Chuyên ngành "
            />
          </BoxControl>
        </BoxSearchInput>
      </WrapContent>

      {subject && subject.length > 0 ? (
        <SubjectTable
          data={subject}
          dataMajors={DataMajors ? DataMajors : []}
        />
      ) : (
        <Loading />
      )}
      <GroupAlert />
    </>
  );
};

export default memo(SubjectScreen);
