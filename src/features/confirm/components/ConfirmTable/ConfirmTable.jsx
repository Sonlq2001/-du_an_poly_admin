import React, { memo, useState } from 'react';
import { FiCheck } from 'react-icons/fi';
import { AiOutlineEye, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
import { MdModeEdit } from 'react-icons/md';
import { BiExit, BiDotsVerticalRounded } from 'react-icons/bi';
import OutsideClickHandler from 'react-outside-click-handler';
import { toast } from 'react-toastify';
import _get from 'lodash.get';

import { WrapContent } from 'styles/common/common-styles';
import {
  TableCustom,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from 'components/Table/TableCustom';

import { Button } from 'components/Button/Button';
import { TablePagination } from 'components/Pagination/Pagination';
import {
  GroupPagination,
  GroupAction,
  BoxMain,
  ListAction,
} from './ConfirmTable.styles';
import PopupOverlay from 'components/PopupOverlay/PopupOverlay';
import ReviewProduct from './../Review/ReviewProduct';
import RemoveProduct from './../RemoveProduct/RemoveProduct';
import ActionProduct from '../ActionProduct/ActionProduct';
import { useDispatch, useSelector } from 'react-redux';
import { productUpdate, approveProduct } from '../../redux/product.slice';
import GroupAlert from './../../../../components/AlertMessage/AlertMessage';
import Refuse from '../ActionProduct/refuse/Refuse';

const ConfirmTable = ({ data }) => {
  // teacher_id
  // useLogin.id id đăng nhập
  const dispatch = useDispatch();
  const { useLogin, accessToken } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);
  const [ItemUpdate, setItemUpdate] = useState(false);
  const [itemRemove, setItemRemove] = useState(null);
  const [loadingButton, setLoadingButton] = useState(false);
  const [idLoading, setIdLoading] = useState(null);
  const [loadingButtonRemove, setLoadingButtonRemove] = useState(null);
  const [idLoadingRemove, setIdLoadingRemove] = useState(null);

  const [refuse, setRefuse] = useState(null);
  const [itemRefuse, setItemRefuse] = useState(false);
  const [isShowAction, setIsShowAction] = useState(null);
  const [product, setProduct] = useState({
    id: '',
    name: '',
    subject: '',
    description: '',
  });

  const [updateProduct, setUpdateProd] = useState({
    id: '',
    name: '',
    subject: '',
    description: '',
  });
  const [pagination, setPagination] = useState({
    page: 1,
    pageLength: 20,
    totalRecords: 100,
  });

  const handleChangePage = (values) => {
    setPagination({ ...pagination, ...values });
  };
  const review = (item) => {
    setProduct(item);
    setOpen(!open);
  };
  const removeProduct = (item) => {
    setOpenRemove(true);
    setItemRemove(item);
  };
  const update = (item) => {
    setUpdateProd(item);
    setItemUpdate(true);
  };

  const handleConfirm = async (item) => {
    const productUpdateStatus = {
      id: item.id,
      status: 1,
      message: null,
    };
    const response = await dispatch(approveProduct(productUpdateStatus));
    if (approveProduct.fulfilled.match(response)) {
      toast.success('Chấp nhận thành công !');
    } else {
      toast.error(_get(response.payload, 'name[0]'));
    }
  };

  const handleRefuse = (item) => {
    setRefuse(item);
    setItemRefuse(true);
  };
  return (
    <WrapContent>
      <BoxMain>
        <TableCustom className="table-confirm">
          <Thead>
            <Tr>
              <Th sort>STT</Th>
              <Th sort>Tên đề tài</Th>
              <Th sort>Lớp</Th>
              <Th sort>Môn</Th>
              <Th className="fix-th" sort>
                Kỳ học
              </Th>
              <Th sort>Thành viên</Th>
              <Th align="right">Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item, index) => {
              return (
                <Tr key={index}>
                  <Td> {index + 1}</Td>
                  <Td>{item.name} </Td>
                  <Td>{item.class} </Td>
                  <Td>{item.subject && item.subject.name} </Td>
                  <Td> </Td>
                  <Td>
                    {item.students &&
                      item.students.map((element, i) => {
                        return (
                          <li key={i}>
                            {element.name} - {element.student_code}
                          </li>
                        );
                      })}
                  </Td>
                  <Td>
                    <GroupAction>
                      <span
                        className="show-action"
                        onClick={() => setIsShowAction(item.id)}
                      >
                        <BiDotsVerticalRounded />
                      </span>

                      {item.id === isShowAction && (
                        <OutsideClickHandler
                          onOutsideClick={() => setIsShowAction(null)}
                        >
                          <ListAction>
                            <div
                              className={`item-action ${
                                item.status === 1 ? 'disabled' : ''
                              }`}
                              onClick={() => handleConfirm(item)}
                            >
                              <span className="icon-action">
                                <FiCheck />
                              </span>
                              Chấp nhận
                            </div>
                            <div
                              className="item-action"
                              onClick={() => {
                                review(item);
                                setOpen(true);
                              }}
                            >
                              <span className="icon-action">
                                <AiOutlineEye />
                              </span>
                              Xem trước
                            </div>
                            <div className="item-action">
                              <span className="icon-action">
                                <MdModeEdit />
                              </span>
                              Sửa
                            </div>
                            <div className="item-action">
                              <span className="icon-action">
                                <BiExit />
                              </span>
                              Từ chối
                            </div>
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
            pageLengthMenu={[20, 50, 100]}
            page={pagination.page}
            pageLength={pagination.pageLength}
            totalRecords={pagination.totalRecords}
            onPageChange={handleChangePage}
          />
        </GroupPagination>
      </BoxMain>
      {/* chi tiết sản phẩm  */}
      <PopupOverlay
        open={open}
        setOpen={setOpen}
        size="xl"
        title="Chi Tiết Sản Phẩm "
        scroll
      >
        <ReviewProduct data={product} />
      </PopupOverlay>
      {/* xóa sản phẩm  */}
      <RemoveProduct
        open={openRemove}
        setOpen={setOpenRemove}
        item={itemRemove}
      />
      {/* cập nhật sản phẩm  */}
      <PopupOverlay
        open={ItemUpdate}
        setOpen={setItemUpdate}
        size="xl"
        title="Cập nhật  sản phẩm  "
        scroll
      >
        <ActionProduct data={updateProduct} setOpen={setItemUpdate} />
      </PopupOverlay>
      {/* từ trối sản phẩm  */}
      <PopupOverlay
        open={itemRefuse}
        setOpen={setItemRefuse}
        size="md"
        title="Lý do "
      >
        <Refuse
          item={refuse}
          setItemRefuse={setItemRefuse}
          setLoadingButtonRemove={setLoadingButtonRemove}
          setIdLoadingRemove={setIdLoadingRemove}
        />
      </PopupOverlay>
      <GroupAlert />
    </WrapContent>
  );
};

export default memo(ConfirmTable);
