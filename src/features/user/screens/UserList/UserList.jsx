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
import { GroupPagination, TitleTable, BoxActionTable } from "./UserList.styles";
import UserControlTable from "./../../components/UserControlTable/UserControlTable";
import PopupOverlay from "./../../../../components/PopupOverlay/PopupOverlay";
import PopupUser from "./../../components/PopupUser/PopupUser";
import { DATA_FAKE } from "./../../constants/user.constants";

const UserList = () => {
	const [isPopup, setIsPopup] = useState(false);
	const [contentEdit, setContentEdit] = useState({ name: "" });
	const [pagination, setPagination] = useState({
		page: 1,
		pageLength: 20,
		totalRecords: 100,
	});

	const handleChangePage = (values) => {
		setPagination({ ...pagination, ...values });
	};
	console.log(pagination);

	const handleEdit = (values) => {
		setContentEdit({ ...contentEdit, ...values });
		setIsPopup(true);
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
					{DATA_FAKE.map((item) => {
						return (
							<Tr key={item.id}>
								<Td>1</Td>
								<Td>{item.name}</Td>
								<Td>{item.email}</Td>
								<Td>{item.phone}</Td>
								<Td>
									<BoxActionTable>
										<Button color="warning" onClick={() => handleEdit(item)}>
											<MdModeEdit />
										</Button>

										<Button color="danger" disabled={true}>
											<BsTrash />
										</Button>
									</BoxActionTable>
								</Td>
							</Tr>
						);
					})}
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

			<PopupOverlay open={isPopup} setOpen={setIsPopup} title="Sửa user">
				<PopupUser content={contentEdit} />
			</PopupOverlay>
		</WrapContent>
	);
};

export default memo(UserList);
