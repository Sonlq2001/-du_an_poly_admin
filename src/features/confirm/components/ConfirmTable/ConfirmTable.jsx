import React, { memo, useState } from 'react';
import { FiCheck } from 'react-icons/fi';
import { AiOutlineEye } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
import { MdModeEdit } from 'react-icons/md';
import { BiExit } from 'react-icons/bi';

import { WrapContent } from './../../../../styles/common/common-styles';
import {
  TableCustom,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from './../../../../components/Table/TableCustom';

import { Button } from './../../../../components/Button/Button';
import { TablePagination } from './../../../../components/Pagination/Pagination';
import { GroupPagination, GroupAction, BoxMain } from './ConfirmTable.styles';
import PopupOverlay from './../../../../components/PopupOverlay/PopupOverlay';
import ReviewProduct from './../Review/ReviewProduct';
import RemoveProduct from './../RemoveProduct/RemoveProduct';
import ActionProduct from '../ActionProduct/ActionProduct';
import { useDispatch } from 'react-redux';
import { productUpdate, updateProduct } from '../../redux/product.slice';
import Refuse from './../ActionProduct/refuse/Refuse';
const ConfirmTable = ({ data }) => {
  console.log('data', data);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);
  const [ItemUpdate, setItemUpdate] = useState(false);
  const [itemRemove, setItemRemove] = useState(null);
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
    console.log('xác nhận', item);
    dispatch(productUpdate(item.id));
    // dispatch(updateProduct(item));
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
                          item.students.map((element) => {
                            return (
                              <li>
                                {element.name} - {element.student_code}{' '}
                              </li>
                            );
                          })}{' '}
                      </Td>

                      <Td>
                        <GroupAction>
                          {item.status === 0 ? (
                            <Button
                              icon={<FiCheck />}
                              size="small"
                              color="success"
                              onClick={() => handleConfirm(item)}
                            />
                          ) : (
                            <Button
                              icon={<MdModeEdit />}
                              size="small"
                              color="warning"
                              onClick={() => update(item)}
                            />
                          )}
                          <Button
                            icon={<AiOutlineEye />}
                            size="small"
                            color="info"
                            onClick={() => Review(item)}
                          />
                          {item.status === 0 ? (
                            <Button
                              icon={<BiExit />}
                              size="small"
                              color="danger"
                              onClick={() => handleRefuse(item)}
                            />
                          ) : (
                            <Button
                              icon={<BsTrash />}
                              size="small"
                              color="danger"
                              onClick={() => removeProduct(item)}
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
        <Refuse item={refuse} setItemRefuse={setItemRefuse} />
      </PopupOverlay>
    </WrapContent>
  );
};

export default memo(ConfirmTable);
