import React, { memo, useState } from "react";
import { WrapContent } from "./../../../styles/common/common-styles";
import { TablePagination } from "./../../../components/Pagination/Pagination";
import SpecializedControlTable from "./../components/specializedControlTable/SpecializedControlTable";
import Addspecialized from "./../components/add/index";
import PopupOverlay from "./../../../components/PopupOverlay/PopupOverlay";
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
  const [Item, setItem] = useState();
  const handleChangeRowsPerPage = (rowPage) => {
    setRowPerPage(rowPage);
  };
  const handleChangePage = () => {
    console.log("vo day");
  };
  const Update = (item) => {
    console.log("Thêm chuyên ngành ");
    setItem(item);
    setToggleAdd(true);
  };
  const AddSpecia = (item) => {
    setItem(item);
    setToggleAdd(!toggleAdd);
    console.log("Thêm chuyên ngành ");
  };
  return (
    <WrapContent>
      <TitleTable>
        Danh sách chuyên ngành
        <Add onClick={() => AddSpecia(null)}>
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
                <Button
                  color="warning"
                  onClick={() =>
                    Update({
                      id: 1,
                      name: "thiết kế website",
                      teacher_id: "1",
                    })
                  }
                >
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

      <PopupOverlay
        open={toggleAdd}
        setOpen={setToggleAdd}
        item={Item}
        title={Item ? "Sửa Chuyên Ngành" : "Thêm Chuyên Ngành "}
      >
        <Addspecialized item={Item} />
      </PopupOverlay>
    </WrapContent>
  );
};
export default memo(SpecializedScreen);
