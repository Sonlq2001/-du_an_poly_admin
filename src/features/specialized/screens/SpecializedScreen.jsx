import React, { memo, useState } from "react";
import { WrapContent } from "./../../../styles/common/common-styles";
import { TablePagination } from "./../../../components/Pagination/Pagination";
import SpecializedControlTable from "./../components/specializedControlTable/SpecializedControlTable";
import AddSpecialized from "../components/AddSpecialized/index";
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
	const [toggleAdd, setToggleAdd] = useState(false);
	const [Item, setItem] = useState();

	const Update = (item) => {
		setItem(item);
		setToggleAdd(true);
	};
	const AddSpecia = (item) => {
		setItem(item);
		setToggleAdd(!toggleAdd);
	};

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
					pageLengthMenu={[20, 50, 100]}
					page={pagination.page}
					pageLength={pagination.pageLength}
					totalRecords={pagination.totalRecords}
					onPageChange={handleChangePage}
				/>
			</GroupPagination>

			<PopupOverlay
				open={toggleAdd}
				setOpen={setToggleAdd}
				item={Item}
				title={Item ? "Sửa Chuyên Ngành" : "Thêm Chuyên Ngành "}
			>
				<AddSpecialized item={Item} />
			</PopupOverlay>
		</WrapContent>
	);
};
export default memo(SpecializedScreen);
