import styled from 'styled-components';

export const WrapBoxView = styled.div`
  @media (max-width: 1198.98px) {
    & {
      width: 40%;
    }
  }
  @media (max-width: 575.98px) {
    & {
      width: 100%;
    }
  }
`;
export const BoxViewItem = styled.div`
  background-color: var(--white-color);
  margin-top: 2rem;
  border-radius: 5px;
  padding: 2.5rem;
  display: flex;
  .box-icon {
    font-size: 3.5rem;
    margin-right: 5rem;
  }
  .icon-download {
    color: var(--red-color);
  }
  .icon-comment {
    color: var(--blue-color);
  }
  .box-title {
    font-size: 1.6rem;
    font-weight: 500;
    margin-bottom: 1.5rem;
    word-break: break-all;
  }
  .box-view {
    font-size: 1.4rem;
    color: var(--aaa-color);
  }
  @media (max-width: 1199.98px) {
    & {
      margin-top: 0;
      &:last-child {
        margin-top: 2rem;
      }
    }
  }
  @media (max-width: 767.98px) {
    & {
      padding: 2.5rem 1.5rem;
    }
    .box-icon {
      margin-right: 2rem;
    }
  }
`;
