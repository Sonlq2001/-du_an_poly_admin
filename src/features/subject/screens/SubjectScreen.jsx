import React, { memo, useEffect, useState } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { IoMdAdd } from 'react-icons/io';
import { BsTrash } from 'react-icons/bs';
import { MdModeEdit } from 'react-icons/md';

import {
  TableCustom,
  Thead,
  Th,
  Tr,
  Td,
  Tbody,
} from '../../../components/Table/TableCustom';
import {
  WrapContent,
  TitleMain,
  TitleControl,
  BoxControl,
  BoxSearchInput,
  InputSearch,
  HeaderTable,
  EmptyResult,
  BoxActionTable,
  GroupPagination,
} from './../../../styles/common/common-styles';
import { Button } from '../../../components/Button/Button';
import PopupOverlay from '../../../components/PopupOverlay/PopupOverlay';
import { TablePagination } from '../../../components/Pagination/Pagination';

import { getListSubject } from './../redux/subject.slice';

import Loading from './../../../components/Loading/Loading';
import GroupAlert from './../../../components/AlertMessage/AlertMessage';
import EmptyResultImage from './../../../assets/images/empty-result.gif';
import ActionSubject from './../components/ActionSubject/ActionSubject';
import { initForm } from './../helpers/subject.helpers';
import RemoveSubject from './../components/RemoveSubject/RemoveSubject';

const SubjectScreen = () => {
  const dispatch = useDispatch();
  const [isLoadingSubject, setIsLoadingSubject] = useState(false);
  const [isDialogActionSubject, setIsDialogActionSubject] = useState(false);
  const [itemSubject, setItemSubject] = useState(initForm);
  const [isDialogDeleteSubject, setIsDialogDeleteSubject] = useState(false);

  useEffect(() => {
    dispatch(getListSubject())
      .then(unwrapResult)
      .finally(() => setIsLoadingSubject(true));
  }, [dispatch]);

  const { listSubject } = useSelector((state) => state.subject);

  if (!isLoadingSubject) {
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
              options={[]}
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
              setIsDialogActionSubject(true);
              setItemSubject(initForm);
            }}
          >
            Thêm
          </Button>
        </HeaderTable>

        {listSubject && listSubject.length > 0 ? (
          <>
            <TableCustom>
              <Thead>
                <Tr>
                  <Th sort={false}>#</Th>
                  <Th>Tên môn học</Th>
                  <Th>Mã môn</Th>
                  <Th>Chuyên ngành</Th>
                  <Th sort={false} align="right">
                    Thao tác
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {listSubject.map((row, index) => (
                  <Tr key={row.id}>
                    <Td>{index + 1}</Td>
                    <Td>{row.name}</Td>
                    <Td>{row.code}</Td>
                    <Td>{row.major_id}</Td>
                    <Td>
                      <BoxActionTable>
                        <Button
                          color="warning"
                          icon={<MdModeEdit />}
                          size="small"
                          onClick={() => {
                            setIsDialogActionSubject(true);
                            setItemSubject(row);
                          }}
                        />
                        <Button
                          color="danger"
                          size="small"
                          icon={<BsTrash />}
                          onClick={() => {
                            setIsDialogDeleteSubject(true);
                            setItemSubject(row);
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
      </WrapContent>

      {/* overlay edit and add */}
      <PopupOverlay
        open={isDialogActionSubject}
        setOpen={setIsDialogActionSubject}
        // title={itemMajors?.id ? 'Sửa Chuyên Ngành' : 'Thêm Chuyên Ngành '}
      >
        <ActionSubject item={itemSubject} setOpen={setIsDialogActionSubject} />
      </PopupOverlay>

      {/* overlay remove */}
      <RemoveSubject
        item={itemSubject}
        open={isDialogDeleteSubject}
        setOpen={setIsDialogDeleteSubject}
      />

      {/* alert message */}
      <GroupAlert />
    </>
  );
};

export default memo(SubjectScreen);
