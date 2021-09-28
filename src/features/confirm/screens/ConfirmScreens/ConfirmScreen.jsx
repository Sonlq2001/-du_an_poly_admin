import React, { useState } from "react";
import { Link } from "react-router-dom";
import { WrapContent } from "./../../../../styles/common/common-styles";
import { TitleTable, Btn, GroupPagination } from "./Comfirm.styles";
import { TablePagination } from "./../../../../components/Pagination/Pagination";
import {
  TableCustom,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "./../../../../components/Table/TableCustom";
import UserControlTable from "./../../components/UserControlTable/UserControlTable";
const ListScreen = () => {
  const [rowPerPage, setRowPerPage] = useState(10);
  const handleChangeRowsPerPage = (rowPage) => {
    setRowPerPage(rowPage);
  };

  const handleChangePage = () => {
    console.log("vo day");
  };
  return (
    <WrapContent>
      <TitleTable> Sản phẩm chờ phê duyệt</TitleTable>
      <UserControlTable />
      <TableCustom>
        <Thead>
          <Tr>
            <Th sort={false}>STT</Th>
            <Th>Tên đề tài </Th>
            <Th>Lớp</Th>
            <Th>Môn </Th>
            <Th>Kỳ học </Th>
            <Th>Thành viên </Th>
            <Th sort={false}>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>1</Td>
            <Td>Web sản phẩm tốt sinh viên poly</Td>
            <Td>pt15305</Td>
            <Td>Dự án tốt nghiêp</Td>
            <Td>Kỳ sping 2021</Td>
            <Td>
              <li>Nguyễn Mạnh Quân</li>
              <li>Lê Duy sơn </li>
              <li>Lê Quang Sơn</li>
              <li>Nguyễn Hữu Sơn </li>
              <li>Lê Phương Thảo </li>
              <li>Bùi Hoàng Việt </li>
            </Td>
            <Td>
              <Btn backgroundColor="warning">
                <a href="https://www.youtube.com" target="_blank">
                  View
                </a>
              </Btn>
              <Btn>Phê duyệt</Btn>
              <Btn backgroundColor="danger">Từ trối</Btn>
            </Td>
          </Tr>
          <Tr>
            <Td>2</Td>
            <Td>Web sản phẩm tốt sinh viên poly</Td>
            <Td>pt15305</Td>
            <Td>Dự án tốt nghiêp</Td>
            <Td>Kỳ sping 2021</Td>
            <Td>
              <li>Nguyễn Mạnh Quân</li>
              <li>Lê Duy sơn </li>
              <li>Lê Quang Sơn</li>
              <li>Nguyễn Hữu Sơn </li>
              <li>Lê Phương Thảo </li>
              <li>Bùi Hoàng Việt </li>
            </Td>
            <Td>
              <Btn backgroundColor="warning">
                <a href="https://www.youtube.com" target="_blank">
                  View
                </a>
              </Btn>
              <Btn>Phê duyệt</Btn>
              <Btn backgroundColor="danger">Từ trối</Btn>
            </Td>
          </Tr>
          <Tr>
            <Td>3</Td>
            <Td>Web sản phẩm tốt sinh viên poly</Td>
            <Td>pt15305</Td>
            <Td>Dự án tốt nghiêp</Td>
            <Td>Kỳ sping 2021</Td>
            <Td>
              <li>Nguyễn Mạnh Quân</li>
              <li>Lê Duy sơn </li>
              <li>Lê Quang Sơn</li>
              <li>Nguyễn Hữu Sơn </li>
              <li>Lê Phương Thảo </li>
              <li>Bùi Hoàng Việt </li>
            </Td>
            <Td>
              <Btn backgroundColor="warning">
                <a href="https://www.youtube.com" target="_blank">
                  View
                </a>
              </Btn>
              <Btn>Phê duyệt</Btn>
              <Btn backgroundColor="danger">Từ trối</Btn>
            </Td>
          </Tr>
          <Tr>
            <Td>4</Td>
            <Td>Web sản phẩm tốt sinh viên poly</Td>
            <Td>pt15305</Td>
            <Td>Dự án tốt nghiêp</Td>
            <Td>Kỳ sping 2021</Td>
            <Td>
              <li>Nguyễn Mạnh Quân</li>
              <li>Lê Duy sơn </li>
            </Td>
            <Td>
              <Btn backgroundColor="warning">
                <a href="https://www.youtube.com" target="_blank">
                  View
                </a>
              </Btn>
              <Btn>Phê duyệt</Btn>
              <Btn backgroundColor="danger">Từ trối</Btn>
            </Td>
          </Tr>
          <Tr>
            <Td>5</Td>
            <Td>Web bán hàng </Td>
            <Td>pt15305</Td>
            <Td>Dự án tốt nghiêp</Td>
            <Td>Kỳ sping 2021</Td>
            <Td>
              <li>Nguyễn Mạnh Quân</li>
              <li>Lê Duy sơn </li>
              <li>Lê Quang Sơn</li>
              <li>Nguyễn Hữu Sơn </li>
              <li>Lê Phương Thảo </li>
              <li>Bùi Hoàng Việt </li>
            </Td>
            <Td>
              <Btn backgroundColor="warning">
                <a href="https://www.youtube.com" target="_blank">
                  View
                </a>
              </Btn>
              <Btn>Phê duyệt</Btn>
              <Btn backgroundColor="danger">Từ trối</Btn>
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
    </WrapContent>
  );
};

export default ListScreen;
