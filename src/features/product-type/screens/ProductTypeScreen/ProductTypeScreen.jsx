import React, { memo, useEffect, useState, useMemo, useCallback } from 'react';
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

import {
  getProductType,
  deleteProductType,
} from './../../redux/product-type.slice';
import { initForm } from './../../helpers/product-type.helpers';
import ActionProductType from './../../components/ActionProductType/ActionProductType';
import RemoveProductType from './../../components/RemoveProductType/RemoveProductType';
import { useSortableData } from 'helpers/sortingTable/sortingTable';
import { defaultPaginationParams } from 'constants/api.constants';
import NotFound from 'components/NotFound/NotFound';

const ProductTypeScreen = () => {
  const dispatch = useDispatch();
  const [itemProductType, setItemProductType] = useState(initForm);
  const [isDialogProductType, setIsDialogProductType] = useState(false);
  const [isDialogProductTypeRemove, setIsDialogProductTypeRemove] =
    useState(false);
  const [listChecked, setListChecked] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: defaultPaginationParams.page,
    pageLength: defaultPaginationParams.pageLength,
  });

  const fetchData = useCallback(() => {
    dispatch(getProductType(pagination));
  }, [dispatch, pagination]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePagination = (dataPagination) => {
    setPagination({
      ...pagination,
      ...dataPagination,
    });
  };

  const { listProductType, isListProductTypeLoading, total, userLogin } =
    useSelector((state) => ({
      listProductType: state.productType?.listProductType,
      isListProductTypeLoading: state.productType?.isListProductTypeLoading,
      total: state.productType?.total,
      userLogin: state.auth?.userLogin,
    }));
  const { dataSort, requestSort } = useSortableData(
    listProductType ? listProductType : []
  );

  const isCheckedAll = useMemo(() => {
    return (
      listProductType &&
      listProductType.every((i) => listChecked.includes(i.id))
    );
  }, [listProductType, listChecked]);

  const handleCheckedAll = (isChecked) => {
    if (isChecked) {
      setListChecked(
        Array.from(
          new Set([...listChecked, ...listProductType.map((i) => i.id)])
        )
      );
    } else {
      setListChecked(
        listChecked.filter((id) => !listProductType.find((i) => i.id === id))
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
      const response = await dispatch(deleteProductType(id));
      if (deleteProductType.fulfilled.match(response)) {
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
      {isListProductTypeLoading && <Loading />}
      <TitleMain>Danh mục</TitleMain>
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
                  setIsDialogProductType(true);
                  setItemProductType(initForm);
                }}
              >
                Thêm
              </Button>
            </div>
          )}
        </HeaderTable>

        {listProductType && listProductType.length > 0 ? (
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
                    Tên Danh Mục
                  </Th>
                  {(userLogin?.superAdmin || userLogin?.ministry) && (
                    <Th align="right">Thao tác</Th>
                  )}
                </Tr>
              </Thead>
              <Tbody>
                {dataSort.map((row) => (
                  <Tr key={row.id}>
                    <Td>
                      <CheckboxSingle
                        checked={listChecked.includes(row.id)}
                        onChange={() => handleChangeChecked(row.id)}
                      />
                    </Td>
                    <Td>{row.id}</Td>
                    <Td>{row.name}</Td>
                    {(userLogin?.superAdmin || userLogin?.ministry) && (
                      <Td>
                        <BoxActionTable>
                          <Button
                            color="warning"
                            icon={<MdModeEdit />}
                            size="small"
                            onClick={() => {
                              setItemProductType(row);
                              setIsDialogProductType(true);
                            }}
                          />
                          <Button
                            color="danger"
                            size="small"
                            icon={<BsTrash />}
                            onClick={() => {
                              setItemProductType(row);
                              setIsDialogProductTypeRemove(true);
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
          open={isDialogProductType}
          setOpen={setIsDialogProductType}
          title={itemProductType?.id ? 'Sửa Danh Mục' : 'Thêm Danh Mục '}
        >
          <ActionProductType
            item={itemProductType}
            setOpen={setIsDialogProductType}
          />
        </PopupOverlay>

        {/* overlay remove */}
        <RemoveProductType
          item={itemProductType}
          open={isDialogProductTypeRemove}
          setOpen={setIsDialogProductTypeRemove}
        />
      </WrapContent>
      <GroupAlert />
    </>
  );
};

export default memo(ProductTypeScreen);
