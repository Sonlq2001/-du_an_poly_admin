import React, { memo, useState } from 'react';
import { FiCheck } from 'react-icons/fi';
import { AiOutlineEye } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
import { MdModeEdit } from 'react-icons/md';

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
const ConfirmTable = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);
  const [ItemUpdate, setItemUpdate] = useState(false);
  const [itemRemove, setItemRemove] = useState(null);
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
                      <Td>{item.subject.name} </Td>
                      <Td> </Td>
                      <Td> </Td>
                      <Td>
                        <GroupAction>
                          {item.status === 1 ? (
                            <Button
                              icon={<FiCheck />}
                              size="small"
                              color="success"
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
                          <Button
                            icon={<BsTrash />}
                            size="small"
                            color="danger"
                            onClick={() => removeProduct(item)}
                          />
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
    </WrapContent>
  );
};

export default memo(ConfirmTable);
