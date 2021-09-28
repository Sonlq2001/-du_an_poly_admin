import React from "react";
import {
  GroupPopupOverlay,
  WarFrom,
  Titel,
  Form,
} from "./AddSpecialized.styles";
import Select from "react-select";
const AddSpecia = ({ open, setOpen }) => {
  return (
    <div>
      <GroupPopupOverlay
        className={`${open ? "active" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <WarFrom
          className={`${open ? "active" : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          {" "}
          <Titel>Thêm Chuyên Ngành </Titel>
          <Form action="">
            <div className="from-group">
              <label htmlFor=""> Chuyên Ngành </label>
              <input type="text" placeholder="Tên " />
            </div>
            <div className="from-group">
              <label htmlFor=""> Chủ nhiệm</label>
              <Select
                className="select"
                options={[
                  { value: "1", label: "Trần Hữu Thiện" },
                  { value: "2", label: "Lê Trọng Đạt" },
                ]}
              />
            </div>
            <button>lưu</button>
            <span onClick={() => setOpen(!open)}>hủy</span>
          </Form>
        </WarFrom>
      </GroupPopupOverlay>
    </div>
  );
};

export default AddSpecia;
