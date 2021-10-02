import React, { memo, useState } from "react";
import { WrapContent } from "./../../../../styles/common/common-styles";
import {
	TitleTable,
	Btn,
	GroupPagination,
	GroupAction,
} from "./Comfirm.styles";
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
							<div>
								<Btn backgroundColor="warning">
									<a href="https://www.youtube.com" target="_blank">
										View
									</a>
								</Btn>
								<Btn>Phê duyệt</Btn>
								<Btn backgroundColor="danger">Từ trối</Btn>
							</div>
						</Td>
					</Tr>
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
		</WrapContent>
	);
};

export default memo(ListScreen);
