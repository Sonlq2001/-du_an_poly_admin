import React, { memo, useEffect, useCallback, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdAdd } from 'react-icons/io';
import { BsTrash } from 'react-icons/bs';
import { MdModeEdit } from 'react-icons/md';
import { toast } from 'react-toastify';
import { initForm } from 'features/permissions/helpers/permissions.helpers';
import GroupAlert from 'components/AlertMessage/AlertMessage';
import ActionPermissions from 'features/permissions/components/ActionPermissions/ActionPermissions';
import RemovePermissions from 'features/permissions/components/RemovePermissions/RemovePermissions';
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
} from 'styles/common/common-styles';

import {
  TableCustom,
  Thead,
  Th,
  Tr,
  Td,
  Tbody,
} from 'components/Table/TableCustom';
import Loading from 'components/Loading/Loading';
import { Button } from 'components/Button/Button';
import { TablePagination } from 'components/Pagination/Pagination';
import PopupOverlay from 'components/PopupOverlay/PopupOverlay';
import CheckboxSingle from 'components/FormElements/ElementCheckbox/CheckboxSingle';
import {
  removePermissions,
  getPermissions,
} from 'features/permissions/redux/permissions.slice';
import { defaultPaginationParams } from 'constants/api.constants';
import { useSortableData } from 'helpers/sortingTable/sortingTable';
import NotFound from 'components/NotFound/NotFound';

const PermissionsScreen = () => {
  const dispatch = useDispatch();
  const [isDialogActionRole, setIsDialogActionRole] = useState(false);
  const [isDialogDeleteRole, setIsDialogDeleteRole] = useState(false);
  const [listChecked, setListChecked] = useState([]);
  const [itemRole, setItemRole] = useState(initForm);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: defaultPaginationParams.page,
    pageLength: defaultPaginationParams.pageLength,
  });

  const fetchData = useCallback(() => {
    dispatch(getPermissions(pagination));
  }, [dispatch, pagination]);

  useEffect(() => {
    fetchData();
  }, [dispatch, fetchData]);

  const { listPermission, isListPermissionLoading, total, userLogin } =
    useSelector((state) => ({
      listPermission: state.permission?.listPermission,
      isListPermissionLoading: state.permission?.isListPermissionLoading,
      total: state.permission?.total,
      userLogin: state.auth?.userLogin,
    }));

  const headerCells = [
    { label: '#', field: 'id', sort: true },
    { label: 'Tên quyền', field: 'name', sort: true },
    { label: 'Đường dẫn', sort: true },
    ...(userLogin?.superAdmin
      ? [{ label: 'Thao tác', sort: false, align: 'right' }]
      : []),
  ];

  const { dataSort, requestSort } = useSortableData(listPermission);

  const isCheckedAll = useMemo(() => {
    return (
      listPermission && listPermission.every((i) => listChecked.includes(i.id))
    );
  }, [listPermission, listChecked]);

  const handleCheckedAll = (isChecked) => {
    if (isChecked) {
      setListChecked(
        Array.from(
          new Set([...listChecked, ...listPermission.map((i) => i.id)])
        )
      );
    } else {
      setListChecked(
        listChecked.filter((id) => !listPermission.find((i) => i.id === id))
      );
    }
  };

  const handleChangeChecked = (itemId) => {
    if (listChecked.includes(itemId)) {
      setListChecked(listChecked.filter((id) => id !== itemId));
    } else {
      setListChecked([...listChecked, itemId]);
    }
  };

  const handleRemoveAll = () => {
    listChecked.forEach(async (id) => {
      setIsLoading(true);
      const response = await dispatch(removePermissions(id));
      if (removePermissions.fulfilled.match(response)) {
        toast.success('Xóa thành công !');
      } else {
        toast.error('Xóa thất bại !');
      }
      setIsLoading(false);
      setListChecked([]);
    });
  };

  const handlePagination = (dataPagination) => {
    setPagination({
      ...pagination,
      ...dataPagination,
    });
  };

  return (
    <>
      {isListPermissionLoading && <Loading />}
      <TitleMain>Quyền sử dụng</TitleMain>
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
          <div className="resultSeach">
            {/* {messengerSort && (
              <span>
                Kết quả : &nbsp; {messengerSort} ( {listSubject.length} )
              </span>
            )} */}
          </div>
          {userLogin?.superAdmin && (
            <div className="buttonAction">
              <Button
                disabled={!listChecked.length || isLoading}
                onClick={handleRemoveAll}
                loading={isLoading}
              >
                Xóa tất cả
              </Button>
              <Button
                icon={<IoMdAdd />}
                color="primary"
                onClick={() => {
                  setIsDialogActionRole(true);
                  setItemRole(initForm);
                }}
              >
                Thêm
              </Button>
            </div>
          )}
        </HeaderTable>

        {listPermission && listPermission.length > 0 ? (
          <>
            <TableCustom>
              <Thead>
                <Tr>
                  <Th>
                    <CheckboxSingle
                      checked={isCheckedAll}
                      onChange={(e) => handleCheckedAll(e.target.checked)}
                    />
                  </Th>
                  {headerCells.map((cell) => (
                    <Th
                      key={cell.label}
                      sort={cell.sort}
                      align={cell.align}
                      onClick={() => requestSort(cell?.field)}
                    >
                      {cell.label}
                    </Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {dataSort.map((row) => (
                  <Tr key={row?.id}>
                    <Td>
                      <CheckboxSingle
                        checked={listChecked.includes(row?.id)}
                        onChange={() => handleChangeChecked(row?.id)}
                      />
                    </Td>
                    <Td>{row?.id}</Td>
                    <Td>{row?.name}</Td>
                    <Td>{row?.view_permission[0]?.url ?? '-'}</Td>
                    {userLogin?.superAdmin && (
                      <Td>
                        <BoxActionTable>
                          <Button
                            color="warning"
                            icon={<MdModeEdit />}
                            size="small"
                            onClick={() => {
                              setIsDialogActionRole(true);
                              setItemRole(row);
                            }}
                          />
                          <Button
                            color="danger"
                            size="small"
                            icon={<BsTrash />}
                            onClick={() => {
                              setIsDialogDeleteRole(true);
                              setItemRole(row);
                            }}
                          />
                        </BoxActionTable>
                      </Td>
                    )}
                  </Tr>
                ))}
              </Tbody>
            </TableCustom>
            <GroupPagination>
              <TablePagination
                pageLengthMenu={defaultPaginationParams.pageLengthMenu}
                page={pagination.page}
                pageLength={pagination.pageLength}
                totalRecords={total}
                onPageChange={handlePagination}
              />
            </GroupPagination>
          </>
        ) : (
          <NotFound />
        )}
      </WrapContent>

      {/* overlay edit and add */}
      <PopupOverlay
        open={isDialogActionRole}
        setOpen={setIsDialogActionRole}
        title={itemRole?.id ? 'Sửa Quyền' : 'Thêm Quyền'}
        size="md"
      >
        <ActionPermissions item={itemRole} setOpen={setIsDialogActionRole} />
      </PopupOverlay>

      {/* overlay remove */}
      <RemovePermissions
        item={itemRole}
        open={isDialogDeleteRole}
        setOpen={setIsDialogDeleteRole}
      />

      {/* alert message */}
      <GroupAlert />
    </>
  );
};
export default memo(PermissionsScreen);
