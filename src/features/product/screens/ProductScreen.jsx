import React, { useState } from "react";
import { WrapContent } from "../../../styles/common/common-styles";
import { MdModeEdit } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import { GroupPagination, TitleTable } from "./ProductScreen.styles";
import { Button } from "./../../../components/Button/Button";
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
const ProductScreen = () => {
	const [rowPerPage, setRowPerPage] = useState(10);
	const handleChangeRowsPerPage = (rowPage) => {
		setRowPerPage(rowPage);
	};

	const handleChangePage = () => {
		console.log("vo day");
	};
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
					<Tr>
						<Td> 1</Td>
						<Td> Sản phẩm poly </Td>
						<Td> dự án tốt nghiệp </Td>
						<Td> p115315</Td>
						<Td> Trần Hữu Thiện</Td>
						<Td>
							<p>Lê Quang Sơn , lê duy sơn ...</p>
						</Td>
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
						<Td> 2</Td>
						<Td> Sản phẩm poly </Td>
						<Td> dự án tốt nghiệp </Td>
						<Td> p115315</Td>
						<Td> Trần Hữu Thiện</Td>
						<Td>
							<p>Lê Quang Sơn , lê duy sơn ...</p>
						</Td>
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
						<Td> 2</Td>
						<Td> Sản phẩm poly </Td>
						<Td> dự án tốt nghiệp </Td>
						<Td> p115315</Td>
						<Td> Trần Hữu Thiện</Td>
						<Td>
							<p>Lê Quang Sơn , lê duy sơn ...</p>
						</Td>
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
						<Td> 3</Td>
						<Td> Sản phẩm poly </Td>
						<Td> dự án tốt nghiệp </Td>
						<Td> p115315</Td>
						<Td> Trần Hữu Thiện</Td>
						<Td>
							<p>Lê Quang Sơn , lê duy sơn ...</p>
						</Td>
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
						<Td> 4</Td>
						<Td> Sản phẩm poly </Td>
						<Td> dự án tốt nghiệp </Td>
						<Td> p115315</Td>
						<Td> Trần Hữu Thiện</Td>
						<Td>
							<p>Lê Quang Sơn , lê duy sơn ...</p>
						</Td>
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
						<Td> 3</Td>
						<Td> Sản phẩm poly </Td>
						<Td> dự án tốt nghiệp </Td>
						<Td> p115315</Td>
						<Td> Trần Hữu Thiện</Td>
						<Td>
							<p>Lê Quang Sơn , lê duy sơn ...</p>
						</Td>
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
						<Td> 4</Td>
						<Td> Sản phẩm poly </Td>
						<Td> dự án tốt nghiệp </Td>
						<Td> p115315</Td>
						<Td> Trần Hữu Thiện</Td>
						<Td>
							<p>Lê Quang Sơn , lê duy sơn ...</p>
						</Td>
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
						<Td> 5</Td>
						<Td> Sản phẩm poly </Td>
						<Td> dự án tốt nghiệp </Td>
						<Td> p115315</Td>
						<Td>Lê Trọng Đạt </Td>
						<Td>
							<p>Lê Quang Sơn , lê duy sơn ...</p>
						</Td>
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
						<Td> 6</Td>
						<Td> Sản phẩm poly </Td>
						<Td> dự án tốt nghiệp </Td>
						<Td> p115315</Td>
						<Td> Trần Hữu Thiện</Td>
						<Td>
							<p>Lê Quang Sơn , lê duy sơn ...</p>
						</Td>
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
						<Td> 7</Td>
						<Td> Sản phẩm poly </Td>
						<Td> dự án tốt nghiệp </Td>
						<Td> p115315</Td>
						<Td> Trần Hữu Thiện</Td>
						<Td>
							<p>Lê Quang Sơn , lê duy sơn ...</p>
						</Td>
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
						<Td> 8</Td>
						<Td> Sản phẩm poly </Td>
						<Td> Dự án 1 </Td>
						<Td> p115315</Td>
						<Td> Trần Hữu Thiện</Td>
						<Td>
							<p>Lê Quang Sơn , lê duy sơn ...</p>
						</Td>
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

export default ProductScreen;
