import React, { memo, useEffect, useState } from 'react';
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
  BoxActionTable,
  GroupPagination,
  EmptyResult,
} from './../../../styles/common/common-styles';
import { getMajors } from './../redux/majors.slice';
import Loading from './../../../components/Loading/Loading';
import GroupAlert from './../../../components/AlertMessage/AlertMessage';
import { Button } from './../../../components/Button/Button';
import PopupOverlay from '../../../components/PopupOverlay/PopupOverlay';
import ActionMajors from './../components/ActionMajors/ActionMajors';
import { initForm } from './../helpers/majors.helpers';
import { TablePagination } from '../../../components/Pagination/Pagination';
import RemoveMajors from './../components/RemoveMajors/RemoveMajors';
import EmptyResultImage from './../../../assets/images/empty-result.gif';

const MajorsScreen = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogActionMajor, setIsDialogActionMajor] = useState(false);
  const [itemMajors, setItemMajors] = useState(initForm);
  const [isDialogDeleteMajor, setIsDialogDeleteMajor] = useState(false);

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

      <WrapContent>
        <HeaderTable>
          <Button
            icon={<IoMdAdd />}
            color="primary"
            onClick={() => {
              setIsDialogActionMajor(true);
              setItemMajors(initForm);
            }}
          >
            Thêm
          </Button>
        </HeaderTable>

        {listMajors && listMajors.length > 0 ? (
          <>
            <TableCustom>
              <Thead>
                <Tr>
                  <Th sort={false}>STT</Th>
                  <Th>Tên Chuyên Ngành</Th>
                  <Th sort={false} align="right">
                    Thao tác
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {listMajors.map((item, index) => (
                  <Tr key={item.id}>
                    <Td>{index + 1}</Td>
                    <Td>{item.name}</Td>
                    <Td>
                      <BoxActionTable>
                        <Button
                          color="warning"
                          icon={<MdModeEdit />}
                          size="small"
                          onClick={() => {
                            setIsDialogActionMajor(true);
                            setItemMajors(item);
                          }}
                        />
                        <Button
                          color="danger"
                          size="small"
                          icon={<BsTrash />}
                          onClick={() => {
                            setIsDialogDeleteMajor(true);
                            setItemMajors(item);
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
                pageLength={listMajors.length}
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
        open={isDialogActionMajor}
        setOpen={setIsDialogActionMajor}
        title={itemMajors?.id ? 'Sửa Chuyên Ngành' : 'Thêm Chuyên Ngành '}
      >
        <ActionMajors item={itemMajors} setOpen={setIsDialogActionMajor} />
      </PopupOverlay>

      {/* overlay remove */}
      <RemoveMajors
        item={itemMajors}
        open={isDialogDeleteMajor}
        setOpen={setIsDialogDeleteMajor}
      />

      {/* alert message */}
      <GroupAlert />
    </>
  );
};
export default memo(MajorsScreen);
