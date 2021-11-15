import React, { useState } from 'react';

import Slider from 'react-slick';
import ReactPlayer from 'react-player';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import _get from 'lodash.get';
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
  Video,
  // BoxYoutube,
} from './ReviewProduct.styles';
import { MdContentPaste } from 'react-icons/md';
import { GrAttachment } from 'react-icons/gr';
import { approveProduct } from 'features/confirm/redux/product.slice';
import PopupOverlay from 'components/PopupOverlay/PopupOverlay';
import Refuse from '../ActionProduct/refuse/Refuse';
const ReviewProduct = ({ data, setOpen }) => {
  console.log(data);
  const dispatch = useDispatch();
  const { useLogin } = useSelector((state) => state.auth);
  const [itemRefuse, setItemRefuse] = useState(false);
  const [refuse, setRefuse] = useState(null);
  const [loadingApprove, setLoadingApprove] = useState(false);
  const [loadingRefuse, setLoadingRefuse] = useState(false);
  const settings = {
    customPaging: function (i) {
      return (
        <ListCurrentImg>
          <img
            src={data.product_galleries && data.product_galleries[i]?.image_url}
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
  const handleConfirm = async (data) => {
    const productUpdateStatus = {
      id: data.id,
      status: data.status + 1,
      message: null,
    };
    setLoadingApprove(true);
    const response = await dispatch(approveProduct(productUpdateStatus));
    if (approveProduct.fulfilled.match(response)) {
      toast.success('Chấp nhận thành công !');
      setLoadingApprove(false);
      setOpen(false);
    } else {
      toast.error(_get(response.payload, 'name[0]'));
    }
  };
  const handleRefuse = (item) => {
    setRefuse(item);
    setItemRefuse(true);
  };
  return (
    <>
      <Content>
        <MainReview className="row">
          <ImageSlice className="col-6">
            {data.product_galleries ? (
              <Slider {...settings}>
                {data.product_galleries.map((item, index) => (
                  <div key={index}>
                    <img src={item?.image_url} alt="" />
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
            {data.status !== 3 && useLogin.id === data.teacher_id ? (
              <>
                {/* chấp nhận  */}
                <button
                  className="btn-item"
                  disabled={
                    data.status === 2 && useLogin.id === data.teacher_id
                  }
                  onClick={() => handleConfirm(data)}
                >
                  {loadingApprove ? (
                    <div className="loading">
                      <div className="loader"> </div>
                    </div>
                  ) : (
                    (data.status === 1 && 'châp nhận lần 1',
                    data.status === 2 && 'châp nhận lần 2')
                  )}
                </button>{' '}
                {/* từ trối */}
                <button
                  className="btn-item"
                  disabled={data.teacher_id !== useLogin.id}
                  onClick={() => handleRefuse(data)}
                >
                  {loadingRefuse ? (
                    <div className="loading">
                      <div className="loader"></div>
                    </div>
                  ) : (
                    'Từ Chối'
                  )}
                </button>
                {/* xóa  */}
                <button
                  className="btn-item"
                  hidden={data.teacher_id !== useLogin.id}
                >
                  Xóa
                </button>
              </>
            ) : (
              <div> </div>
            )}
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
                <Video className="video">
                  <ReactPlayer
                    controls
                    style={
                      ({ padding: 10 },
                      { margin_top: 50 },
                      { border_radius: 100 })
                    }
                    height="260px"
                    width="80%"
                    playbackRate
                    previewTabIndex={10}
                    playIcon
                    onReady={() => console.log('play')}
                    url={data.video_url}
                  />
                </Video>
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
                    <a target="_blank" href="!#" rel="noreferrer">
                      https://caodang.fpt.edu.vn/tin-tuc-poly/nu-sinh-fpoly-tay-nguyen-dat-chung-chi-cuoc-thi-vo-dich-thiet-ke-do-hoa-the-gioi.html
                    </a>
                  </ItemAttach>
                  <ItemAttach>
                    <div className="title-attach">Tài liệu hướng dẫn:</div>
                    <a
                      target="_blank"
                      href={data.resource_url && data.resource_url}
                      rel="noreferrer"
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
      <PopupOverlay
        open={itemRefuse}
        setOpen={setItemRefuse}
        size="md"
        title="Lý do "
      >
        <Refuse
          item={refuse}
          setItemRefuse={setItemRefuse}
          setLoadingRefuse={setLoadingRefuse}
        />
      </PopupOverlay>
    </>
  );
};

export default ReviewProduct;
