import React, { memo, useEffect, useCallback, useState, useMemo } from 'react';
import { BsTrash } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { toast } from 'react-toastify';

import {
  WrapContent,
  TitleMain,
  TitleControl,
  BoxControl,
  BoxSearchInput,
  InputSearch,
  BoxActionTable,
  GroupPagination,
  HeaderTable,
} from 'styles/common/common-styles';
import {
  TableCustom,
  Thead,
  Th,
  Tr,
  Td,
  Tbody,
} from 'components/Table/TableCustom';
import CheckboxSingle from 'components/FormElements/ElementCheckbox/CheckboxSingle';
import { TablePagination } from 'components/Pagination/Pagination';
import { Button } from 'components/Button/Button';
import Loading from 'components/Loading/Loading';
import { useSortableData } from 'helpers/sortingTable/sortingTable';
import NotFound from 'components/NotFound/NotFound';
import GroupAlert from 'components/AlertMessage/AlertMessage';

import { getFeedback, deleteFeedback } from './../../redux/feedback.slice';
import { defaultPaginationParams } from 'constants/api.constants';
import RemoveFeedback from './../../components/RemoveFeedback/RemoveFeedback';

const FeedbackScreen = () => {
  const dispatch = useDispatch();
  const [currentIdFeedback, setCurrentIdFeedback] = useState(null);
  const [isDialogFeedback, setIsDialogFeedback] = useState(false);
  const [listChecked, setListChecked] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: defaultPaginationParams.page,
    pageLength: defaultPaginationParams.pageLength,
  });
  const getData = useCallback(() => {
    dispatch(getFeedback(pagination));
  }, [dispatch, pagination]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handlePagination = (dataPagination) => {
    setPagination({
      ...pagination,
      ...dataPagination,
    });
  };

  const { listFeedback, isListFeedbackLoading, total, userLogin } = useSelector(
    (state) => ({
      listFeedback: state.feedback?.listFeedback,
      isListFeedbackLoading: state.feedback?.isListFeedbackLoading,
      total: state.feedback?.total,
      userLogin: state.auth?.userLogin,
    })
  );

  const { dataSort, requestSort } = useSortableData(listFeedback ?? []);

  const isCheckedAll = useMemo(() => {
    return (
      listFeedback && listFeedback.every((i) => listChecked.includes(i.id))
    );
  }, [listFeedback, listChecked]);

  const handleCheckedAll = (isChecked) => {
    if (isChecked) {
      setListChecked(
        Array.from(new Set([...listChecked, ...listFeedback.map((i) => i.id)]))
      );
    } else {
      setListChecked(
        listChecked.filter((id) => !listFeedback.find((i) => i.id === id))
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
      const response = await dispatch(deleteFeedback(id));
      if (deleteFeedback.fulfilled.match(response)) {
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
      {isListFeedbackLoading && <Loading />}
      <TitleMain>Phản hồi</TitleMain>
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
            </div>
          )}
        </HeaderTable>

        {listFeedback && listFeedback.length > 0 ? (
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
                  <Th sort onClick={() => requestSort('email')}>
                    Email
                  </Th>
                  <Th sort onClick={() => requestSort('content')}>
                    Nội dung
                  </Th>
                  <Th sort onClick={() => requestSort('created_at')}>
                    Thời gian
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
                        checked={listChecked.includes(row.id)}
                        onChange={() => handleChangeChecked(row.id)}
                      />
                    </Td>
                    <Td>{row?.id}</Td>
                    <Td>{row?.email}</Td>
                    <Td>{row?.content}</Td>
                    <Td>
                      {moment(row?.created_at).format('YYYY-MM-DD HH:mm:ss')}
                    </Td>

                    {(userLogin?.superAdmin || userLogin?.ministry) && (
                      <Td>
                        <BoxActionTable>
                          <Button
                            color="danger"
                            size="small"
                            icon={<BsTrash />}
                            onClick={() =>
                              setCurrentIdFeedback(row?.id) +
                              setIsDialogFeedback(true)
                            }
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

      {/* overlay remove */}
      <RemoveFeedback
        item={currentIdFeedback}
        open={isDialogFeedback}
        setOpen={setIsDialogFeedback}
      />

      <GroupAlert />
    </>
  );
};

export default memo(FeedbackScreen);
