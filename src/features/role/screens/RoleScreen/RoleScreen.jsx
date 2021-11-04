import React, { memo, useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import Loading from 'components/Loading/Loading';
import { Button } from 'components/Button/Button';
import { TablePagination } from 'components/Pagination/Pagination';
import PopupOverlay from 'components/PopupOverlay/PopupOverlay';
import CheckboxSingle from 'components/FormElements/ElementCheckbox/CheckboxSingle';

import GroupAlert from 'components/AlertMessage/AlertMessage';
import ActionRole from 'features/role/components/ActionRole/ActionRole';
import RemoveRole from 'features/role/components/RemoveRole/RemoveRole';

import { initForm } from 'features/role/helpers/role.helpers';

import { getRole } from 'features/role/redux/role.slice';
import { removeRoles } from 'features/role/redux/role.slice';
import EmptyResultImage from 'assets/images/empty-result.gif';
import { toast } from 'react-toastify';

const headerCells = [
  { label: 'STT', field: 'id', sort: true },
  { label: 'Tên Chuyên Ngành', field: 'id', sort: true },
  { label: 'Thao tác', field: 'id', sort: false, align: 'right' },
];

const RoleScreen = () => {
  const dispatch = useDispatch();
  const [isDialogActionRole, setIsDialogActionRole] = useState(false);
  const [itemRole, setItemRole] = useState(initForm);
  const [isDialogDeleteRole, setIsDialogDeleteRole] = useState(false);
  const [listChecked, setListChecked] = useState([]);
  const fetchData = useCallback(() => {
    dispatch(getRole());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getRole());
  }, [dispatch]);
  const { listRole, isRoleLoading } = useSelector((state) => state.role);
  const isCheckedAll = useMemo(() => {
    return listRole && listRole.every((i) => listChecked.includes(i.id));
  }, [listRole, listChecked]);

  const handleCheckedAll = (isChecked) => {
    if (isChecked) {
      setListChecked(
        Array.from(new Set([...listChecked, ...listRole.map((i) => i.id)]))
      );
    } else {
      setListChecked(
        listChecked.filter((id) => !listRole.find((i) => i.id === id))
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
      const response = await dispatch(removeRoles(id));
      if (removeRoles.fulfilled.match(response)) {
        toast.success('Xóa thành công !');
      } else {
        toast.error('Xóa thất bại !');
      }
      setListChecked([]);
    });
  };

  if (isRoleLoading) {
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
          <Button disabled={!listChecked.length} onClick={handleRemoveAll}>
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
        </HeaderTable>

        {listRole && listRole.length > 0 ? (
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
                    <Th key={cell.label} sort={cell.sort} align={cell.align}>
                      {cell.label}
                    </Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {listRole.map((item, index) => (
                  <Tr key={item.id}>
                    <Td>
                      <CheckboxSingle
                        checked={listChecked.includes(item.id)}
                        onChange={() => handleChangeChecked(item.id)}
                      />
                    </Td>
                    <Td>{index + 1}</Td>
                    <Td>{item.name}</Td>
                    <Td>
                      <BoxActionTable>
                        <Button
                          color="warning"
                          icon={<MdModeEdit />}
                          size="small"
                          onClick={() => {
                            setIsDialogActionRole(true);
                            setItemRole(item);
                          }}
                        />
                        <Button
                          color="danger"
                          size="small"
                          icon={<BsTrash />}
                          onClick={() => {
                            setIsDialogDeleteRole(true);
                            setItemRole(item);
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
                pageLength={listRole.length}
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
        open={isDialogActionRole}
        setOpen={setIsDialogActionRole}
        title={itemRole?.id ? 'Sửa Chuyên Ngành' : 'Thêm Chuyên Ngành '}
      >
        <ActionRole item={itemRole} setOpen={setIsDialogActionRole} />
      </PopupOverlay>

      {/* overlay remove */}
      <RemoveRole
        item={itemRole}
        open={isDialogDeleteRole}
        setOpen={setIsDialogDeleteRole}
      />

      {/* alert message */}
      <GroupAlert />
    </>
  );
};
export default memo(RoleScreen);
