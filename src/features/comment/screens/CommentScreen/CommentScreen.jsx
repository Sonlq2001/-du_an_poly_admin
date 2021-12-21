import React, { memo, useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsTrash } from 'react-icons/bs';
import { toast } from 'react-toastify';
import moment from 'moment';

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
import CheckboxSingle from 'components/FormElements/ElementCheckbox/CheckboxSingle';
import { useSortableData } from 'helpers/sortingTable/sortingTable';
import NotFound from 'components/NotFound/NotFound';
import GroupAlert from 'components/AlertMessage/AlertMessage';

import RemoveComment from './../../components/RemoveComment/RemoveComment';
import { getComment, deleteComment } from './../../redux/comment.slice';
import { defaultPaginationParams } from 'constants/api.constants';

const CommentScreen = () => {
  const dispatch = useDispatch();
  const [currentIdComment, setCurrentIdComment] = useState(null);
  const [isDialogDeleteMajor, setIsDialogDeleteMajor] = useState(false);
  const [listChecked, setListChecked] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: defaultPaginationParams.page,
    pageLength: defaultPaginationParams.pageLength,
  });

  const fetchData = useCallback(() => {
    dispatch(getComment(pagination));
  }, [dispatch, pagination]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const { listComment, isListCommentLoading, userLogin, total } = useSelector(
    (state) => ({
      listComment: state.comment?.listComment,
      isListCommentLoading: state.comment?.isListCommentLoading,
      total: state.comment?.total,
      userLogin: state.auth?.userLogin,
    })
  );

  const headerCells = [
    { label: '#', fieldSort: 'id', sort: true },
    { label: 'Sản phẩm' },
    { label: 'Người bình luận' },
    { label: 'Nội dung', fieldSort: 'comment', sort: true },
    { label: 'Thời gian', fieldSort: 'created_at', sort: true },
    ...(userLogin?.superAdmin || userLogin?.ministry
      ? [{ label: 'Thao tác', sort: false, align: 'right' }]
      : []),
  ];

  const { dataSort, requestSort } = useSortableData(listComment ?? []);
  const handlePagination = (dataPagination) => {
    setPagination({
      ...pagination,
      ...dataPagination,
    });
  };

  const isCheckedAll = useMemo(() => {
    return listComment && listComment.every((i) => listChecked.includes(i.id));
  }, [listComment, listChecked]);

  const handleCheckedAll = (isChecked) => {
    if (isChecked) {
      setListChecked(
        Array.from(new Set([...listChecked, ...listComment.map((i) => i.id)]))
      );
    } else {
      setListChecked(
        listChecked.filter((id) => !listComment.find((i) => i.id === id))
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
      const response = await dispatch(deleteComment(id));
      if (deleteComment.fulfilled.match(response)) {
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
      {isListCommentLoading && <Loading />}
      <TitleMain>Bình luận</TitleMain>
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
            </div>
          )}
        </HeaderTable>

        {listComment && listComment.length > 0 ? (
          <>
            <TableCustom>
              <Thead>
                <Tr>
                  {(userLogin?.superAdmin || userLogin?.ministry) && (
                    <Th>
                      <CheckboxSingle
                        checked={isCheckedAll}
                        onChange={(e) => handleCheckedAll(e.target.checked)}
                      />
                    </Th>
                  )}
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
                {dataSort.map((row) => {
                  return (
                    <Tr key={row?.id}>
                      {(userLogin?.superAdmin || userLogin?.ministry) && (
                        <Td>
                          <CheckboxSingle
                            checked={listChecked.includes(row?.id)}
                            onChange={() => handleChangeChecked(row?.id)}
                          />
                        </Td>
                      )}
                      <Td>{row?.id}</Td>
                      <Td>{row?.get_info_product?.name}</Td>
                      <Td>{row?.get_info_user?.name}</Td>
                      <Td>{row?.comment}</Td>
                      <Td>
                        {moment(row?.created_at).format('YYYY-MM-DD HH:mm:ss')}
                      </Td>
                      {(userLogin?.ministry || userLogin?.superAdmin) && (
                        <Td>
                          <BoxActionTable>
                            <Button
                              color="danger"
                              size="small"
                              icon={<BsTrash />}
                              onClick={() => {
                                setIsDialogDeleteMajor(true);
                                setCurrentIdComment(row?.id);
                              }}
                            />
                          </BoxActionTable>
                        </Td>
                      )}
                    </Tr>
                  );
                })}
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
      <RemoveComment
        item={currentIdComment}
        open={isDialogDeleteMajor}
        setOpen={setIsDialogDeleteMajor}
      />

      {/* alert message */}
      <GroupAlert />
    </>
  );
};
export default memo(CommentScreen);
