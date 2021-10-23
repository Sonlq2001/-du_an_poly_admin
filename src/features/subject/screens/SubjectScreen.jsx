import React, { memo, useEffect, useState } from 'react';
import Select from 'react-select';
import { IoMdAdd } from 'react-icons/io';
import { MdModeEdit } from 'react-icons/md';
import { BsTrash } from 'react-icons/bs';
import {
  WrapContent,
  TitleMain,
  TitleControl,
  BoxControl,
  BoxSearchInput,
  InputSearch,
  HeaderTable,
  BoxActionTable,
  GroupPagination,
  EmptyResult,
} from './../../../styles/common/common-styles';
import { Button } from './../../../components/Button/Button';
import { TablePagination } from './../../../components/Pagination/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { getListSubject } from './../redux/subject.slice';
import { getMajors } from './../../majors/redux/majors.slice';
import { unwrapResult } from '@reduxjs/toolkit';
import Loading from './../../../components/Loading/Loading';
import GroupAlert from './../../../components/AlertMessage/AlertMessage';
import EmptyResultImage from './../../../assets/images/empty-result.gif';
import PopupOverlay from './../../../components/PopupOverlay/PopupOverlay';
import {
  TableCustom,
  Thead,
  Th,
  Tr,
  Td,
  Tbody,
} from './../../../components/Table/TableCustom';
import { initForm } from './../helpers/subject.helpers';
import ActionSubject from '../components/ActionSubject/ActionSubject';
import RemoveSubject from '../components/RemoveSubject/RemoveSubject';
// gọi api
const SubjectScreen = () => {
  const dispatch = useDispatch();
  const subject = useSelector((state) => state.subject);
  const { listMajors } = useSelector((state) => state.majors);
  const [isLoading, setIsLoading] = useState(false);
  const [itemSubject, setItemSubject] = useState(initForm);
  const [isDialogSubject, setIsDialogSubject] = useState(false);
  const [isDialogSubjectRemove, setIsDialogSubjectRemove] = useState(false);
  useEffect(() => {
    dispatch(getMajors());
    dispatch(getListSubject())
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
      <WrapContent>
        <HeaderTable>
          <Button
            icon={<IoMdAdd />}
            color="primary"
            onClick={() => {
              setIsDialogSubject(true);
              setItemSubject(initForm);
            }}
          >
            Thêm
          </Button>
        </HeaderTable>
        {subject.listSubject && subject.listSubject.length > 0 ? (
          <>
            <TableCustom>
              <Thead>
                <Tr>
                  <Th sort={false}>STT</Th>
                  <Th>Tên Danh Mục</Th>
                  <Th sort={false} align="right">
                    Thao tác
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {subject.listSubject.map((row, index) => (
                  <Tr key={row.id}>
                    <Td>{index + 1}</Td>
                    <Td>{row.name}</Td>
                    <Td>
                      <BoxActionTable>
                        <Button
                          color="warning"
                          icon={<MdModeEdit />}
                          size="small"
                          onClick={() => {
                            setItemSubject(row);
                            setIsDialogSubject(true);
                          }}
                        />
                        <Button
                          color="danger"
                          size="small"
                          icon={<BsTrash />}
                          onClick={() => {
                            setItemSubject(row);
                            setIsDialogSubjectRemove(true);
                          }}
                        />
                      </BoxActionTable>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </TableCustom>
            <GroupPagination>
              <TablePagination
                pageLengthMenu={[20, 50, 100]}
                page={1}
                pageLength={10}
                totalRecords={100}
                onPageChange={() => null}
              />
            </GroupPagination>
          </>
        ) : (
          <EmptyResult>
            <div>Không có kết quả nào</div>
            <img src={EmptyResultImage} alt="" />
          </EmptyResult>
        )}
        <PopupOverlay
          open={isDialogSubject}
          setOpen={setIsDialogSubject}
          title={itemSubject?.id ? 'Sửa Môn Học' : 'Thêm Môn Học '}
        >
          <ActionSubject item={itemSubject} setOpen={setIsDialogSubject} />
        </PopupOverlay>
        <RemoveSubject
          item={itemSubject}
          open={isDialogSubjectRemove}
          setOpen={setIsDialogSubjectRemove}
        />
      </WrapContent>
      <GroupAlert />
    </>
  );
};

export default memo(SubjectScreen);
