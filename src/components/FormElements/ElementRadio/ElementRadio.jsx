import React, { memo } from "react";
import { useField, ErrorMessage } from "formik";

import { BoxElementRadio } from "./ElementRadio.styles";

const ElementRadio = ({ label, id, ...rest }) => {
	const [field] = useField(rest);
	return (
		<BoxElementRadio>
			<label htmlFor={id} className="label-field">
				{label}
			</label>
			<input type="radio" className="radio-field" id={id} {...field} />
			<div className="radio-fake"></div>
			<ErrorMessage component="div" name={field.name} className="err-msg" />
		</BoxElementRadio>
	);
};

export default memo(ElementRadio);
