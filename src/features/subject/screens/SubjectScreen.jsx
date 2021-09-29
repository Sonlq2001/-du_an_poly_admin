import React, { memo } from "react";
import { Formik, Form } from "formik";

import ElementInput from "./../../../components/FormElements/ElementInput/ElementInput";
import ElementRadio from "./../../../components/FormElements/ElementRadio/ElementRadio";
import { Button } from "./../../../components/Button/Button";
import { initForm, schema } from "./../helpers/subject.helpers";

const SubjectScreen = () => {
	return (
		<div>
			<Formik
				initialValues={initForm}
				validationSchema={schema}
				onSubmit={(values) => {
					console.log(values);
				}}
			>
				{() => {
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

							<ElementRadio
								type="radio"
								name="gender"
								label="Nam"
								id="gender1"
								value="male"
							/>
							<ElementRadio
								type="radio"
								name="gender"
								label="Nữ"
								id="gender2"
								value="female"
							/>

							<Button size="small">submit</Button>
						</Form>
					);
				}}
			</Formik>
		</div>
	);
};

export default memo(SubjectScreen);
