import React, { memo, useState } from "react";
import { Formik } from 'formik';
import { BsImageFill } from 'react-icons/bs';
import { AiOutlineSave, AiOutlineDelete } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';

import ElementInput from 'components/FormElements/ElementInput/ElementInput';
import ElementSelect from 'components/FormElements/ElementSelect/ElementSelect';
import { Button } from 'components/Button/Button';
import {
  GroupAction,
  ContentForm,
  GroupImage,
  ListImage,
  ImageItem,
} from './ProductDetail.styles';
import { schema } from './../helpers/product-update.helpers';
import Editor from "./../componments/Editor/Editor";
import ElementInputFile from "components/FormElements/ElementInput/ElementInputFile";

const ProductUpdateScreens = () => {
const [groupStudents,setGroupStudents] = useState([])
  const handleChangeDescription = (description) => {};
  let email = [];
  const EmailChange = (e, index) => {
    email = [...groupStudents];
    email[index] = e.target.value;
    setGroupStudents(email);
  };

  const remove = (i) => {
    setGroupStudents(groupStudents.filter((element, index) => index !== i));
  };

//   const optionSelect =
//     listProductType &&
//     listProductType.map((item) => {
//       return { ...item, label: item.name, value: item.id };
//     });

  return (
    <>
      <Formik
        enableReinitialize
        initialValues
        validationSchema={schema}
        onSubmit={(values) => {
          // values.students = [...groupStudents];
          const student = [...groupStudents];
          console.log('lưu', student);
        }}
      >
        {({ handleSubmit }) => {
          return (
            <ContentForm>
              <div>
                <div className="from-group">
                  <label htmlFor=""> Tên Sản phẩm </label>
                  <ElementInput
                    type="text"
                    placeholder="Tên sản phẩm"
                    name="name"
                  />
                </div>
                <div className="from-group">
                  <label htmlFor=""> Video </label>
                  <ElementInput
                    type="text"
                    placeholder="Video"
                    name="video_url"
                  />
                </div>
                <div className="from-group">
                  <label htmlFor=""> Giảng viên </label>
                  <ElementInput
                    type="text"
                    placeholder="giảng viên "
                    name="teacher_id"
                    disabled
                  />
                </div>
                <div className="from-group">
                  <label htmlFor=""> Môn học </label>
                  <ElementInput
                    type="text"
                    placeholder="Môn Học  "
                    name="subject.code"
                    disabled
                  />
                </div>
                <div className="from-group">
                  <label htmlFor="">Kỳ Học </label>
                  <ElementInput
                    type="text"
                    placeholder="Kỳ Học"
                    name="subject.code"
                    disabled
                  />
                </div>
                <div className="from-group">
                  <label htmlFor="">Loại sản phẩm </label>
                  <div className="box-select">
                    <ElementSelect
                      className="select"
                      name="product_types"
                      placeholder="Loại sản phẩm "
                      options={[]}
                    />
                  </div>
                </div>
                <div className="from-group">
                  <label htmlFor="">Thành viên </label>
                  <div className="box-select">
                    {groupStudents
                      ? groupStudents.map((item, index) => {
                          return (
                            <div className="select" key={index}>
                              <input
                                className="inputE"
                                type="email"
                                placeholder="Tên và Mssv"
                                value={item}
                                onChange={(e) => EmailChange(e, index)}
                              />
                              <button
                                className="remove"
                                type="button"
                                onClick={() => remove(index)}
                              >
                                <MdDelete />
                              </button>
                            </div>
                          );
                        })
                      : ''}
                    <button
                      type="button"
                      className="add"
                      onClick={() => setGroupStudents([...groupStudents, ''])}
                    >
                      Thêm +
                    </button>
                  </div>
                </div>
                <div className="from-group">
                  <label htmlFor="">Kỳ Học </label>
                  <ElementInputFile
                    placeholder="Kỳ Học"
                    name="subject.code"
                  
                  />
                </div>
                <label htmlFor=""> Hình ảnh </label> <br />
                <GroupImage className="image">
                  <label htmlFor="img" className="img">
                    <span className="icon">
                      <BsImageFill />
                    </span>
                    <span>
                      <b> Upload a file</b> Không có tệp nào được chọn or drag
                      and drop <br /> PNG, JPG, GIF up to 10MB
                    </span>
                  </label>
                  <input type="file" multiple hidden="true" id="img" />
                </GroupImage>
                <ListImage>
                  <ImageItem>
                    {' '}
                    <img
                      src="https://cdn.pixabay.com/photo/2016/02/13/13/11/oldtimer-1197800_1280.jpg"
                      alt=""
                    />
                    <div className="delete">
                      <AiOutlineDelete />
                    </div>
                  </ImageItem>
                  <ImageItem> 2</ImageItem>
                  <ImageItem> 3</ImageItem>
                  <ImageItem> 4</ImageItem>
                </ListImage>
              </div>
              <div>
                <Editor
                  value="xin chào "
                  changeDescription={handleChangeDescription}
                />
              </div>
              <div>
                <GroupAction>
                  <Button
                    size="medium"
                   
                  >
                    Hủy
                  </Button>
                  <Button
                    size="medium"
                    color="primary"
                    icon={<AiOutlineSave />}
                    type="submit"
                    onClick={() => handleSubmit()}
                  >
                    Lưu
                  </Button>
                </GroupAction>
              </div>
            </ContentForm>
          );
        }}
      </Formik>
    </>
  );
};

export default memo(ProductUpdateScreens);
