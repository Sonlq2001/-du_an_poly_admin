import React, { memo } from "react";
import { Formik, Form } from "formik";

import ElementInput from "./../../../components/FormElements/ElementInput/ElementInput";
import {
	ElementRadioGroup,
	ElementRadio,
} from "./../../../components/FormElements/ElementRadioGroup/ElementRadioGroup";
import ElementSelect from "./../../../components/FormElements/ElementSelect/ElementSelect";
import { Button } from "./../../../components/Button/Button";
import { initForm, schema } from "./../helpers/subject.helpers";

const SubjectScreen = () => {
	return (
		<div>
			<Formik
				initialValues={initForm}
				validationSchema={schema}
				onSubmit={(values) => {
					console.log(values, "vo day");
				}}
			>
				{({ values, errors, touched, setFieldValue }) => {
					return (
						<Form>
							<ElementInput
								placeholder="Nhập tên nào"
								name="subject"
								label="Tên của bản"
							/>

							<ElementInput
								placeholder="Nhập masv"
								name="code"
								label="Mã số sinh viên"
							/>

							<ElementRadioGroup
								title="Chọn giới tính"
								value={values.gender}
								error={errors.gender}
								touched={touched.gender}
							>
								<ElementRadio
									type="radio"
									name="gender"
									value="male"
									id="male"
									label="Nam"
								/>
								<ElementRadio
									type="radio"
									name="gender"
									value="female"
									id="female"
									label="Nữ"
								/>
							</ElementRadioGroup>

							<ElementSelect
								options={[
									{ label: "Trần Hữu Thiện", value: 1 },
									{ label: "Lê Trọng Đạt", value: 2 },
								]}
								label="Chọn giảng viên"
								name="teacher"
								placeholder="Giảng viên"
								setFieldValue={setFieldValue}
							/>

							<Button type="button" size="small">
								submit
							</Button>
						</Form>
					);
				}}
			</Formik>
		</div>
	);
};

export default memo(SubjectScreen);
