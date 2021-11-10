import React, { memo, useState } from 'react';
import { FiCheck } from 'react-icons/fi';
import { AiOutlineEye } from 'react-icons/ai';
import { RiDeleteBinFill } from 'react-icons/ri';
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
import { approveProduct, productUpdate } from '../../redux/product.slice';
import GroupAlert from './../../../../components/AlertMessage/AlertMessage';
import Refuse from '../ActionProduct/refuse/Refuse';

const ConfirmTable = ({ data, listProductType }) => {
  const HandleSort = (name) => {
    dispatch(productUpdate(name));
  };

  const dispatch = useDispatch();
  const { useLogin } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);
  const [ItemUpdate, setItemUpdate] = useState(false);
  const [itemRemove, setItemRemove] = useState(null);
  const [groupStudents, setGroupStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
    const email = item.students.map((item) => {
      return item.email;
    });
    setGroupStudents(email);
  };

  const handleConfirm = async (item) => {
    setIsLoading(true);
    const productUpdateStatus = {
      id: item.id,
      status: item.status + 1,
      message: null,
    };
    const response = await dispatch(approveProduct(productUpdateStatus));
    if (approveProduct.fulfilled.match(response)) {
      toast.success('Chấp nhận thành công !');
    } else {
      toast.error(_get(response.payload, 'name[0]'));
    }
    setIsLoading(false);
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
              <Th sort onClick={() => HandleSort('id')}>
                STT
              </Th>
              <Th sort onClick={() => HandleSort('name')}>
                Tên đề tài
              </Th>
              <Th sort onClick={() => HandleSort('class')}>
                Lớp
              </Th>
              <Th sort onClick={() => HandleSort('subject')}>
                Môn
              </Th>
              <Th className="fix-th" sort>
                Kỳ học
              </Th>
              <Th sort onClick={() => HandleSort('students')}>
                Thành viên
              </Th>
              <Th align="right">Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item, index) => {
              return (
                <Tr key={index}>
                  <Td> {item.id}</Td>
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
                            {/* chấp nhận  */}
                            {item.status === 3 ? (
                              ''
                            ) : (
                              <div
                                // className={`item-action`}
                                className={`item-action ${
                                  item.status === 2 ? 'disabled' : ''
                                }`}
                                disabled={
                                  item.status === 2 &&
                                  useLogin.id === item.teacher.id
                                }
                                onClick={() => handleConfirm(item)}
                              >
                                {isLoading ? (
                                  <span className="loader"></span>
                                ) : (
                                  <span className="icon-action">
                                    <FiCheck />
                                  </span>
                                )}
                                {item.status === 1 && '  Chấp nhận lần 1 '}
                                {item.status === 2 && '  Chấp nhận lần 2 '}
                              </div>
                            )}
                            {/* xem trươcs */}
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
                            {/* cập nhật  */}
                            <div
                              className="item-action"
                              onClick={() => update(item)}
                            >
                              <span className="icon-action">
                                <MdModeEdit />
                              </span>
                              Sửa
                            </div>
                            {/* từ trối */}
                            <div
                              className="item-action"
                              onClick={() => handleRefuse(item)}
                            >
                              <span className="icon-action">
                                <BiExit />
                              </span>
                              Từ chối
                            </div>
                            {/* xóa  */}
                            <div
                              className="item-action"
                              onClick={() => removeProduct(item)}
                            >
                              <span className="icon-action">
                                <RiDeleteBinFill />
                              </span>
                              Xóa
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
        <ReviewProduct data={product} setOpen={setOpen} />
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
        <ActionProduct
          data={updateProduct && updateProduct}
          setOpen={setItemUpdate}
          groupStudents={groupStudents}
          setGroupStudents={setGroupStudents}
          listProductType={listProductType}
        />
      </PopupOverlay>

      {/* từ trối sản phẩm  */}
      <PopupOverlay
        open={itemRefuse}
        setOpen={setItemRefuse}
        size="md"
        title="Lý do ?"
      >
        <Refuse item={refuse} setItemRefuse={setItemRefuse} />
      </PopupOverlay>

      <GroupAlert />
    </WrapContent>
  );
};

export default memo(ConfirmTable);
