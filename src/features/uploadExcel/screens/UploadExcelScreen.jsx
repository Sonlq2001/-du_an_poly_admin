import React, { memo } from 'react';
import { GrFormUpload } from 'react-icons/gr';
import { MdCloudUpload } from 'react-icons/md';
import Select from 'react-select';

import { WrapContent } from './../../../styles/common/common-styles';
import { GroupUpload, BoxUpload } from './UploadExcelScreen.styles';
import { Button } from './../../../components/Button/Button';
import { LIST_BRANCH } from './../constants/upload.constants';

const UploadExcelScreen = () => {
  const handleUpload = () => {
    console.log('vo day');
  };

  return (
    <WrapContent>
      <GroupUpload>
        <h3 className="title-upload">Danh sách điểm</h3>
        <div className="group-select">
          <Select placeholder="Kì học" className="select-upload" />
          <Select
            placeholder="Cơ sở"
            className="select-upload"
            options={LIST_BRANCH}
          />
        </div>
        <BoxUpload>
          <label htmlFor="file-upload" className="label-upload">
            <input type="file" className="input-upload" id="file-upload" />
            <span className="icon-upload">
              <GrFormUpload />
            </span>
            <p className="text-upload">Chọn file upload</p>
          </label>
        </BoxUpload>
        <p className="helper-upload">
          * Chọn file excel điểm của các sinh viên
        </p>

        <div className="button-upload">
          <Button icon={<MdCloudUpload />} size="medium" onClick={handleUpload}>
            Upload
          </Button>
        </div>
      </GroupUpload>
    </WrapContent>
  );
};

export default memo(UploadExcelScreen);
