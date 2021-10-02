import React, { memo, useState } from "react";
import { FiCheck } from "react-icons/fi";
import { AiOutlineEye } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";

import { WrapContent } from "./../../../../styles/common/common-styles";
import {
	TitleTable,
	GroupPagination,
	GroupAction,
	BoxMain,
} from "./ConfirmScreen.styles";
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
import { Button } from "./../../../../components/Button/Button";
import { DATA_FAKE } from "./../../constants/confirm.constants";

const ConfirmScreen = () => {
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
			<BoxMain>
				<TitleTable> Sản phẩm chờ phê duyệt</TitleTable>
				<UserControlTable />
				<TableCustom className="table-confirm">
					<Thead>
						<Tr>
							<Th sort={false}>STT</Th>
							<Th>Tên đề tài </Th>
							<Th>Lớp</Th>
							<Th>Môn </Th>
							<Th className="fix-th">Kỳ học </Th>
							<Th>Thành viên </Th>
							<Th sort={false}>Action</Th>
						</Tr>
					</Thead>
					<Tbody>
						{DATA_FAKE.map((data) => (
							<Tr key={data.id}>
								<Td>{data.id}</Td>
								<Td>{data.name}</Td>
								<Td>{data.class}</Td>
								<Td>{data.subject}</Td>
								<Td className="fix-td">{data.semester}</Td>
								<Td>{data.member.map((item) => item)}</Td>
								<Td>
									<GroupAction>
										<Button icon={<FiCheck />} size="small" color="success" />
										<Button icon={<AiOutlineEye />} size="small" color="info" />
										<Button icon={<BsTrash />} size="small" color="danger" />
									</GroupAction>
								</Td>
							</Tr>
						))}
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
			</BoxMain>
		</WrapContent>
	);
};

export default memo(ConfirmScreen);
