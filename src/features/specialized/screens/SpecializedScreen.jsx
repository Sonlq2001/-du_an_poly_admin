import React, { memo, useState } from 'react';
import { MdModeEdit } from 'react-icons/md';
import { BsTrash } from 'react-icons/bs';
import { IoMdAdd } from 'react-icons/io';

import { WrapContent } from './../../../styles/common/common-styles';
import { TablePagination } from './../../../components/Pagination/Pagination';
import SpecializedControlTable from '../components/SpecializedControlTable/SpecializedControlTable';
import ActionSpecialized from './../components/ActionSpecialized/ActionSpecialized';
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
import { initForm } from './../helpers/specialized.helpers';
import RemoveSpecialized from './../components/RemoveSpecialized/RemoveSpecialized';

const SpecializedScreen = () => {
  const [isDialogAction, setIsDialogAction] = useState(false);
  const [itemSpecialized, setItemSpecialized] = useState(initForm);
  const [isOpenRemove, setIsOpenRemove] = useState(false);
  const [itemRemove, setItemRemove] = useState(null);

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
        <Button
          onClick={() => {
            setIsDialogAction(true);
            setItemSpecialized(initForm);
          }}
          icon={<IoMdAdd />}
          color="primary"
        />
      </TableHeader>
      <SpecializedControlTable />
      <TableCustom>
        <Thead>
          <Tr>
            <Th sort={false}>STT</Th>
            <Th>Tên Chuyên Ngành</Th>
            <Th>Chủ Nhiệm</Th>
            <Th sort={false} align="right">
              Action
            </Th>
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
                    onClick={() => {
                      setIsDialogAction(true);
                      setItemSpecialized(item);
                    }}
                  />
                  <Button
                    color="danger"
                    size="small"
                    icon={<BsTrash />}
                    onClick={() => {
                      setIsOpenRemove(true);
                      setItemRemove(item);
                    }}
                  />
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

      {/* overlay */}
      <PopupOverlay
        open={isDialogAction}
        setOpen={setIsDialogAction}
        item={itemSpecialized}
        title={itemSpecialized.name ? 'Sửa Chuyên Ngành' : 'Thêm Chuyên Ngành '}
      >
        <ActionSpecialized
          item={itemSpecialized}
          setOpen={setIsDialogAction}
          setItemSpecialized={setItemSpecialized}
        />
      </PopupOverlay>

      {/* overlay remove */}
      <RemoveSpecialized
        item={itemRemove}
        open={isOpenRemove}
        setOpen={setIsOpenRemove}
      />
    </WrapContent>
  );
};
export default memo(SpecializedScreen);
