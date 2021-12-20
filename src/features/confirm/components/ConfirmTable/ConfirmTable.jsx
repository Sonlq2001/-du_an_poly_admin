import React, { memo, useState } from 'react';
import { FiCheck } from 'react-icons/fi';
import { AiOutlineEye } from 'react-icons/ai';
import { RiDeleteBinFill } from 'react-icons/ri';
import { MdModeEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { BiExit, BiDotsVerticalRounded } from 'react-icons/bi';
import OutsideClickHandler from 'react-outside-click-handler';
import { toast } from 'react-toastify';
import _get from 'lodash.get';

import { WrapContent, GroupPagination } from 'styles/common/common-styles';
import {
  TableCustom,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from 'components/Table/TableCustom';
import { TablePagination } from 'components/Pagination/Pagination';
import {
  GroupAction,
  BoxMain,
  ListAction,
  GroupStudent,
} from './ConfirmTable.styles';
import PopupOverlay from 'components/PopupOverlay/PopupOverlay';
import ReviewProduct from './../Review/ReviewProduct';
import RemoveProduct from './../RemoveProduct/RemoveProduct';
import { useDispatch, useSelector } from 'react-redux';
import {
  postProductApprove,
  putProductChairmanApproved,
} from '../../redux/product.slice';
import GroupAlert from 'components/AlertMessage/AlertMessage';
import Refuse from '../ActionProduct/refuse/Refuse';
import { useSortableData } from 'helpers/sortingTable/sortingTable';
import NotFound from 'components/NotFound/NotFound';
import Loading from 'components/Loading/Loading';
import HightLightText from 'components/HightLightText/HightLightText';
import {
  labelStatusProduct,
  valueStatusProduct,
} from 'constants/app.constants';

const ConfirmTable = ({ result, setPagination, pagination }) => {
  const dispatch = useDispatch();
  const { userLogin, listProductUser, isListProductUser, listSemester } =
    useSelector((state) => ({
      userLogin: state.auth?.userLogin,
      listProductUser: state.product?.listProductUser,
      isListProductUser: state.product?.isListProductUser,
      listSemester: state.semester?.listSemester,
    }));

  const [open, setOpen] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);
  const [itemRemove, setItemRemove] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [refuse, setRefuse] = useState(null);
  const [itemRefuse, setItemRefuse] = useState(false);
  const [isShowAction, setIsShowAction] = useState(null);
  const [disableButton, setDisableButton] = useState(false);
  const [product, setProduct] = useState({
    id: '',
    name: '',
    subject: '',
    description: '',
  });

  const handlePagination = (dataPagination) => {
    setPagination({
      ...pagination,
      ...dataPagination,
    });
  };

  const handleReviewProduct = (item) => {
    setProduct(item);
    setOpen(!open);
  };

  const handleRemoveProduct = (item) => {
    setOpenRemove(true);
    setItemRemove(item);
    setIsShowAction(null);
  };

  const handleConfirm = async (item) => {
    setIsLoading(true);
    setDisableButton(true);

    const actionDispatch =
      item?.status === 1 ? postProductApprove : putProductChairmanApproved;
    const response = await dispatch(
      actionDispatch({
        id: item?.id,
        status: item?.status + 1,
        message: null,
      })
    );
    if (actionDispatch.fulfilled.match(response)) {
      toast.success('Chấp nhận thành công !');
    } else {
      toast.error(_get(response.payload, 'status[0]'));
    }
    setIsShowAction(null);
    setIsLoading(false);
    setDisableButton(false);
  };

  const handleRefuse = (item) => {
    setRefuse(item);
    setItemRefuse(true);
  };
  // sort
  const { dataSort, requestSort } = useSortableData(listProductUser ?? []);
  return (
    <WrapContent>
      {isListProductUser && <Loading />}
      <BoxMain>
        {result === 2 && (
          <div className="messengers">
            Kết quả tìm kiếm :{/* {listProduct ? listProduct.length : '0'} */}
          </div>
        )}

        {listProductUser && listProductUser.length > 0 ? (
          <>
            <TableCustom className="table-confirm">
              <Thead>
                <Tr>
                  <Th sort onClick={() => requestSort('id')}>
                    #
                  </Th>
                  <Th sort onClick={() => requestSort('name')}>
                    Tên đề tài
                  </Th>
                  <Th sort onClick={() => requestSort('class')}>
                    Lớp
                  </Th>
                  <Th sort onClick={() => requestSort('subject_id')}>
                    Môn
                  </Th>
                  <Th sort onClick={() => requestSort('semester_id')}>
                    Kỳ học
                  </Th>
                  <Th>Thành viên</Th>
                  <Th>Chuyên ngành</Th>
                  <Th>Cơ sở</Th>
                  <Th>Trạng thái</Th>
                  <Th align="right">Thao tác</Th>
                </Tr>
              </Thead>
              <Tbody>
                {dataSort.map((row) => {
                  let statusProduct = null;
                  switch (row?.status) {
                    case valueStatusProduct.one:
                      statusProduct = labelStatusProduct.confirm1;
                      break;
                    case valueStatusProduct.two:
                      statusProduct = labelStatusProduct.confirm2;
                      break;
                    case valueStatusProduct.three:
                      statusProduct = labelStatusProduct.done;
                      break;
                    default:
                      break;
                  }

                  let nameCampus = null;
                  switch (row?.campus_id) {
                    case 1:
                      nameCampus = 'Hà Nội';
                      break;
                    case 2:
                      nameCampus = 'Đà nẵng';
                      break;
                    case 3:
                      nameCampus = 'Cần Thơ';
                      break;
                    case 4:
                      nameCampus = 'Hồ Chí Minh';
                      break;
                    case 5:
                      nameCampus = 'Tây Nguyên';
                      break;
                    default:
                      break;
                  }

                  const isConfirm1 =
                    row?.status === 1 &&
                    row?.teacher_id === userLogin?.id &&
                    userLogin?.teacher &&
                    userLogin?.major_id === row?.major?.id &&
                    userLogin?.campus_id === row?.campus_id;

                  const isConfirm2 =
                    row?.status === 2 &&
                    row?.master_user === userLogin?.id &&
                    userLogin?.facultyChairman &&
                    userLogin?.major_id === row?.major?.id &&
                    userLogin?.campus_id === row?.campus_id;

                  const isEdit =
                    (userLogin?.id === row?.teacher_id ||
                      userLogin?.id === row?.master_user) &&
                    (userLogin?.facultyChairman || userLogin?.teacher) &&
                    userLogin?.major_id === row?.major?.id &&
                    row?.status !== 3 &&
                    userLogin?.campus_id === row?.campus_id;

                  const isRefuse =
                    (userLogin?.id === row?.teacher_id ||
                      userLogin?.id === row?.master_user) &&
                    (userLogin?.teacher || userLogin?.facultyChairman) &&
                    userLogin?.major_id === row?.major?.id &&
                    (row?.status === 1 || row?.status === 2) &&
                    userLogin?.campus_id === row?.campus_id;

                  const isDeleted =
                    (userLogin?.id === row?.teacher_id ||
                      userLogin?.id === row?.master_user) &&
                    (userLogin?.teacher || userLogin?.facultyChairman) &&
                    userLogin?.major_id === row?.major?.id &&
                    userLogin?.campus_id === row?.campus_id;

                  return (
                    <Tr key={row?.id}>
                      <Td> {row?.id}</Td>
                      <Td>{row?.name} </Td>
                      <Td>{row?.class} </Td>
                      <Td>{row?.subject?.name} </Td>
                      <Td>
                        {
                          listSemester?.find(
                            (item) => item?.id === row?.semester_id
                          )?.name
                        }
                      </Td>
                      <Td>
                        <GroupStudent>
                          {row?.students?.map((element, index) => {
                            return (
                              <div key={index}>
                                {element?.name} - {element?.student_code},
                              </div>
                            );
                          })}
                        </GroupStudent>
                      </Td>
                      <Td>{row?.major?.name}</Td>
                      <Td>
                        <span className="nowrap">{nameCampus}</span>
                      </Td>
                      <Td>
                        <HightLightText status={row?.status}>
                          {statusProduct}
                        </HightLightText>
                      </Td>
                      <Td>
                        <GroupAction>
                          <span
                            className="show-action"
                            onClick={() => setIsShowAction(row?.id)}
                          >
                            <BiDotsVerticalRounded />
                          </span>

                          {row?.id === isShowAction && (
                            <OutsideClickHandler
                              onOutsideClick={() => setIsShowAction(null)}
                            >
                              <ListAction>
                                {isConfirm1 && (
                                  <button
                                    disabled={disableButton}
                                    className="item-action"
                                    onClick={() => handleConfirm(row)}
                                  >
                                    {isLoading ? (
                                      <span className="loader" />
                                    ) : (
                                      <span className="icon-action">
                                        <FiCheck />
                                      </span>
                                    )}
                                    Chấp nhận lần 1
                                  </button>
                                )}

                                {isConfirm2 && (
                                  <button
                                    className="item-action"
                                    disabled={disableButton}
                                    onClick={() => handleConfirm(row)}
                                  >
                                    {isLoading ? (
                                      <span className="loader"></span>
                                    ) : (
                                      <span className="icon-action">
                                        <FiCheck />
                                      </span>
                                    )}
                                    Chấp nhận lần 2
                                  </button>
                                )}

                                <div
                                  className="item-action"
                                  onClick={() => {
                                    handleReviewProduct(row);
                                    setOpen(true);
                                    setIsShowAction(null);
                                  }}
                                >
                                  <span className="icon-action">
                                    <AiOutlineEye />
                                  </span>
                                  Xem trước
                                </div>

                                {isEdit && (
                                  <div className="item-action">
                                    <span className="icon-action">
                                      <MdModeEdit />
                                    </span>
                                    <Link to={`/product/update/${row.id}`}>
                                      Sửa
                                    </Link>
                                  </div>
                                )}

                                {isRefuse && (
                                  <button
                                    disabled={disableButton}
                                    className="item-action "
                                    onClick={() =>
                                      handleRefuse(row) +
                                      setDisableButton(true) +
                                      setIsShowAction(null)
                                    }
                                  >
                                    <span className="icon-action">
                                      <BiExit />
                                    </span>
                                    Từ chối
                                  </button>
                                )}

                                {isDeleted && (
                                  <div
                                    className="item-action"
                                    onClick={() => handleRemoveProduct(row)}
                                  >
                                    <span className="icon-action">
                                      <RiDeleteBinFill />
                                    </span>
                                    Xóa
                                  </div>
                                )}
                              </ListAction>
                            </OutsideClickHandler>
                          )}
                        </GroupAction>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </TableCustom>
            <GroupPagination>
              <TablePagination
                pageLengthMenu={[10, 20, 50, 100]}
                page={pagination.page}
                pageLength={pagination.pageLength}
                totalRecords={100}
                onPageChange={handlePagination}
              />
            </GroupPagination>
          </>
        ) : (
          <NotFound />
        )}
      </BoxMain>

      {/* chi tiết sản phẩm  */}
      <PopupOverlay
        open={open}
        setOpen={setOpen}
        size="xl"
        title="Chi Tiết Sản Phẩm "
        scroll
        setDisableButton={setDisableButton}
      >
        <ReviewProduct data={product} setOpen={setOpen} />
      </PopupOverlay>

      {/* xóa sản phẩm  */}
      <RemoveProduct
        open={openRemove}
        setOpen={setOpenRemove}
        item={itemRemove}
      />
      {/* từ trối sản phẩm  */}
      <PopupOverlay
        open={itemRefuse}
        setOpen={setItemRefuse}
        size="md"
        title="Lý do"
        setDisableButton={setDisableButton}
      >
        <Refuse
          item={refuse}
          setItemRefuse={setItemRefuse}
          setDisableButton={setDisableButton}
        />
      </PopupOverlay>

      <GroupAlert />
    </WrapContent>
  );
};

export default memo(ConfirmTable);
