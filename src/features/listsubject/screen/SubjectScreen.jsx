import React, { memo, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchData } from './../redux/subject.slice';
import { MdModeEdit } from 'react-icons/md';
import { BsTrash } from 'react-icons/bs';
import { IoMdAdd } from 'react-icons/io';
import { WrapContent } from '../../../styles/common/common-styles';
import { Button } from './../../../components/Button/Button';
import {
  GroupPagination,
  TitleTable,
  WapButton,
  TableHeader,
} from './SubjectScreen.styles';
import {
  TableCustom,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from './../../../components/Table/TableCustom';
import { TablePagination } from './../../../components/Pagination/Pagination';
import SubjectControlTable from './../components/subjectControlTable/SubjectControlTable';

import { useSelector } from 'react-redux';
const SubjectScreenList = () => {
  const dispatch = useDispatch();
  const [pagination, setPagination] = useState({
    page: 1,
    pageLength: 20,
    totalRecords: 100,
  });
  const handleChangePage = (values) => {
    setPagination({ ...pagination, ...values });
  };
  const subject = useSelector((state) => state.subject.data);
  console.log(subject);
  useEffect(() => {
    dispatch(fetchData());
  }, []);
  return (
    <WrapContent>
      <TableHeader>
        <TitleTable> Danh sách môn học </TitleTable>
        <Button icon={<IoMdAdd />} color="primary" />
      </TableHeader>
      <SubjectControlTable />

      <TableCustom>
        <Thead>
          <Tr>
            <Th sort={false}> STT </Th>
            <Th> Tên Môn </Th>
            <Th> Mã Môn </Th>
            <Th> Chuyên Ngành</Th>
            <Th> Giảng viên </Th>
            <Th sort={false}> Action </Th>
          </Tr>
        </Thead>
        <Tbody>
          {subject.length > 0
            ? subject.map((item, index) => (
                <Tr key={index}>
                  <Td>{index + 1}</Td>
                  <Td>{item.name}</Td>
                  <Td>{item.code}</Td>
                  <Td>{item.major_id}</Td>
                  <Td>Giảng viên </Td>
                  <Td>
                    <WapButton>
                      <Button color="warning" icon={<MdModeEdit />}></Button>
                      <Button color="danger" icon={<BsTrash />}></Button>
                    </WapButton>{' '}
                  </Td>
                </Tr>
              ))
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

export default memo(SubjectScreenList);
