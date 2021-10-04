import React, { memo, useState } from 'react';
import { MdModeEdit } from 'react-icons/md';
import { BsTrash } from 'react-icons/bs';
import { IoMdAdd } from 'react-icons/io';

import { WrapContent } from './../../../styles/common/common-styles';
import { TablePagination } from './../../../components/Pagination/Pagination';
import SpecializedControlTable from './../components/specializedControlTable/SpecializedControlTable';
import AddSpecialized from '../components/AddSpecialized/index';
import PopupOverlay from './../../../components/PopupOverlay/PopupOverlay';
import {
  GroupPagination,
  TitleTable,
  BoxActionTable,
  TableHeader,
} from './SpecializedScreen.styles';

import {
  TableCustom,
  Thead,
  Th,
  Tr,
  Td,
  Tbody,
} from '../../../components/Table/TableCustom';
import { Button } from '../../../components/Button/Button';
import { DATA_FAKE } from './../constants/specialized.constants';

const SpecializedScreen = () => {
  const [toggleAdd, setToggleAdd] = useState(false);
  const [Item, setItem] = useState();

  const Update = (item) => {
    setItem(item);
    setToggleAdd(true);
  };
  const AddSpecia = (item) => {
    setItem(item);
    setToggleAdd(!toggleAdd);
  };

  const [pagination, setPagination] = useState({
    page: 1,
    pageLength: 20,
    totalRecords: 100,
  });

  const handleChangePage = (values) => {
    setPagination({ ...pagination, ...values });
  };
  return (
    <WrapContent>
      <TableHeader>
        <TitleTable>Danh sách chuyên ngành</TitleTable>
        <Button onClick={() => AddSpecia(null)} icon={<IoMdAdd />} />
      </TableHeader>
      <SpecializedControlTable />
      <TableCustom>
        <Thead>
          <Tr>
            <Th sort={false}> STT </Th>
            <Th> Tên Chuyên Ngành </Th>
            <Th> Chủ Nhiệm</Th>
            <Th sort={false}> Action </Th>
          </Tr>
        </Thead>
        <Tbody>
          {DATA_FAKE.map((item) => (
            <Tr key={item.id}>
              <Td>{item.id}</Td>
              <Td>{item.name}</Td>
              <Td>{item.teacher}</Td>
              <Td>
                <BoxActionTable>
                  <Button
                    color="warning"
                    icon={<MdModeEdit />}
                    size="small"
                    onClick={() =>
                      Update({
                        id: 1,
                        name: 'thiết kế website',
                        teacher_id: '1',
                      })
                    }
                  />
                  <Button color="danger" size="small" icon={<BsTrash />} />
                </BoxActionTable>
              </Td>
            </Tr>
          ))}
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

      <PopupOverlay
        open={toggleAdd}
        setOpen={setToggleAdd}
        item={Item}
        title={Item ? 'Sửa Chuyên Ngành' : 'Thêm Chuyên Ngành '}
      >
        <AddSpecialized item={Item} />
      </PopupOverlay>
    </WrapContent>
  );
};
export default memo(SpecializedScreen);
