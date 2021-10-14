import React, { useState } from 'react';
import { WrapContent } from '../../../styles/common/common-styles';
import { MdModeEdit } from 'react-icons/md';
import { BsTrash } from 'react-icons/bs';
import { GroupPagination, TitleTable, WapButton } from './ProductScreen.styles';
import { Button } from './../../../components/Button/Button';
import { TablePagination } from './../../../components/Pagination/Pagination';
import ProductControlTable from './../components/ProductControlTable/ProductControlTable';
import {
  TableCustom,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from './../../../components/Table/TableCustom';
import { useSelector } from 'react-redux';
const ProductScreen = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    pageLength: 20,
    totalRecords: 100,
  });

  const handleChangePage = (values) => {
    setPagination({ ...pagination, ...values });
  };
  const product = useSelector((state) => state.product.product);

  const ChangeSearch = (e) => {
    console.log('tìm kiếm ', e.target.value);
  };
  const ChangeTeacher = (e) => {
    console.log('filter teacher', e.value);
  };
  return (
    <WrapContent>
      <TitleTable> Danh sách sản phẩm </TitleTable>
      <ProductControlTable
        ChangeSearch={ChangeSearch}
        ChangeTeacher={ChangeTeacher}
      />
      <TableCustom>
        <Thead>
          <Tr>
            <Th sort={false}> STT </Th>
            <Th> Tên đề tài </Th>
            <Th> Môn </Th>
            <Th> Lớp </Th>
            <Th> Giảng viên </Th>
            <Th sort={false}> Nhóm </Th>
            <Th sort={false}> Action </Th>
          </Tr>
        </Thead>
        <Tbody>
          {product
            ? product.map((item, index) => {
                return (
                  <Tr key={index}>
                    <Td> {index + 1}</Td>
                    <Td>{item.name} </Td>
                    <Td>{item.name} </Td>
                    <Td>{item.class} </Td>
                    <Td>
                      <WapButton>
                        <Button color="warning" icon={<MdModeEdit />}></Button>
                        <Button color="danger" icon={<BsTrash />}></Button>
                      </WapButton>
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
    </WrapContent>
  );
};

export default ProductScreen;
