import styled from 'styled-components';
export const OverLay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100vh;
  background-color: #6e6c6c36;
  z-index: 10;
  opacity: 0;
  visibility: hidden;
  &.active {
    opacity: 1;
    visibility: visible;
  }
`;
export const Content = styled.div`
  max-width: 100%;
  overflow: hidden;
`;
export const MainReview = styled.div`
  max-width: 100%;
  overflow: hidden;
`;
export const DescriptionReview = styled.div``;

export const ContentReview = styled.div`
  .group-action {
    display: flex;
    align-items: center;
  }
  & h1 {
    font-size: 2rem;
    line-height: 2.5rem;
    color: var(--txt-color);
  }
  .btn-item {
    background-color: #e6e6e6;
    padding: 10px 7px;
    margin: 5px;
    color: #11070a;
    border: none;
    border-radius: 5px;
    font-size: 1.3rem;
  }
  .btn-item .btn-content {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .btn-text {
    padding-left: 1rem;
  }
  .btn-item:disabled {
    background-color: var(--eee-color);
    color: #6666;
  }
  .btn-item:disabled:hover {
    cursor: not-allowed;
  }
  .btn-item .loading {
    width: 13px;
    height: 13px;
    border-radius: 50%;
    margin-right: 8px;
    border-top: 2px solid var(--blue-color);
    border-right: 2px solid var(--blue-color);
    animation: spin 0.6s linear infinite;
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
  .btn-item:hover {
    opacity: 0.8;
  }
`;

export const TitleProject = styled.h1`
  font-size: 2rem;
  line-height: 2.5rem;
  color: var(--txt-color);
  margin-top: 1rem;
`;

export const GroupMember = styled.div`
  margin-top: 2rem;

  .list-member {
    margin: 1.5rem 0 0 2rem;
  }
  .item-member {
    display: block;
    font-size: 1.3rem;
  }
  .item-member + .item-member {
    margin-top: 1rem;
  }
`;

export const LabelProject = styled.div`
  font-size: 1.4rem;
  white-space: nowrap;
  margin-right: 1rem;
  color: var(--red-color);
  font-weight: 500;
  margin-right: 1rem;
`;

export const BoxProject = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  font-size: 1.4rem;
`;

export const GroupDetail = styled.div`
  margin-top: 6rem;
`;

// group detail
export const ImageSlice = styled.div`
  padding-top: 1rem;
  & .slick-dots li {
    width: 70px;
    height: 70px;
  }
  & .slick-dots {
    width: 85%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  & .slick-list {
    height: 370px;
    overflow: hidden;
  }
  & .slick-list img {
    width: 100%;
    height: 300px;
    image-resolution: center;
    image-rendering: pixelated;
    border-radius: 5px;
    object-fit: cover;
  }
  & .slider_galleries {
    font-size: 1.5rem;
    color: #e96969;
  }
`;

export const ListCurrentImg = styled.div`
  width: 150px;
  height: 50px;
  overflow: hidden;
  & + & {
    margin: 2rem;
  }
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
  & .current-slide {
    max-height: 70px;
    width: 70px;
    border-radius: 5px;
    image-rendering: pixelated;
    image-resolution: center;
    object-fit: cover;
  }
`;
export const TitleMain = styled.h3`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: var(--txt-color);

  span {
    display: inline-block;
    margin-left: 1rem;
  }
`;
export const Video = styled.div`
  margin-top: 10px;
  border-radius: 10px;
  & iframe {
    border-radius: 10px !important;
  }
`;

export const GroupBox = styled.div`
  position: sticky;
  top: 0;
  &:not(:first-child) {
    margin-top: 2.5rem;
  }
`;

export const ContentPost = styled.p`
  font-size: 1.3rem;
  color: var(--txt-color);
  line-height: 2.5rem;
  margin-top: 2.5rem;
  text-align: justify;
  & img{
    border-radius : 5px;
  }
`;

export const GroupAttach = styled.div`
  margin-top: 2.5rem;
`;

export const ItemAttach = styled.div`
  & + & {
    margin-top: 2rem;
  }
  font-size: 1.2rem;
  .title-attach {
    font-size: 1.4rem;
    font-weight: 500;
    margin-bottom: 5px;
    max-width: 100%;
    overflow: hidden;
  }
  .btn-docs {
    padding: 1rem 1.5rem;
    background-color: var(--eee-color);
    display: inline-block;
    margin-top: 1rem;
    border-radius: 5px;
    color: var(--txt--color);
    &:hover {
      background-color: var(--ddd-color);
      cursor: pointer;
    }
  }
`;

export const BoxYoutube = styled.div`
  width: 100%;
  margin-top: 1rem;
  .video-youtube {
    width: 100%;
    height: 25rem;
  }
`;
export const WaitingVideo = styled.div`
  margin-top: 1.5rem;
  padding: 10px 15px;
  width: 14rem;
  background: var(--eee-color);
  border-radius : 5px;
  font-size: 1.3rem;
  &:hover{
    background-color: var(--ddd-color);
    cursor: pointer;
  }
` 