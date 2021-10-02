import React, { memo, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { BsTrash } from "react-icons/bs";

import { WrapContent } from "../../../../styles/common/common-styles";
import {
	TableCustom,
	Thead,
	Tr,
	Th,
	Tbody,
	Td,
} from "../../../../components/Table/TableCustom";
import { Button } from "../../../../components/Button/Button";
import { TablePagination } from "../../../../components/Pagination/Pagination";
import {
	GroupPagination,
	TitleTable,
	BoxActionTable,
} from "./UserScreen.styles";
import UserControlTable from "../../components/UserControlTable/UserControlTable";
import PopupOverlay from "../../../../components/PopupOverlay/PopupOverlay";
import PopupUser from "../../components/PopupUser/PopupUser";
import { DATA_FAKE } from "../../constants/user.constants";
import HightLightText from "./../../../../components/HightLightText/HightLightText";

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
						<Th>Vai trò</Th>
						<Th sort={false}>Action</Th>
					</Tr>
				</Thead>

				<Tbody>
					{DATA_FAKE.map((item) => {
						let roleUser = null;
						switch (item.role) {
							case 1:
								roleUser = "Admin";
								break;
							case 2:
								roleUser = "Giáo vụ";
								break;
							case 3:
								roleUser = "Giảng viên";
								break;
							default:
								roleUser = null;
						}
						return (
							<Tr key={item.id}>
								<Td>{item.id}</Td>
								<Td>{item.name}</Td>
								<Td>{item.email}</Td>
								<Td>{item.phone}</Td>
								<Td>
									<HightLightText value={item.role}>{roleUser}</HightLightText>
								</Td>
								<Td>
									<BoxActionTable>
										<Button
											color="warning"
											onClick={() => handleEdit(item)}
											icon={<MdModeEdit />}
											size="small"
										/>

										<Button
											color="danger"
											disabled={true}
											size="small"
											icon={<BsTrash />}
										/>
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
