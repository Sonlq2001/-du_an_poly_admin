import React, { memo, useState } from 'react';
import {
  TableCustom,
  Thead,
  Th,
  Tr,
  Td,
  Tbody,
} from '../../../../components/Table/TableCustom';
import {
  WrapContent,
  HeaderTable,
  GroupPagination,
} from '../../../../styles/common/common-styles';
import { MdModeEdit } from 'react-icons/md';
import { BsTrash } from 'react-icons/bs';
import { IoMdAdd } from 'react-icons/io';
import { Button } from '../../../../components/Button/Button';
import { TablePagination } from '../../../../components/Pagination/Pagination';
import PopupOverlay from '../../../../components/PopupOverlay/PopupOverlay';
import { BoxActionTable } from './SubjectTable.styles';
import ActionSubject from '../ActionSubject/ActionSubject';
import RemoveSubject from '../RemoveSubject/RemoveSubject';
import { initForm } from '../../helpers/subject.helpers';
const SubjectTable = ({ data, dataMajors }) => {
  const [isDialogAction, setIsDialogAction] = useState(false);
  const [itemSpecialized, setItemSpecialized] = useState(initForm);
  const [isOpenRemove, setIsOpenRemove] = useState(false);
  const [itemRemove, setItemRemove] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    pageLength: 10,
    totalRecords: 100,
  });

  const handleChangePage = (values) => {
    setPagination({ ...pagination, ...values });
  };
  return (
    <>
      <WrapContent>
        <HeaderTable>
          <Button
            icon={<IoMdAdd />}
            color="primary"
            onClick={() => {
              setIsDialogAction(true);
              setItemSpecialized(initForm);
            }}
          >
            Thêm
          </Button>
        </HeaderTable>
        <TableCustom>
          <Thead>
            <Tr>
              <Th sort={false}>STT</Th>
              <Th>Tên Môn </Th>
              <Th>Mã Môn </Th>
              <Th>Chuyên Ngành </Th>
              <Th sort={false} align="right">
                Action
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item, index) => (
              <Tr key={index}>
                <Td> {index + 1} </Td>
                <Td> {item.name} </Td>
                <Td> {item.code} </Td>
                <Td> {index + 1} </Td>
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
            pageLengthMenu={[10, 20, 50, 100]}
            page={pagination.page}
            pageLength={pagination.pageLength}
            totalRecords={pagination.totalRecords}
            onPageChange={handleChangePage}
          />
        </GroupPagination>

        <PopupOverlay
          open={isDialogAction}
          setOpen={setIsDialogAction}
          item={itemSpecialized}
          title={
            itemSpecialized && itemSpecialized.name
              ? 'Sửa Môn  Học  '
              : 'Thêm Môn Học '
          }
        >
          <ActionSubject
            item={itemSpecialized}
            setOpen={setIsDialogAction}
            setItemSpecialized={setItemSpecialized}
            dataMajors={dataMajors}
          />
        </PopupOverlay>

        <RemoveSubject
          item={itemRemove}
          open={isOpenRemove}
          setOpen={setIsOpenRemove}
        />
      </WrapContent>
    </>
  );
};

export default memo(SubjectTable);
