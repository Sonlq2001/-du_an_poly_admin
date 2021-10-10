import React, { memo, useState } from 'react';
import { FiCheck } from 'react-icons/fi';
import { AiOutlineEye } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';

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
const ConfirmTable = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState({});
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
                          <Button
                            icon={<FiCheck />}
                            size="small"
                            color="success"
                          />
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
      <PopupOverlay
        open={open}
        setOpen={setOpen}
        size="xxl"
        title="Chi Tiết Sản Phẩm "
        scroll={true}
      >
        <ReviewProduct data={product} />
      </PopupOverlay>
      {/* <ReviewProduct data={product} show={open} setShow={setOpen} /> */}
    </WrapContent>
  );
};

export default memo(ConfirmTable);
