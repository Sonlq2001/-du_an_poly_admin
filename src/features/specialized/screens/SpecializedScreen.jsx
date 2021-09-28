import React, { memo, useState } from "react";
import { WrapContent } from "./../../../styles/common/common-styles";
import { TablePagination } from "./../../../components/Pagination/Pagination";
import SpecializedControlTable from "./../components/specializedControlTable/SpecializedControlTable";
import Addspecialized from "./../components/add/index";
import {
  GroupPagination,
  TitleTable,
  BoxActionTable,
  Add,
} from "./Specialized.styles";
import { MdModeEdit } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import {
  TableCustom,
  Thead,
  Th,
  Tr,
  Td,
  Tbody,
} from "../../../components/Table/TableCustom";
import { Button } from "../../../components/Button/Button";
const SpecializedScreen = () => {
  const [rowPerPage, setRowPerPage] = useState(10);
  const [toggleAdd, setToggleAdd] = useState(false);
  const handleChangeRowsPerPage = (rowPage) => {
    setRowPerPage(rowPage);
  };
  const handleChangePage = () => {
    console.log("vo day");
  };
  return (
    <WrapContent>
      <TitleTable>
        Danh sách chuyên ngành
        <Add onClick={() => setToggleAdd(!toggleAdd)}>
          <IoMdAdd />
        </Add>{" "}
      </TitleTable>
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
          <Tr>
            <Td>1 </Td>
            <Td> Thiết kế đồ họa </Td>
            <Td>Trần Hữu Thiện </Td>
            <Td>
              <BoxActionTable>
                <Button color="warning">
                  <MdModeEdit />
                </Button>
                <Button color="danger">
                  <BsTrash />
                </Button>
              </BoxActionTable>
            </Td>
          </Tr>
        </Tbody>
      </TableCustom>
      <GroupPagination>
        <TablePagination
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[10, 20, 50]}
          rowsPerPage={rowPerPage}
          onPageChange={handleChangePage}
        />
      </GroupPagination>
      <Addspecialized open={toggleAdd} setOpen={setToggleAdd} />
    </WrapContent>
  );
};
export default memo(SpecializedScreen);
