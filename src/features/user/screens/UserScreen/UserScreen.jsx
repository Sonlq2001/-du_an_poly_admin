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
} from 'styles/common/common-styles';
import GroupAlert from 'components/AlertMessage/AlertMessage';

import HightLightText from 'components/HightLightText/HightLightText';
import { TablePagination } from 'components/Pagination/Pagination';
import { Button } from 'components/Button/Button';
import Loading from 'components/Loading/Loading';
import PopupOverlay from 'components/PopupOverlay/PopupOverlay';
import { useSortableData } from 'helpers/sortingTable/sortingTable';

import { getUsers } from './../../redux/user.slice';
import { USER_PATHS } from './../../constants/user.paths';
import avatarEmpty from 'assets/images/empty-avatar.png';
import ActionUser from 'features/user/components/ActionUser/ActionUser';
import { GroupRole } from './UserScreen.styles';
import { defaultPaginationParams } from 'constants/api.constants';
import RemoveUser from './../../components/RemoveUser/RemoveUser';
import NotFound from 'components/NotFound/NotFound';

const UserScreen = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [isOpenDeleteUser, setIsOpenDeleteUser] = useState(false);
  const [itemUser, setItemUser] = useState(null);
  const [pagination, setPagination] = useState({
    page: defaultPaginationParams?.page,
    pageLength: defaultPaginationParams?.pageLength,
  });

  useEffect(() => {
    dispatch(getUsers(pagination));
  }, [dispatch, pagination]);

  const { isListUserLoading, listUser, total, userLogin } = useSelector(
    (state) => ({
      isListUserLoading: state.user?.isListUserLoading,
      listUser: state.user?.listUser,
      total: state.user?.total,
      userLogin: state.auth?.userLogin,
    })
  );

  const filterUser = listUser.filter((user) => user.id !== userLogin?.id);

  const addUser = () => {
    setOpen(true);
  };

  const { dataSort, requestSort } = useSortableData(filterUser ?? []);
  const handlePagination = (dataPagination) => {
    setPagination({
      ...pagination,
      ...dataPagination,
    });
  };

  return (
    <>
      {isListUserLoading && <Loading />}
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
          <div className="resultSeach">
            {/* {messengerSort && (
              <span>
                Kết quả : &nbsp; {messengerSort} ( {listSubject.length} )
              </span>
            )} */}
          </div>
          <div className="buttonAction">
            <Button color="primary">Tải file excel</Button>

            <Button
              color="primary"
              icon={<IoMdAdd />}
              onClick={() => addUser()}
            >
              Thêm
            </Button>
          </div>
        </HeaderTable>

        {listUser && listUser.length > 0 ? (
          <TableCustom>
            <Thead>
              <Tr>
                <Th sort onClick={() => requestSort('id')}>
                  STT
                </Th>
                <Th sort onClick={() => requestSort('name')}>
                  Tên
                </Th>
                <Th>Ảnh</Th>
                <Th sort onClick={() => requestSort('email')}>
                  Email
                </Th>
                <Th sort onClick={() => requestSort('student_code')}>
                  MSSV
                </Th>
                <Th>Vai trò</Th>
                <Th align="right">Thao tác</Th>
              </Tr>
            </Thead>

            <Tbody>
              {dataSort.map((row) => (
                <Tr key={row?.id}>
                  <Td>{row?.id}</Td>
                  <Td>{row?.name}</Td>
                  <Td>
                    <img
                      src={row?.avatar || avatarEmpty}
                      width="50px"
                      height="50px"
                      alt=""
                    />
                  </Td>
                  <Td>{row?.email}</Td>
                  <Td>{row?.student_code || '-'}</Td>
                  <Td>
                    <GroupRole>
                      {row?.roles &&
                        row.roles.map((item) => (
                          <div className="item-role">
                            <HightLightText value={item?.name}>
                              {item?.name}
                            </HightLightText>
                          </div>
                        ))}
                    </GroupRole>
                  </Td>
                  <Td>
                    <BoxActionTable>
                      <Button
                        color="warning"
                        to={USER_PATHS.USER_PROFILE.replace(/:id/, row?.id)}
                        icon={<MdModeEdit />}
                        size="small"
                      />

                      <Button
                        color="danger"
                        size="small"
                        icon={<BsTrash />}
                        onClick={() =>
                          setIsOpenDeleteUser(true) + setItemUser(row)
                        }
                      />
                    </BoxActionTable>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </TableCustom>
        ) : (
          <NotFound />
        )}
        <GroupPagination>
          <TablePagination
            pageLengthMenu={defaultPaginationParams.pageLengthMenu}
            page={pagination.page}
            pageLength={pagination.pageLength}
            totalRecords={total}
            onPageChange={handlePagination}
          />
        </GroupPagination>

        {/* Model add user */}
        <PopupOverlay open={open} setOpen={setOpen} title="Thêm Tài Khoản ">
          <ActionUser setOpen={setOpen} />
        </PopupOverlay>

        {/* Model delete user */}
        <RemoveUser
          item={itemUser}
          open={isOpenDeleteUser}
          setOpen={setIsOpenDeleteUser}
        />
      </WrapContent>
      <GroupAlert />
    </>
  );
};

export default memo(UserScreen);
