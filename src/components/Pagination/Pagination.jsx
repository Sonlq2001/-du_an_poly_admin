import React, { useState } from "react";
import { FaSortDown } from "react-icons/fa";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import OutsideClickHandler from "react-outside-click-handler";

import { GroupPagination, BoxSelect, BoxControl } from "./Pagination.styles";

export const TablePagination = ({
	onPageChange,
	onRowsPerPageChange,
	rowsPerPageOptions,
	rowsPerPage,
}) => {
	const [isSelect, setIsSelect] = useState(false);

	const handleChangePage = (newPage) => {
		rowsPerPage += rowsPerPage;
		onPageChange();
	};

	const handleChangePageRow = (item) => {
		onRowsPerPageChange(item);
		setIsSelect(false);
	};

	return (
		<GroupPagination>
			<span className="title-pagination">Hàng mỗi trang: </span>
			<BoxSelect>
				<div
					className={`show-option ${isSelect ? "active" : ""}`}
					onClick={() => setIsSelect(!isSelect)}
				>
					{rowsPerPage}
					<span className="icon-option">
						<FaSortDown />
					</span>
				</div>
				{isSelect && (
					<OutsideClickHandler onOutsideClick={() => setIsSelect(false)}>
						<div className="list-option">
							{rowsPerPageOptions.map((item) => (
								<div
									className="item-option"
									key={item}
									onClick={() => handleChangePageRow(item)}
								>
									{item}
								</div>
							))}
						</div>
					</OutsideClickHandler>
				)}
			</BoxSelect>

			<div className="location-pagination">
				{1}-{rowsPerPage} of 100
			</div>

			<BoxControl>
				<span className="icon-prev">
					<BsChevronLeft />
				</span>

				<span className="icon-next" onClick={() => handleChangePage(1)}>
					<BsChevronRight />
				</span>
			</BoxControl>
		</GroupPagination>
	);
};
