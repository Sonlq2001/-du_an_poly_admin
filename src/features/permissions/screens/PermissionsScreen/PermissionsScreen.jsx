import React,{memo, useEffect, useCallback , useState,useMemo}  from "react"
import { useDispatch, useSelector } from 'react-redux';
import { IoMdAdd } from 'react-icons/io';
import { BsTrash } from 'react-icons/bs';
import { MdModeEdit } from 'react-icons/md';
import  {initForm}  from "features/permissions/helpers/permissions.helpers"
import GroupAlert from 'components/AlertMessage/AlertMessage';
import  ActionPermissions from "features/permissions/components/ActionPermissions/ActionPermissions"
import RemovePermissions  from "features/permissions/components/RemovePermissions/RemovePermissions"
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

import {
  TableCustom,
  Thead,
  Th,
  Tr,
  Td,
  Tbody,
} from 'components/Table/TableCustom';
import { toast } from 'react-toastify';
import Loading from 'components/Loading/Loading';
import { Button } from 'components/Button/Button';
import { TablePagination } from 'components/Pagination/Pagination';
import PopupOverlay from 'components/PopupOverlay/PopupOverlay';
import EmptyResultImage from 'assets/images/empty-result.gif';
import CheckboxSingle from 'components/FormElements/ElementCheckbox/CheckboxSingle';
import { removePermissions , getPermissions } from 'features/permissions/redux/permissions.slice';
const headerCells = [
  { label: 'STT', field: 'id', sort: true },
  { label: 'Tên Chuyên Ngành', field: 'id', sort: true },
  { label: 'Thao tác', field: 'id', sort: false, align: 'right' },
];
const PermissionsScreen= ()=>{
  const dispatch = useDispatch()
  const fetchData = useCallback(()=>{
    dispatch(getPermissions())
  },[dispatch])
  useEffect(()=>{
    fetchData()
  },[dispatch,fetchData])
const {listPermissions,loadingPermissions}  = useSelector((state)=>  state.permisstions)
const [isDialogActionRole,setIsDialogActionRole] = useState(false);
const [isDialogDeleteRole, setIsDialogDeleteRole] = useState(false);
const [listChecked, setListChecked] = useState([])
const [itemRole, setItemRole] = useState(initForm);
const isCheckedAll = useMemo(() => {
  // return listRole.every((i) => listChecked.includes(i.id));
}, [listPermissions, listChecked]);

const handleCheckedAll = (isChecked) => {
  if (isChecked) {
    setListChecked(
      Array.from(new Set([...listChecked, ...listPermissions.map((i) => i.id)]))
    );
  } else {
    setListChecked(
      listChecked.filter((id) => !listPermissions.find((i) => i.id === id))
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
    const response = await dispatch(removePermissions(id));
    if (removePermissions.fulfilled.match(response)) {
      toast.success('Xóa thành công !');
    } else {
      toast.error('Xóa thất bại !');
    }
    setListChecked([]);
  });
};
if(loadingPermissions) {
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

      {listPermissions && listPermissions.length > 0 ? (
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
              {listPermissions.map((item, index) => (
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
              pageLength={listPermissions.length}
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
      open={isDialogActionRole  }
      setOpen={setIsDialogActionRole}
      title={itemRole?.id ? 'Sửa Chuyên Ngành' : 'Thêm Chuyên Ngành '}
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
}
export default memo(PermissionsScreen)