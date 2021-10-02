import React, { memo, useState } from "react";
import { WrapContent } from "../../../styles/common/common-styles";
import { MdModeEdit } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import { GroupPagination, TitleTable, WapButton } from "./ProductScreen.styles";

import { TablePagination } from "./../../../components/Pagination/Pagination";
import ProductControlTable from "./../components/ProductControlTable/ProductControlTable";
import {
  TableCustom,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "./../../../components/Table/TableCustom";
import { Button } from "./../../../components/Button/Button";
const ProductScreen = () => {
  const [rowPerPage, setRowPerPage] = useState(10);
  const handleChangeRowsPerPage = (rowPage) => {
    setRowPerPage(rowPage);
  };

  const handleChangePage = () => {
    console.log("vo day");
  };
  const DATA_FAKE = [
    {
      id: 1,
      name: "dự án sản phẩm poly ",
      mon: "dự án tốt nghiệp",
      class: "pt15316",
      teacher: "trần hữu Thiện",
      group: "Lê Quang Sơn , lê duy sơn ...",
    },
    {
      id: 2,
      name: "dự án sản phẩm poly ",
      mon: "dự án tốt nghiệp",
      class: "pt15316",
      teacher: "trần hữu Thiện",
      group: "Lê Quang Sơn , lê duy sơn ...",
    },
    {
      id: 3,
      name: "dự án sản phẩm poly ",
      mon: "dự án tốt nghiệp",
      class: "pt15316",
      teacher: "trần hữu Thiện",
      group: "Lê Quang Sơn , lê duy sơn ...",
    },
    {
      id: 4,
      name: "dự án sản phẩm poly ",
      mon: "dự án tốt nghiệp",
      class: "pt15316",
      teacher: "trần hữu Thiện",
      group: "Lê Quang Sơn , lê duy sơn ...",
    },
    {
      id: 5,
      name: "dự án sản phẩm poly ",
      mon: "dự án tốt nghiệp",
      class: "pt15316",
      teacher: "trần hữu Thiện",
      group: "Lê Quang Sơn , lê duy sơn ...",
    },
  ];
  return (
    <WrapContent>
      <TitleTable> Danh sách sản phẩm </TitleTable>
      <ProductControlTable />
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
          {DATA_FAKE.map((item, index) => (
            <Tr>
              <Td> {index + 1}</Td>
              <Td> {item.name} </Td>
              <Td> {item.mon} </Td>
              <Td> {item.class}</Td>
              <Td> {item.teacher}</Td>
              <Td>
                <p>{item.group}</p>
              </Td>
              <Td>
                <WapButton>
                  <Button color="warning" icon={<MdModeEdit />}></Button>
                  <Button color="danger" icon={<BsTrash />}></Button>
                </WapButton>
              </Td>
            </Tr>
          ))}
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
    </WrapContent>
  );
};

export default memo(ProductScreen);
