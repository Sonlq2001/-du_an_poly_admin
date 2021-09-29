import React, { memo } from "react";

import ElementCheckbox from "./../../../../components/FormElements/ElementCheckbox/ElementCheckbox";
import { GroupField, GroupRole } from "./PopupUser.styles";

const PopupUser = ({ content }) => {
	return (
		<>
			<GroupField>
				<label htmlFor="" className="label-field">
					Họ tên
				</label>
				<p className="content-field">{content.name}</p>
			</GroupField>
			<GroupField>
				<label htmlFor="" className="label-field">
					Email
				</label>
				<p className="content-field">{content.email}</p>
			</GroupField>
			<GroupField>
				<label htmlFor="" className="label-field">
					Họ tên
				</label>
				<p className="content-field">Lê Quang Sơn</p>
			</GroupField>
			<GroupField>
				<label htmlFor="" className="label-field">
					Vai trò
				</label>
				<GroupRole>
					<ElementCheckbox label="Giảng viên" name="role1" id="role1" />
					<ElementCheckbox label="Giáo vụ" name="role2" id="role2" />
					<ElementCheckbox label="Admin" name="role3" id="role3" />
					<ElementCheckbox label="Quyền 1" name="role4" id="role4" />
					<ElementCheckbox label="Quyền 2" name="role5" id="role5" />
				</GroupRole>
			</GroupField>
		</>
	);
};

export default memo(PopupUser);
