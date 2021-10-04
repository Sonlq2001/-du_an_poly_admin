import React, { memo } from "react";
import Select from "react-select";
import { useField, ErrorMessage } from "formik";

const ElementSelect = ({ label, id, options, placeholder, ...rest }) => {
	const [field] = useField(rest);
	const handleSelect = (selected) => {
		const option = selected ? selected.value : selected;
		const valueOption = {
			target: {
				name: field.name,
				value: option,
			},
		};
		field.onChange(valueOption);
	};

	return (
		<div>
			<label htmlFor="">{label}</label>
			<div>
				<Select
					options={options}
					placeholder={placeholder}
					onChange={handleSelect}
				/>
			</div>
			<ErrorMessage component="div" name={field.name} />
		</div>
	);
};

export default memo(ElementSelect);
