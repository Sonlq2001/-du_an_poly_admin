import React, { memo, useState } from 'react';
import { MdModeEdit } from 'react-icons/md';
import { BsTrash } from 'react-icons/bs';
import { IoMdAdd } from 'react-icons/io';

import {
  WrapContent,
  HeaderTable,
  GroupPagination,
} from '../../../../styles/common/common-styles';
import {
  TableCustom,
  Thead,
  Th,
  Tr,
  Td,
  Tbody,
} from '../../../../components/Table/TableCustom';
import RemoveMajors from '../RemoveMajors/RemoveMajors';
import { TablePagination } from '../../../../components/Pagination/Pagination';
import ActionMajors from '../ActionMajors/ActionMajors';
import PopupOverlay from '../../../../components/PopupOverlay/PopupOverlay';
import { Button } from '../../../../components/Button/Button';
import { initForm } from '../../helpers/majors.helpers';
import { BoxActionTable } from './MajorsTable.styles';

const MajorsTable = ({ data }) => {
  const [isDialogAction, setIsDialogAction] = useState(false);
  const [itemMajors, setItemMajors] = useState(initForm);
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
      <HeaderTable>
        <Button
          icon={<IoMdAdd />}
          color="primary"
          onClick={() => {
            setIsDialogAction(true);
            setItemMajors(initForm);
          }}
        >
          Thêm
        </Button>
      </HeaderTable>

      <TableCustom>
        <Thead>
          <Tr>
            <Th sort={false}>STT</Th>
            <Th>Tên Chuyên Ngành</Th>
            <Th sort={false} align="right">
              Thao tác
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item, index) => (
            <Tr key={item.id}>
              <Td>{index + 1}</Td>
              <Td>{item.name}</Td>
              <Td>
                <BoxActionTable>
                  <Button
                    color="warning"
                    icon={<MdModeEdit />}
                    size="small"
                    onClick={() => {
                      setIsDialogAction(true);
                      setItemMajors(item);
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
        title={itemMajors.name ? 'Sửa Chuyên Ngành' : 'Thêm Chuyên Ngành '}
      >
        <ActionMajors item={itemMajors} setOpen={setIsDialogAction} />
      </PopupOverlay>

      {/* overlay remove */}
      <RemoveMajors
        item={itemRemove}
        open={isOpenRemove}
        setOpen={setIsOpenRemove}
      />
    </WrapContent>
  );
};

export default memo(MajorsTable);
