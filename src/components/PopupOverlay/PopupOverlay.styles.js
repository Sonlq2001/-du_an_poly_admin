import styled from 'styled-components';

export const GroupPopupOverlay = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.2);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  visibility: hidden;
  transition: ease-in-out 0.3s;
  &.active {
    opacity: 1;
    visibility: visible;
  }
`;
export const ContentPopupOverlay = styled.div`
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translate(-50%, -50%);
  z-index: 10;
  background-color: var(--white-color);
  border-radius: 5px;
  padding: 2rem 2.5rem;
  height: auto;
  opacity: 0;
  visibility: hidden;
  overflow: auto;
  width: ${({ size }) => size};
  transition: ease-in-out 0.4s;
  overflow: visible;
  &.active {
    top: 40%;
    opacity: 1;
    visibility: visible;
  }
  .title-popup {
    font-size: 1.7rem;
    font-weight: 500;
    border-bottom: 1px solid var(--eee-color);
    padding-bottom: 1.5rem;
  }
`;
export const ContentPopup = styled.div`
  position: relative;
  overflow-y: ${({ scroll }) => (scroll ? 'scroll' : 'visible')};
  width: 100%;
  max-height: 31rem;
  padding-top: 2rem;
  &::-webkit-scrollbar {
    width: 5px;
    height: 5rem;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--eee-color);
    border-radius: 10px;
  }
`;
export const ActionPopup = styled.div`
  margin-top: 3.5rem;
  padding-top: 1.5rem;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid var(--eee-color);
`;
