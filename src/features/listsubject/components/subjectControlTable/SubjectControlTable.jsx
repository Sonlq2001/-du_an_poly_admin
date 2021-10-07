import React, { memo } from 'react';
import Select from 'react-select';
import { GroupFilter, BoxFilter } from './SubjectControlTable.styles';
const SubjectControlTable = () => {
  return (
    <GroupFilter>
      <BoxFilter>
        <label htmlFor="" className="label-filter">
          Tìm kiếm
        </label>
        <input type="text" placeholder="Tìm kiếm" className="input-filter" />
      </BoxFilter>
      <BoxFilter>
        <label htmlFor="" className="label-filter">
          Chuyên Ngành
        </label>
        <Select
          options={[
            { value: 'Trần Hữu Thiện', label: 'Trần Hữu Thiện' },
            { value: 'Lê Trọng Đạt', label: 'Lê Trọng Đạt' },
            { value: 'Trần Hữu Thiện', label: 'Trần Hữu Thiện' },
            { value: 'Trần Hữu Thiện', label: 'Trần Hữu Thiện' },
          ]}
        />
      </BoxFilter>
    </GroupFilter>
  );
};

export default memo(SubjectControlTable);
