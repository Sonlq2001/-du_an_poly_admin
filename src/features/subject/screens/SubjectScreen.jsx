import React, { memo, useEffect } from 'react';
import Select from 'react-select';
import SubjectTable from '../components/subjectTable/SubjectTable';
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
// gọi api
const SubjectScreen = () => {
  const dispatch = useDispatch();
  const subject = useSelector((state) => state.subject.data);
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
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
              options={[
                { label: 'Thiết kế web', value: 1 },
                { label: 'Thiết kế đồ họa ', value: 2 },
                { label: 'Du lịch - khách sạn - nhà hàng ', value: 3 },
              ]}
              placeholder="Chuyên ngành "
            />
          </BoxControl>
        </BoxSearchInput>
      </WrapContent>
      <SubjectTable data={subject} />
    </>
  );
};

export default memo(SubjectScreen);
