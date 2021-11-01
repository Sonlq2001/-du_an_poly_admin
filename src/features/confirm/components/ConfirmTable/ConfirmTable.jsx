import React, { memo, useState } from 'react';
import { FiCheck } from 'react-icons/fi';
import { AiOutlineEye, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
import { MdModeEdit } from 'react-icons/md';
import { BiExit } from 'react-icons/bi';

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
import { GroupPagination, GroupAction, BoxMain } from './ConfirmTable.styles';
import PopupOverlay from 'components/PopupOverlay/PopupOverlay';
import ReviewProduct from './../Review/ReviewProduct';
import RemoveProduct from './../RemoveProduct/RemoveProduct';
import ActionProduct from '../ActionProduct/ActionProduct';
import { useDispatch, useSelector } from 'react-redux';
import { productUpdate, ApproveProduct } from '../../redux/product.slice';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
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
  const Review = (item) => {
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
  const handleConfirm = (item) => {
    const detail = {
      id: item.id,
      status: item.status + 1,
      message: null,
    };
    setLoadingButton(true);
    setIdLoading(item.id);
    console.log('object', detail);
    dispatch(ApproveProduct(detail))
      .then(unwrapResult)
      .then(
        () =>
          toast.success('Phê duyệt thành công !') +
          setLoadingButton(false) +
          setIdLoading(item.id)
      )
      .catch((error) => toast.error('Thất Bại '))
      .finally(() => setOpen(false));
    // dispatch(productUpdate(detail));
  };
  const handleRefuse = (item) => {
    setRefuse(item);
    setItemRefuse(true);
  };
  console.log('loadingButton', loadingButton);
  return (
    <WrapContent>
      <BoxMain>
        <TableCustom className="table-confirm">
          <Thead>
            <Tr>
              <Th sort={false}>STT</Th>
              <Th>Tên đề tài </Th>
              <Th>Lớp</Th>
              <Th>Môn </Th>
              <Th className="fix-th">Kỳ học </Th>
              <Th>Thành viên </Th>
              <Th sort={false}>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data
              ? data.map((item, index) => {
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
                          {item.status === 2 ? (
                            <Button
                              icon={<MdModeEdit />}
                              size="small"
                              color="warning"
                              onClick={() => update(item)}
                              // cập nhật
                            />
                          ) : (
                            <Button
                              icon={<FiCheck />}
                              loading={loadingButton && idLoading === item.id}
                              size="small"
                              color="success"
                              onClick={() => handleConfirm(item)}
                              // phê duyệt
                              disabled={
                                item.status === 1 &&
                                useLogin.id &&
                                useLogin.id === item.teacher_id &&
                                item.teacher_id
                              }
                            />
                          )}
                          <Button
                            icon={<AiOutlineEye />}
                            size="small"
                            color="info"
                            onClick={() => Review(item)}
                            // review
                          />
                          {item.status === 2 ? (
                            <Button
                              icon={<BsTrash />}
                              size="small"
                              color="danger"
                              onClick={() => removeProduct(item)}

                              // xóa
                            />
                          ) : (
                            <Button
                              icon={<BiExit />}
                              loading={
                                loadingButtonRemove &&
                                idLoadingRemove === item.id
                              }
                              size="small"
                              color="danger"
                              onClick={() => handleRefuse(item)}
                              // disabled={
                              //   item.status === 1 &&
                              //   useLogin.id &&
                              //   useLogin.id === item.teacher_id
                              // }
                              // từ trối
                            />
                          )}
                        </GroupAction>
                      </Td>
                    </Tr>
                  );
                })
              : ''}
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
