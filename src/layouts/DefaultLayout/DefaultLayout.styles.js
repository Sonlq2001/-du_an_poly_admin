import styled from 'styled-components';

export const WrapApp = styled.div`
  display: flex;
  overflow: hidden;
  .wrap-main {
    width: calc(100% - 28rem);
    margin-left: 28rem;
    background-color: var(--bg-admin);
  }
  .wrap-content {
    padding: 3rem 3.5rem;
    position: relative;
    min-height: 90vh;
  }
  .overlay {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.8);
    z-index: 99;
  }
  @media (max-width: 991.98px) {
    .wrap-main {
      margin-left: 8rem;
      width: calc(100% - 8rem);
    }
  }
  @media (max-width: 767.98px) {
    .wrap-content {
      padding: 1.5rem 2rem;
    }
  }
  @media (max-width: 575.98px) {
    .wrap-main {
      width: 100%;
      margin-left: 0;
    }
    .wrap-content {
      padding: 1.5rem 1rem;
    }
  }
`;
