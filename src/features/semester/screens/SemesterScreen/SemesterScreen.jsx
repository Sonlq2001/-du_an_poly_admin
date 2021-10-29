import React, { memo, useEffect, useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { BsTrash } from 'react-icons/bs';
import { MdModeEdit } from 'react-icons/md';

import {
  TableCustom,
  Thead,
  Th,
  Tr,
  Td,
  Tbody,
} from 'components/Table/TableCustom';

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
} from 'styles/common/common-styles';

import { Button } from 'components/Button/Button';
import { TablePagination } from 'components/Pagination/Pagination';
import Loading from 'components/Loading/Loading';
import PopupOverlay from 'components/PopupOverlay/PopupOverlay';
import GroupAlert from 'components/AlertMessage/AlertMessage';

import { getSemester } from './../../redux/semester.slice';
import EmptyResultImage from 'assets/images/empty-result.gif';
import { initForm } from './../../helpers/semester.helpers';
import ActionSemester from './../../components/ActionSemester/ActionSemester';
import RemoveSemester from './../../components/RemoveSemester/RemoveSemester';

const SemesterScreen = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [itemSemester, setItemSemester] = useState(initForm);
  const [isDialogSemester, setIsDialogSemester] = useState(false);
  const [isDialogSemesterRemove, setIsDialogSemesterRemove] = useState(false);

  useEffect(() => {
    dispatch(getSemester())
      .then(unwrapResult)
      .finally(() => setIsLoading(true));
  }, [dispatch]);

  const { listSemester } = useSelector((state) => state.semester);

  if (!isLoading) {
    return <Loading />;
  }

  return (
    <>
      <TitleMain>Kỳ học</TitleMain>
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

      <WrapContent>
        <HeaderTable>
          <Button
            icon={<IoMdAdd />}
            color="primary"
            onClick={() => {
              setIsDialogSemester(true);
              setItemSemester(initForm);
            }}
          >
            Thêm
          </Button>
        </HeaderTable>

        {listSemester && listSemester.length > 0 ? (
          <>
            <TableCustom>
              <Thead>
                <Tr>
                  <Th sort={false}>STT</Th>
                  <Th>Kỳ học</Th>
                  <Th sort={false} align="right">
                    Thao tác
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {listSemester.map((row, index) => (
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
                            setItemSemester(row);
                            setIsDialogSemester(true);
                          }}
                        />
                        <Button
                          color="danger"
                          size="small"
                          icon={<BsTrash />}
                          onClick={() => {
                            setItemSemester(row);
                            setIsDialogSemesterRemove(true);
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

        {/* Dialog create / edit product type */}
        <PopupOverlay
          open={isDialogSemester}
          setOpen={setIsDialogSemester}
          title={itemSemester?.id ? 'Sửa Danh Mục' : 'Thêm Danh Mục '}
        >
          <ActionSemester item={itemSemester} setOpen={setIsDialogSemester} />
        </PopupOverlay>

        {/* overlay remove */}
        <RemoveSemester
          item={itemSemester}
          open={isDialogSemesterRemove}
          setOpen={setIsDialogSemesterRemove}
        />
      </WrapContent>
      <GroupAlert />
    </>
  );
};

export default memo(SemesterScreen);
