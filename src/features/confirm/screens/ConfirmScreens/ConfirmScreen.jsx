import React, { memo, useState } from "react";
import { WrapContent } from "./../../../../styles/common/common-styles";
import { TitleTable, WapButton, GroupPagination } from "./Comfirm.styles";
import { TablePagination } from "./../../../../components/Pagination/Pagination";
import PopupOverlay from "./../../../../components/PopupOverlay/PopupOverlay";
import {
  TableCustom,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "./../../../../components/Table/TableCustom";
import { Button } from "./../../../../components/Button/Button";
import UserControlTable from "./../../components/UserControlTable/UserControlTable";
import Reason from "../../components/reason/Reason";
const ListScreen = () => {
  const [rowPerPage, setRowPerPage] = useState(10);
  const [open, setOpen] = useState(false);
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
              <p>Lê quang Sơn , Nguyễn Hữu Sơn .......</p>
            </Td>
            <Td>
              <WapButton>
                <Button color="warning" href="https://www.youtube.com">
                  View
                </Button>
                <Button>Phê duyệt</Button>
                <Button color="danger" onClick={() => setOpen(!open)}>
                  Từ trối
                </Button>
              </WapButton>
            </Td>
          </Tr>
          <Tr>
            <Td>2</Td>
            <Td>Web sản phẩm tốt sinh viên poly</Td>
            <Td>pt15305</Td>
            <Td>Dự án tốt nghiêp</Td>
            <Td>Kỳ sping 2021</Td>
            <Td>
              <p>Nguyễn Mạnh Quân,Lê Phương Thảo... </p>
            </Td>
            <Td>
              <WapButton>
                <Button color="warning" href="https://www.youtube.com">
                  View
                </Button>
                <Button>Phê duyệt</Button>
                <Button color="danger">Từ trối</Button>
              </WapButton>
            </Td>
          </Tr>
          <Tr>
            <Td>3</Td>
            <Td>Web sản phẩm tốt sinh viên poly</Td>
            <Td>pt15305</Td>
            <Td>Dự án tốt nghiêp</Td>
            <Td>Kỳ sping 2021</Td>
            <Td>
              <p>Bùi Hoàng việt , Lê duy Sơn ....</p>
            </Td>
            <Td>
              <WapButton>
                <Button color="warning" href="https://www.youtube.com">
                  View
                </Button>
                <Button>Phê duyệt</Button>
                <Button color="danger">Từ trối</Button>
              </WapButton>
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
              <WapButton>
                <Button color="warning" href="https://www.youtube.com">View</Button>
                <Button>Phê duyệt</Button>
                <Button color="danger">Từ trối</Button>
              </WapButton>
            </Td>
          </Tr>
          <Tr>
            <Td>5</Td>
            <Td>Web bán hàng </Td>
            <Td>pt15305</Td>
            <Td>Dự án tốt nghiêp</Td>
            <Td>Kỳ sping 2021</Td>
            <Td>
              <p>Bùi Hoàng việt , Lê duy Sơn ....</p>
            </Td>
            <Td>
              <WapButton>
                <Button color="warning" href="https://www.youtube.com">View</Button>
                <Button>Phê duyệt</Button>
                <Button color="danger">Từ trối</Button>
              </WapButton>
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
      <PopupOverlay open={open} setOpen={setOpen} title="Lý do">
        <Reason />
      </PopupOverlay>
    </WrapContent>
  );
};

export default memo(ListScreen);
