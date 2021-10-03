import React from "react";
import { Form } from "./AddSpecialized.styles";
import Select from "react-select";

const AddSpecialized = ({ item }) => {
	return (
		<>
			<Form action="">
				<div className="from-group">
					<label htmlFor=""> Chủ nhiệm</label>
					<div className="box-select">
						<Select
							className="select"
							options={[
								{ value: "1", label: "Trần Hữu Thiện" },
								{ value: "2", label: "Lê Trọng Đạt" },
								{ value: "3", label: "Lê Trọng Đạt" },
								{ value: "4", label: "Lê Trọng Đạt" },
							]}
						/>
					</div>
				</div>
				<div className="from-group">
					<label htmlFor=""> Chuyên Ngành </label>
					<input
						type="text"
						placeholder="Tên "
						defaultValue={item ? item.name : ""}
					/>
				</div>
			</Form>
		</>
	);
};

export default AddSpecialized;
