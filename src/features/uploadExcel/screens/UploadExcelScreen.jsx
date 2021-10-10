import React, { memo, useEffect } from 'react';
import { GrFormUpload } from 'react-icons/gr';
import { MdCloudUpload } from 'react-icons/md';
import { Formik, Form, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import { WrapContent } from './../../../styles/common/common-styles';
import {
  GroupUpload,
  BoxUpload,
  ContentUpload,
} from './UploadExcelScreen.styles';
import { Button } from './../../../components/Button/Button';
import ElementSelect from './../../../components/FormElements/ElementSelect/ElementSelect';
import { schema, initForm } from './../helpers/upload.helpers';
import ElementInputFile from './../../../components/FormElements/ElementInput/ElementInputFile';
import {
  postImportFileExcel,
  getSemesters,
} from './../redux/uploadExcel.slice';
import { MapOptions } from './../../../helpers/convert/map-options';

const UploadExcelScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSemesters());
  }, [dispatch]);

  const { listSemester } = useSelector((state) => state.uploadExcel);
  const listSelectOptionSemester = MapOptions(listSemester);

  return (
    <WrapContent>
      <Formik
        initialValues={initForm}
        validationSchema={schema}
        onSubmit={(values) => {
          const valueForm = new FormData();
          valueForm.append('campus_id', 1);
          valueForm.append('semester_id', values.semester_id);
          valueForm.append('excel', values.excel);
          dispatch(postImportFileExcel(valueForm));
        }}
      >
        {({ touched, errors, values }) => {
          let classError = touched.semester_id && touched.excel && errors;
          if (values.excel !== null) {
            classError = false;
          }
          return (
            <Form>
              <GroupUpload>
                <h3 className="title-upload">Danh sách điểm</h3>
                <div className="group-select">
                  <div className="box-select">
                    <ElementSelect
                      placeholder="Kì học"
                      name="semester"
                      options={[]}
                      label="Kì học"
                    />
                  </div>
                  <div className="box-select">
                    <ElementSelect
                      placeholder="Cơ sở"
                      options={
                        listSelectOptionSemester ? listSelectOptionSemester : []
                      }
                      name="semester_id"
                      label="Cơ sở"
                    />
                  </div>
                </div>
                <BoxUpload className={`${classError ? 'error-group' : ''}`}>
                  <ContentUpload
                    htmlFor="file-upload"
                    className="label-upload form-field"
                  >
                    <ElementInputFile
                      className="input-upload"
                      id="file-upload"
                      name="excel"
                      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    />
                    <span className="icon-upload">
                      <GrFormUpload />
                    </span>
                    <p className="text-upload">Chọn file upload</p>
                  </ContentUpload>
                  <ErrorMessage
                    component="div"
                    name="excel"
                    className="error-file"
                  />
                </BoxUpload>
                <p className="helper-upload">
                  * Chọn file excel điểm của các sinh viên
                </p>

                <div className="button-upload">
                  <Button
                    type="submit"
                    icon={<MdCloudUpload />}
                    size="medium"
                    color="primary"
                  >
                    Upload
                  </Button>
                </div>
              </GroupUpload>
            </Form>
          );
        }}
      </Formik>
    </WrapContent>
  );
};

export default memo(UploadExcelScreen);
