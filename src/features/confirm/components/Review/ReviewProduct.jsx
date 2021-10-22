import React from 'react';

import Slider from 'react-slick';

import {
  Content,
  MainReview,
  ImageSlice,
  ContentReview,
  // csftygubhc
  ListCurrentImg,
  TitleProject,
  GroupMember,
  LabelProject,
  BoxProject,
  GroupDetail,
  GroupBox,
  TitleMain,
  ContentPost,
  GroupAttach,
  ItemAttach,
  // BoxYoutube,
} from './ReviewProduct.styles';
import { MdContentPaste } from 'react-icons/md';
import { GrAttachment } from 'react-icons/gr';
import { LIST_SLIDE } from './../../constants/ReviewConstants';
const ReviewProduct = ({ data }) => {
  const settings = {
    customPaging: function (i) {
      return (
        <ListCurrentImg>
          <img src={LIST_SLIDE[i].img} className="current-slide" alt="" />
        </ListCurrentImg>
      );
    },
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Content>
      <MainReview className="row">
        <ImageSlice className="col-6">
          <Slider {...settings}>
            {LIST_SLIDE.map((item, index) => (
              <div key={index}>
                <img src={item.img} alt="" />
              </div>
            ))}
          </Slider>
        </ImageSlice>
        <ContentReview className="col-6">
          <TitleProject> {data.name} </TitleProject>

          <GroupMember>
            <LabelProject>Thành viên nhóm: </LabelProject>
            <div className="list-member">
              <span className="item-member">Lê Quang Sơn - PH09794</span>
              <span className="item-member">Lê Quang Sơn - PH09794</span>
              <span className="item-member">Lê Quang Sơn - PH09794</span>
              <span className="item-member">Lê Quang Sơn - PH09794</span>
              <span className="item-member">Lê Quang Sơn - PH09794</span>
            </div>
          </GroupMember>
          <BoxProject>
            <LabelProject>Khóa:</LabelProject>
            16.3
          </BoxProject>
          <BoxProject>
            <LabelProject>Giảng viên hướng dẫn:</LabelProject>
            Trần hữu thiện
          </BoxProject>
          <BoxProject>
            <LabelProject>Chuyên ngành:</LabelProject>
            Thiết kế website
          </BoxProject>
          <BoxProject>
            <LabelProject>Mã môn học:</LabelProject>
            {data.subject && data.subject.code}
          </BoxProject>
          <BoxProject>
            <LabelProject>Kì học:</LabelProject>
            Fall 2021
          </BoxProject>
        </ContentReview>
      </MainReview>
      <GroupDetail>
        <div className="row">
          <div className="xl-8">
            <div className="group-des">
              <TitleMain>
                <MdContentPaste />
                <span>Bài viết giới thiệu</span>
              </TitleMain>
              <ContentPost>{data.description}</ContentPost>
            </div>
          </div>
          <div className="xl-4">
            <GroupBox>
              <TitleMain>
                <GrAttachment />
                <span>Tài liệu đính kèm</span>
              </TitleMain>

              <GroupAttach>
                <ItemAttach>
                  <div className="title-attach">Link github:</div>
                  <a href="!#">
                    https://caodang.fpt.edu.vn/tin-tuc-poly/nu-sinh-fpoly-tay-nguyen-dat-chung-chi-cuoc-thi-vo-dich-thiet-ke-do-hoa-the-gioi.html
                  </a>
                </ItemAttach>
                <ItemAttach>
                  <div className="title-attach">Tài liệu hướng dẫn:</div>
                  <a href="!#">
                    https://caodang.fpt.edu.vn/tin-tuc-poly/nu-sinh-fpoly-tay-nguyen-dat-chung-chi-cuoc-thi-vo-dich-thiet-ke-do-hoa-the-gioi.html
                  </a>
                </ItemAttach>
              </GroupAttach>
            </GroupBox>
          </div>
        </div>
      </GroupDetail>
    </Content>
  );
};

export default ReviewProduct;
