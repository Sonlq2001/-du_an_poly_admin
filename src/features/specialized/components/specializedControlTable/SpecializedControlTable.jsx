import React from "react";
import Select from "react-select";
import { GroupFilter, BoxFilter } from "./SpecializedControlTable.styles";

const SpecializedControlTable = () => {
	return (
		<GroupFilter>
			<BoxFilter>
				<label htmlFor="" className="label-filter">
					Tìm Kiếm
				</label>
				<input type="text" placeholder="Tìm kiếm" className="input-filter" />
			</BoxFilter>
			<BoxFilter>
				<label htmlFor="" className="label-filter">
					Chủ nhiệm
				</label>
				<div>
					<Select />
				</div>
			</BoxFilter>
		</GroupFilter>
	);
};

export default SpecializedControlTable;
