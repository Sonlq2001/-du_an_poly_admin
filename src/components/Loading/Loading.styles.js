import styled from 'styled-components';

export const LoadingPage = styled.div`
  position: fixed;
  top: 0;
  left: ${({ isFullScreen }) => (isFullScreen ? 0 : '27.9rem')};
  right: 0;
  bottom: 0;
  background-color: ${({ isFullScreen }) =>
    isFullScreen ? 'rgba(255,255,255, 1)' : 'rgba(255,255,255, 0.8)'};
  z-index: 2000;
  .loader {
    position: absolute;
    top: ${({ isFullScreen }) => (isFullScreen ? '50%' : '40%')};
    left: 50%;
    transform: translate(-50%, -50%);
    border: 2px solid var(--eee-color);
    border-radius: 50%;
    border-top: 2px solid var(--blue-color);
    border-bottom: 2px solid var(--blue-color);
    width: 25px;
    height: 25px;
    animation: spin 0.5s linear infinite;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
