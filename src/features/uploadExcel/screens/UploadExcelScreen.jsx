import React, { memo } from 'react';
import { GrFormUpload } from 'react-icons/gr';
import { MdCloudUpload } from 'react-icons/md';
import { Formik, Form, ErrorMessage } from 'formik';

import { WrapContent } from './../../../styles/common/common-styles';
import {
  GroupUpload,
  BoxUpload,
  ContentUpload,
} from './UploadExcelScreen.styles';
import { Button } from './../../../components/Button/Button';
import { LIST_BRANCH } from './../constants/upload.constants';
import ElementSelect from './../../../components/FormElements/ElementSelect/ElementSelect';
import { schema, initForm } from './../helpers/upload.helpers';
import ElementInputFile from './../../../components/FormElements/ElementInput/ElementInputFile';

const UploadExcelScreen = () => {
  return (
    <WrapContent>
      <Formik
        initialValues={initForm}
        validationSchema={schema}
        onSubmit={(values) => {
          // TODO : upload file
        }}
      >
        {() => {
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
                      options={LIST_BRANCH}
                      name="branch"
                      label="Cơ sở"
                    />
                  </div>
                </div>
                <BoxUpload>
                  <ContentUpload htmlFor="file-upload" className="label-upload">
                    <ElementInputFile
                      className="input-upload"
                      id="file-upload"
                      name="file"
                      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    />
                    <span className="icon-upload">
                      <GrFormUpload />
                    </span>
                    <p className="text-upload">Chọn file upload</p>
                  </ContentUpload>
                  <ErrorMessage
                    component="div"
                    name="file"
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
