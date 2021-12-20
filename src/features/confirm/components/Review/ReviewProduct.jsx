import React, { useState } from 'react';
import Slider from 'react-slick';
import ReactPlayer from 'react-player';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { MdContentPaste } from 'react-icons/md';
import { GrAttachment } from 'react-icons/gr';
import { BsTrash, BsCheck } from 'react-icons/bs';

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
} from './ReviewProduct.styles';
import {
  postProductApprove,
  putProductChairmanApproved,
  deleteProduct,
} from 'features/confirm/redux/product.slice';
import PopupOverlay from 'components/PopupOverlay/PopupOverlay';
import Refuse from '../ActionProduct/refuse/Refuse';
import { defaultMessage } from 'constants/app.constants';

const ReviewProduct = ({ data, setOpen }) => {
  const dispatch = useDispatch();
  const { userLogin, listSemester } = useSelector((state) => ({
    userLogin: state.auth?.userLogin,
    listSemester: state.semester?.listSemester,
  }));
  const [itemRefuse, setItemRefuse] = useState(false);
  const [refuse, setRefuse] = useState(null);
  const [loadingRefuse, setLoadingRefuse] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRemove, setIsLoadingRemove] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  const settings = {
    customPaging: function (i) {
      return (
        <ListCurrentImg>
          <img
            src={data?.product_galleries[i]?.image_url}
            className="current-slide"
            alt=""
          />
        </ListCurrentImg>
      );
    },
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    autoplay: true,
    slidesToScroll: 1,
  };

  const handleConfirm = async (item) => {
    setDisableButton(true);
    setIsLoading(true);

    const actionDispatch =
      item?.status === 1 ? postProductApprove : putProductChairmanApproved;

    const response = await dispatch(
      actionDispatch({
        id: item?.id,
        status: item?.status + 1,
        message: null,
      })
    );

    if (actionDispatch.fulfilled.match(response)) {
      toast.success('Chấp nhận thành công !');
    } else {
      toast.error(defaultMessage.problems);
    }
    setOpen(false);
    setIsLoading(false);
    setDisableButton(false);
  };

  const handleRefuse = (item) => {
    setRefuse(item);
    setItemRefuse(true);
    setDisableButton(true);
  };

  const handleRemoveProduct = async () => {
    setIsLoadingRemove(true);
    const response = await dispatch(deleteProduct(data?.id));
    if (deleteProduct.fulfilled.match(response)) {
      toast.success('Xóa thành công !');
    } else {
      toast.error(response.payload);
    }
    setIsLoadingRemove(false);
    setOpen(false);
  };

  const isConfirm1 =
    data?.status === 1 &&
    data?.teacher_id === userLogin?.id &&
    userLogin?.teacher &&
    userLogin?.major_id === data?.major?.id &&
    userLogin?.campus_id === data?.campus_id;

  const isConfirm2 =
    data?.status === 2 &&
    data?.master_user === userLogin?.id &&
    userLogin?.facultyChairman &&
    userLogin?.major_id === data?.major?.id &&
    userLogin?.campus_id === data?.campus_id;

  const isRefuse =
    (userLogin?.id === data?.teacher_id ||
      userLogin?.id === data?.master_user) &&
    (userLogin?.teacher || userLogin?.facultyChairman) &&
    userLogin?.major_id === data?.major?.id &&
    (data?.status === 1 || data?.status === 2) &&
    userLogin?.campus_id === data?.campus_id;

  const isDeleted =
    (userLogin?.id === data?.teacher_id ||
      userLogin?.id === data?.master_user) &&
    (userLogin?.teacher || userLogin?.facultyChairman) &&
    userLogin?.major_id === data?.major?.id &&
    userLogin?.campus_id === data?.campus_id;

  return (
    <>
      <Content>
        <MainReview className="row">
          <ImageSlice className="col-6">
            {data?.product_galleries ? (
              <Slider {...settings}>
                {data?.product_galleries?.map((item, index) => (
                  <div key={index}>
                    <img src={item?.image_url} alt="" />
                  </div>
                ))}
              </Slider>
            ) : (
              <div className="slider_galleries">
                <img src={data?.image} alt="" />
              </div>
            )}
          </ImageSlice>
          <ContentReview className="col-6">
            <div className="group-action">
              {isConfirm1 && (
                <button
                  className="btn-item"
                  disabled={disableButton}
                  onClick={() => handleConfirm(data)}
                >
                  <div className="btn-content">
                    {isLoading ? <span className="loading" /> : <BsCheck />}
                    <span className="btn-text">Chấp nhận lần 1</span>
                  </div>
                </button>
              )}

              {isConfirm2 && (
                <button
                  className="btn-item"
                  disabled={disableButton}
                  onClick={() => handleConfirm(data)}
                >
                  <div className="btn-content">
                    {isLoading ? <span className="loading" /> : <BsCheck />}
                    <span className="btn-text">Chấp nhận lần 2</span>
                  </div>
                </button>
              )}

              {isRefuse && (
                <button
                  className="btn-item"
                  disabled={disableButton}
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
              )}

              {isDeleted && (
                <button
                  className="btn-item"
                  disabled={disableButton}
                  onClick={handleRemoveProduct}
                >
                  <div className="btn-content">
                    {isLoadingRemove ? (
                      <span className="loading" />
                    ) : (
                      <BsTrash />
                    )}
                    <span className="btn-text">Xóa</span>
                  </div>
                </button>
              )}
            </div>

            <TitleProject>{data?.name}</TitleProject>

            <BoxProject>
              <LabelProject>Cở sở:</LabelProject>
              {data?.teacher?.campuses?.name}
            </BoxProject>
            <GroupMember>
              <LabelProject>Thành viên nhóm: </LabelProject>
              <div className="list-member">
                {data?.students &&
                  data.students.map((element, i) => {
                    return (
                      <span key={i} className="item-member">
                        {element?.name} - {element?.student_code}
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
              {data?.teacher?.name} - {data?.teacher?.email}
            </BoxProject>
            <BoxProject>
              <LabelProject>Chuyên ngành:</LabelProject>
              Thiết kế website
            </BoxProject>
            <BoxProject>
              <LabelProject>Mã môn học:</LabelProject>
              {data?.subject?.code}
            </BoxProject>
            <BoxProject>
              <LabelProject>Kì học:</LabelProject>
              {
                listSemester?.find((item) => item.id === data?.semester_id)
                  ?.name
              }
            </BoxProject>
          </ContentReview>
        </MainReview>
        <GroupDetail>
          <div className="row">
            <div className="xl-9">
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
                    playbackRate
                    previewTabIndex={10}
                    playIcon
                    onReady={() => console.log('play')}
                    url={data?.video_url}
                  />
                </Video>
                <ContentPost
                  dangerouslySetInnerHTML={{
                    __html: data?.description,
                  }}
                ></ContentPost>
              </div>
            </div>
            <div className="xl-3">
              <GroupBox>
                <TitleMain>
                  <GrAttachment />
                  <span>Tài liệu đính kèm</span>
                </TitleMain>

                <GroupAttach>
                  <ItemAttach>
                    <div className="title-attach">Tài liệu hướng dẫn:</div>
                    <a
                      target="_blank"
                      href={data?.resource_url}
                      rel="noreferrer"
                      className="btn-docs"
                    >
                      Xem ngay
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
        setDisableButton={setDisableButton}
      >
        <Refuse
          item={refuse}
          setItemRefuse={setItemRefuse}
          setLoadingRefuse={setLoadingRefuse}
          setDisableButton={setDisableButton}
        />
      </PopupOverlay>
    </>
  );
};

export default ReviewProduct;
