import React, { memo, useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdAdd } from 'react-icons/io';
import { BsTrash } from 'react-icons/bs';
import { MdModeEdit } from 'react-icons/md';
import { toast } from 'react-toastify';

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
} from 'styles/common/common-styles';
import Loading from 'components/Loading/Loading';
import { Button } from 'components/Button/Button';
import { TablePagination } from 'components/Pagination/Pagination';
import PopupOverlay from 'components/PopupOverlay/PopupOverlay';
import CheckboxSingle from 'components/FormElements/ElementCheckbox/CheckboxSingle';

import GroupAlert from 'components/AlertMessage/AlertMessage';
import ActionMajors from './../components/ActionMajors/ActionMajors';
import RemoveMajors from './../components/RemoveMajors/RemoveMajors';
import { initForm } from './../helpers/majors.helpers';
import { getMajors, removeMajors } from './../redux/majors.slice';
import { useSortableData } from 'helpers/sortingTable/sortingTable';
import { defaultPaginationParams } from 'constants/api.constants';
import NotFound from 'components/NotFound/NotFound';

const MajorsScreen = () => {
  const dispatch = useDispatch();
  const [isDialogActionMajor, setIsDialogActionMajor] = useState(false);
  const [itemMajors, setItemMajors] = useState(initForm);
  const [isDialogDeleteMajor, setIsDialogDeleteMajor] = useState(false);
  const [listChecked, setListChecked] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: defaultPaginationParams.page,
    pageLength: defaultPaginationParams.pageLength,
  });

  const fetchData = useCallback(() => {
    dispatch(getMajors(pagination));
  }, [dispatch, pagination]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const { listMajors, isMajorsLoading, total, userLogin } = useSelector(
    (state) => ({
      listMajors: state.majors?.listMajors,
      isMajorsLoading: state.majors?.isMajorsLoading,
      total: state.majors?.total,
      userLogin: state.auth?.userLogin,
    })
  );

  const headerCells = [
    { label: '#', fieldSort: 'id', sort: true },
    { label: 'Tên Chuyên Ngành', fieldSort: 'name', sort: true },
    ...(userLogin?.superAdmin || userLogin?.ministry
      ? [{ label: 'Thao tác', sort: false, align: 'right' }]
      : []),
  ];

  const { dataSort, requestSort } = useSortableData(listMajors);
  const handlePagination = (dataPagination) => {
    setPagination({
      ...pagination,
      ...dataPagination,
    });
  };

  const isCheckedAll = useMemo(() => {
    return listMajors && listMajors.every((i) => listChecked.includes(i.id));
  }, [listMajors, listChecked]);

  const handleCheckedAll = (isChecked) => {
    if (isChecked) {
      setListChecked(
        Array.from(new Set([...listChecked, ...listMajors.map((i) => i.id)]))
      );
    } else {
      setListChecked(
        listChecked.filter((id) => !listMajors.find((i) => i.id === id))
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
      const response = await dispatch(removeMajors(id));
      if (removeMajors.fulfilled.match(response)) {
        toast.success('Xóa thành công !');
      } else {
        toast.error('Xóa thất bại !');
      }
      setIsLoading(false);
      setListChecked([]);
    });
  };

  return (
    <>
      {isMajorsLoading && <Loading />}
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
          <div className="resultSeach">
            {/* {messengerSort && (
              <span>
                Kết quả : &nbsp; {messengerSort} ( {listSubject.length} )
              </span>
            )} */}
          </div>
          {(userLogin?.superAdmin || userLogin?.ministry) && (
            <div className="buttonAction">
              <Button
                disabled={!listChecked.length || isLoading}
                loading={isLoading}
                onClick={handleRemoveAll}
              >
                Xóa tất cả
              </Button>
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
            </div>
          )}
        </HeaderTable>

        {listMajors && listMajors.length > 0 ? (
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
                      onClick={() => requestSort(cell?.fieldSort)}
                    >
                      {cell.label}
                    </Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {dataSort.map((item) => (
                  <Tr key={item?.id}>
                    <Td>
                      <CheckboxSingle
                        checked={listChecked.includes(item?.id)}
                        onChange={() => handleChangeChecked(item?.id)}
                      />
                    </Td>
                    <Td>{item?.id}</Td>
                    <Td>{item?.name}</Td>
                    {(userLogin?.superAdmin || userLogin?.ministry) && (
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
