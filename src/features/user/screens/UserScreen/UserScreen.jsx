import React, { memo, useEffect, useState } from 'react';
import Select from 'react-select';
import { MdModeEdit } from 'react-icons/md';
import { BsTrash } from 'react-icons/bs';
import { IoMdAdd } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';

import {
  TableCustom,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from 'components/Table/TableCustom';
import {
  WrapContent,
  TitleMain,
  TitleControl,
  BoxControl,
  BoxSearchInput,
  InputSearch,
  GroupPagination,
  BoxActionTable,
  HeaderTable,
  EmptyResult,
} from 'styles/common/common-styles';
import HightLightText from 'components/HightLightText/HightLightText';
import { TablePagination } from 'components/Pagination/Pagination';
import { Button } from 'components/Button/Button';
import Loading from 'components/Loading/Loading';
import PopupOverlay from 'components/PopupOverlay/PopupOverlay';

import { getUsers } from './../../redux/user.slice';
import EmptyResultImage from 'assets/images/empty-result.gif';
import { USER_PATHS } from './../../constants/user.paths';
import avatarEmpty from 'assets/images/empty-avatar.png';
import Adduser from 'features/user/components/action/AddUser';

const UserScreen = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const { isListUserLoading, listUser } = useSelector((state) => ({
    isListUserLoading: state.user.isListUserLoading,
    listUser: state.user.listUser,
  }));
  const addUser = () => {
    setOpen(true);
  };

  if (isListUserLoading) {
    return <Loading />;
  }

  return (
    <>
      <TitleMain>User</TitleMain>
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

      <WrapContent>
        <HeaderTable>
          <Button color="primary">Tải file excel</Button>

          <Button color="primary" icon={<IoMdAdd />} onClick={() => addUser()}>
            Thêm
          </Button>
        </HeaderTable>

        {listUser && listUser.length > 0 ? (
          <TableCustom>
            <Thead>
              <Tr>
                <Th sort>STT</Th>
                <Th sort>Tên</Th>
                <Th sort>Ảnh</Th>
                <Th sort>Email</Th>
                <Th sort>MSSV</Th>
                <Th sort>Vai trò</Th>
                <Th align="right">Thao tác</Th>
              </Tr>
            </Thead>

            <Tbody>
              {listUser.map((row, index) => {
                return (
                  <Tr key={row.id}>
                    <Td>{index + 1}</Td>
                    <Td>{row.name}</Td>
                    <Td>
                      <img
                        src={row?.avatar || avatarEmpty}
                        width="50px"
                        height="50px"
                        alt=""
                      />
                    </Td>
                    <Td>{row.email}</Td>
                    <Td>{row?.student_code || '-'}</Td>
                    <Td>
                      {row?.roles.map((item) => (
                        <HightLightText key={item.id}>
                          {item.name}
                        </HightLightText>
                      ))}
                    </Td>
                    <Td>
                      <BoxActionTable>
                        <Button
                          color="warning"
                          to={USER_PATHS.USER_PROFILE.replace(/:id/, row.id)}
                          icon={<MdModeEdit />}
                          size="small"
                        />

                        <Button
                          color="danger"
                          disabled={true}
                          size="small"
                          icon={<BsTrash />}
                        />
                      </BoxActionTable>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </TableCustom>
        ) : (
          <EmptyResult>
            <div>Không có kết quả nào</div>
            <img src={EmptyResultImage} alt="" />
          </EmptyResult>
        )}
        <PopupOverlay open={open} setOpen={setOpen} title="Thêm Tài Khoản ">
          <Adduser setOpen={setOpen} />
        </PopupOverlay>
        <GroupPagination>
          <TablePagination
            pageLengthMenu={[20, 50, 100]}
            page={10}
            pageLength={100}
            totalRecords={10}
            onPageChange={() => null}
          />
        </GroupPagination>
      </WrapContent>
    </>
  );
};

export default memo(UserScreen);
