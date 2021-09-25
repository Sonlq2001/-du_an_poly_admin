import React, { memo, useMemo } from "react";

import TableComponent from "./TableComponent";

const TableFeedback = () => {
	const columns = useMemo(
		() => [
			{
				Header: "STT",
				accessor: "id",
			},
			{
				Header: "Người đánh giá",
				accessor: "name",
			},
			{
				Header: "Nội dung",
				accessor: "content",
			},
			{
				Header: "Sản phẩm",
				accessor: "product",
			},
			{
				Header: "Thời gian",
				accessor: "time",
			},
		],
		[]
	);

	const data = useMemo(
		() => [
			{
				id: 1,
				name: "le quang son",
				content: "san pham pro max vip",
				product: "đồ án tốt nghiệp marketing",
				time: "09/25/2021",
			},
			{
				id: 2,
				name: "le quang son",
				content: "san pham pro max vip",
				product: "đồ án tốt nghiệp marketing",
				time: "09/25/2021",
			},
			{
				id: 3,
				name: "le quang son",
				content: "san pham pro max vip",
				product: "đồ án tốt nghiệp marketing",
				time: "09/25/2021",
			},
			{
				id: 4,
				name: "le quang son",
				content: "san pham pro max vip",
				product: "đồ án tốt nghiệp marketing",
				time: "09/25/2021",
			},
			{
				id: 5,
				name: "le quang son",
				content: "san pham pro max vip",
				product: "đồ án tốt nghiệp marketing",
				time: "09/25/2021",
			},
		],
		[]
	);

	return <TableComponent columns={columns} data={data} />;
};

export default memo(TableFeedback);
