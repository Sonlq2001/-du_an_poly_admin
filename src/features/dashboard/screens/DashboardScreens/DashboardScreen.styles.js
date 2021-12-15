import styled from 'styled-components';

export const ContentDashboard = styled.div`
  display: flex;
  justify-content: space-between;
  .wrap-left {
    width: 65%;
  }
  .wrap-right {
    width: 32%;
  }
  @media (max-width: 1199.98px) {
    & {
      flex-direction: column-reverse;
    }
    .wrap-right {
      width: 100%;
      display: flex;
      flex-direction: row-reverse;
      justify-content: space-between;
    }
    .wrap-left {
      width: 100%;
      margin-top: 2rem;
    }
  }
  @media (max-width: 575.98px) {
    .wrap-right {
      flex-direction: column-reverse;
    }
    .wrap-left {
      width: 100%;
      margin-top: 2rem;
    }
  }
`;
