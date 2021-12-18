import React, { memo, useEffect, useState, useMemo } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
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

import { Button } from 'components/Button/Button';
import { TablePagination } from 'components/Pagination/Pagination';
import Loading from 'components/Loading/Loading';
import PopupOverlay from 'components/PopupOverlay/PopupOverlay';
import GroupAlert from 'components/AlertMessage/AlertMessage';
import CheckboxSingle from 'components/FormElements/ElementCheckbox/CheckboxSingle';

import { getSemester, removeSemester } from './../../redux/semester.slice';
import { initForm } from './../../helpers/semester.helpers';
import ActionSemester from './../../components/ActionSemester/ActionSemester';
import RemoveSemester from './../../components/RemoveSemester/RemoveSemester';
import { useSortableData } from 'helpers/sortingTable/sortingTable';
import { defaultPaginationParams } from 'constants/api.constants';
import NotFound from 'components/NotFound/NotFound';

const SemesterScreen = () => {
  const dispatch = useDispatch();
  const [itemSemester, setItemSemester] = useState(initForm);
  const [isDialogSemester, setIsDialogSemester] = useState(false);
  const [isDialogSemesterRemove, setIsDialogSemesterRemove] = useState(false);
  const [listChecked, setListChecked] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: defaultPaginationParams.page,
    pageLength: defaultPaginationParams.pageLength,
  });

  useEffect(() => {
    dispatch(getSemester(pagination));
  }, [dispatch, pagination]);

  const { listSemester, isListSemesterLoading, total, userLogin } = useSelector(
    (state) => ({
      listSemester: state.semester?.listSemester,
      isListSemesterLoading: state.semester?.isListSemesterLoading,
      total: state.semester?.total,
      userLogin: state.auth?.userLogin,
    })
  );
  const { dataSort, requestSort } = useSortableData(listSemester);

  const isCheckedAll = useMemo(() => {
    return (
      listSemester && listSemester.every((i) => listChecked.includes(i.id))
    );
  }, [listSemester, listChecked]);

  const handleCheckedAll = (isChecked) => {
    if (isChecked) {
      setListChecked(
        Array.from(new Set([...listChecked, ...listSemester.map((i) => i.id)]))
      );
    } else {
      setListChecked(
        listChecked.filter((id) => !listSemester.find((i) => i.id === id))
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
      const response = await dispatch(removeSemester(id));
      if (removeSemester.fulfilled.match(response)) {
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
      {isListSemesterLoading && <Loading />}
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
                onClick={handleRemoveAll}
                loading={isLoading}
              >
                Xóa tất cả
              </Button>
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
            </div>
          )}
        </HeaderTable>

        {listSemester && listSemester.length > 0 ? (
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
                  <Th sort onClick={() => requestSort('id')}>
                    #
                  </Th>
                  <Th sort onClick={() => requestSort('name')}>
                    Kỳ học
                  </Th>
                  {(userLogin?.superAdmin || userLogin?.ministry) && (
                    <Th align="right">Thao tác</Th>
                  )}
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
                    {(userLogin?.superAdmin || userLogin?.ministry) && (
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
