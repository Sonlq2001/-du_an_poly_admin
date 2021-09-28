import React, { memo, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { BsTrash } from "react-icons/bs";

import { WrapContent } from "./../../../../styles/common/common-styles";
import {
	TableCustom,
	Thead,
	Tr,
	Th,
	Tbody,
	Td,
} from "./../../../../components/Table/TableCustom";
import { Button } from "./../../../../components/Button/Button";
import { TablePagination } from "./../../../../components/Pagination/Pagination";
import { GroupPagination, TitleTable } from "./UserList.styles";
import UserControlTable from "./../../components/UserControlTable/UserControlTable";

const UserList = () => {
	const [rowPerPage, setRowPerPage] = useState(10);
	const handleChangeRowsPerPage = (rowPage) => {
		setRowPerPage(rowPage);
	};

	const handleChangePage = () => {
		console.log("vo day");
	};

	return (
		<WrapContent>
			<TitleTable>Danh sách user</TitleTable>
			<UserControlTable />
			<TableCustom>
				<Thead>
					<Tr>
						<Th sort={false}>STT</Th>
						<Th>Name</Th>
						<Th>Email</Th>
						<Th>Phone</Th>
						<Th sort={false}>Action</Th>
					</Tr>
				</Thead>

				<Tbody>
					<Tr>
						<Td>1</Td>
						<Td>Lê Quang Sơn</Td>
						<Td>sonlqph09794@fpt.edu.vn</Td>
						<Td>0394570202</Td>
						<Td>
							<Button color="warning">
								<MdModeEdit />
							</Button>
							<Button color="danger">
								<BsTrash />
							</Button>
						</Td>
					</Tr>

					<Tr>
						<Td>1</Td>
						<Td>Lê Quang Sơn</Td>
						<Td>sonlqph09794@fpt.edu.vn</Td>
						<Td>0394570202</Td>
						<Td>
							<Button color="warning">
								<MdModeEdit />
							</Button>
							<Button color="danger">
								<BsTrash />
							</Button>
						</Td>
					</Tr>

					<Tr>
						<Td>1</Td>
						<Td>Lê Quang Sơn</Td>
						<Td>sonlqph09794@fpt.edu.vn</Td>
						<Td>0394570202</Td>
						<Td>
							<Button color="warning">
								<MdModeEdit />
							</Button>
							<Button color="danger">
								<BsTrash />
							</Button>
						</Td>
					</Tr>

					<Tr>
						<Td>1</Td>
						<Td>Lê Quang Sơn</Td>
						<Td>sonlqph09794@fpt.edu.vn</Td>
						<Td>0394570202</Td>
						<Td>
							<Button color="warning">
								<MdModeEdit />
							</Button>
							<Button color="danger">
								<BsTrash />
							</Button>
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

export default memo(UserList);
