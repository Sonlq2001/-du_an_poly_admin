import React, { memo } from "react";

import { BoxCheckbox } from "./ElementCheckbox.styles";

const ElementCheckbox = ({ label, name, id, checked }) => {
	return (
		<BoxCheckbox>
			<label htmlFor={id} className="label-filed">
				{label}
			</label>
			<input
				type="checkbox"
				className="checkbox-field"
				name={name}
				id={id}
				checked={checked}
			/>
		</BoxCheckbox>
	);
};

export default memo(ElementCheckbox);
