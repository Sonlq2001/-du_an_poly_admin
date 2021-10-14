import React, { memo } from 'react';
import { GroupFilter, BoxFilter } from './ProductControlTable.styles';
import Select from 'react-select';
const ProductControlTable = ({ ChangeSearch, ChangeTeacher }) => {
  return (
    <GroupFilter>
      <BoxFilter>
        <label htmlFor="" className="label-filter">
          Tìm kiếm
        </label>
        <input
          onChange={(e) => ChangeSearch(e)}
          type="text"
          placeholder="Tìm kiếm"
          className="input-filter"
        />
      </BoxFilter>
      <BoxFilter>
        <label htmlFor="" className="label-filter">
          Giảng viên
        </label>
        <Select
          onChange={(e) => ChangeTeacher(e)}
          options={[
            { value: 'Trần Hữu Thiện', label: 'Trần Hữu Thiện' },
            { value: 'Lê Trọng Đạt', label: 'Lê Trọng Đạt' },
            { value: 'Trần Hữu Thiện', label: 'Trần Hữu Thiện' },
            { value: 'Trần Hữu Thiện', label: 'Trần Hữu Thiện' },
          ]}
        />
      </BoxFilter>
      <BoxFilter>
        <label htmlFor="" className="label-filter">
          Chuyên Ngành
        </label>
        <Select
          onChange={(e) => ChangeTeacher(e)}
          options={[
            { value: 'Trần Hữu Thiện', label: 'Ứng dụng phần mềm ' },
            { value: 'Thiết kế WebSite', label: 'Thiết kế WebSite' },
            { value: 'Thiết kế Đồ Họa', label: 'Thiết kế Đồ Họa' },
            { value: 'Du lịch - Nhà hàng', label: 'Du lịch - Nhà hàng' },
          ]}
        />
      </BoxFilter>
      <BoxFilter>
        <label htmlFor="" className="label-filter">
          Chuyên Ngành
        </label>
        <Select
          options={[
            { value: 'Trần Hữu Thiện', label: 'Ứng dụng phần mềm ' },
            { value: 'Thiết kế WebSite', label: 'Thiết kế WebSite' },
            { value: 'Thiết kế Đồ Họa', label: 'Thiết kế Đồ Họa' },
            { value: 'Du lịch - Nhà hàng', label: 'Du lịch - Nhà hàng' },
          ]}
        />
      </BoxFilter>
    </GroupFilter>
  );
};

export default memo(ProductControlTable);
