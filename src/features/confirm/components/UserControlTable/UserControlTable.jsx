import React from "react";
import { GroupFilter, BoxFilter } from "../UserControlTable.styles";
import Select from "react-select";
const UserControlTable = () => {
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
          Lớp
        </label>
        <Select
          placeholder="Lớp học"
          options={[{ value: 1, label: "pt13516" }]}
        />
      </BoxFilter>
      <BoxFilter>
        <label htmlFor="" className="label-filter">
          Kỳ
        </label>
        <Select
          placeholder="Kỳ học"
          options={[
            { value: 1, label: "kỳ Spring 2021" },
            { value: 2, label: "kỳ Summer 2021" },
            { value: 3, label: "kỳ Fall 2021" },
            { value: 4, label: "kỳ Spring 2020" },
          ]}
        />
      </BoxFilter>
      <BoxFilter>
        <label htmlFor="" className="label-filter">
          Môn
        </label>
        <Select
          placeholder="Mã Môn"
          options={[
            { value: 1, label: "Dự án tốt nghiệp" },
            { value: 2, label: "Dự án 1" },
          ]}
        />
      </BoxFilter>
    </GroupFilter>
  );
};

export default UserControlTable;
