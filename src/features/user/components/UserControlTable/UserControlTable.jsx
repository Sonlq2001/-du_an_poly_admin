import React, { memo } from "react";
import Select from "react-select";

import { GroupFilter, BoxFilter } from "./UserControlTable.styles";

const UserControlTable = () => {
	return (
		<GroupFilter>
			<BoxFilter>
				<label htmlFor="" className="label-filter">
					Tìm kiếm
				</label>
				<input type="text" placeholder="Tìm kiếm" className="input-filter" />
			</BoxFilter>

			<BoxFilter>
				<label htmlFor="" className="label-filter">
					Vai trò
				</label>
				<Select
					options={[
						{ label: "Quản trị", value: 1 },
						{ label: "Giáo vụ", value: 2 },
						{ label: "Giảng viên", value: 3 },
						{ label: "Sinh viên", value: 4 },
					]}
					placeholder="Tìm theo vai trò"
				/>
			</BoxFilter>
		</GroupFilter>
	);
};

export default memo(UserControlTable);
