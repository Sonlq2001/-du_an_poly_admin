import React from "react";
import Select from "react-select";
import { GroupFilter, BoxFilter } from "./Scpecialized.styles";

const SpecializedControlTable = () => {
  return (
    <GroupFilter>
      <BoxFilter>
        <label htmlFor="" className="label-filter">
          Tìm Kiếm{" "}
        </label>
        <input type="text" placeholder="Tìm kiếm" className="input-filter" />
      </BoxFilter>
      <BoxFilter>
        <label htmlFor="" className="label-filter">
          Chủ nhiệm
        </label>
        <Select />
      </BoxFilter>
    </GroupFilter>
  );
};

export default SpecializedControlTable;
