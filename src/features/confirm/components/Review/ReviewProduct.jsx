import React from 'react';

import Slider from 'react-slick';
import ReactPlayer from 'react-player';
import {
  Content,
  MainReview,
  ImageSlice,
  ContentReview,
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
          <img
            src={data.galleries && data.galleries[i]}
            className="current-slide"
            alt=""
          />
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
          {data.galleries ? (
            <Slider {...settings}>
              {LIST_SLIDE.map((item, index) => (
                <div key={index}>
                  <img src={item} alt="" />
                </div>
              ))}
            </Slider>
          ) : (
            <div className="slider_galleries">
              {' '}
              <img src={data.image && data.image} alt="" />{' '}
            </div>
          )}
        </ImageSlice>
        <ContentReview className="col-6">
          <TitleProject> {data.name} </TitleProject>

          <GroupMember>
            <LabelProject>Thành viên nhóm: </LabelProject>
            <div className="list-member">
              {data.students &&
                data.students.map((element, i) => {
                  return (
                    <span key={i} className="item-member">
                      {element.name} - {element.student_code}
                    </span>
                  );
                })}
            </div>
          </GroupMember>
          <BoxProject>
            <LabelProject>Khóa:</LabelProject>
            16.3
          </BoxProject>
          <BoxProject>
            <LabelProject>Giảng viên hướng dẫn:</LabelProject>
            {data.teacher && data.teacher.name} -{' '}
            {data.teacher && data.teacher.email}
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
              <ContentPost
                dangerouslySetInnerHTML={{
                  __html: data.description,
                }}
              ></ContentPost>
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
                  <a target="_blank" href="!#">
                    https://caodang.fpt.edu.vn/tin-tuc-poly/nu-sinh-fpoly-tay-nguyen-dat-chung-chi-cuoc-thi-vo-dich-thiet-ke-do-hoa-the-gioi.html
                  </a>
                </ItemAttach>
                <ItemAttach>
                  <div className="title-attach">Tài liệu hướng dẫn:</div>
                  <a
                    target="_blank"
                    href={data.resource_url && data.resource_url}
                  >
                    {data.resource_url && data.resource_url}
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
