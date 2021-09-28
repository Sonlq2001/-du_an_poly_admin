import styled from "styled-components";
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
export const WarFrom = styled.div`
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  z-index: 10;
  background-color: var(--white-color);
  border-radius: 5px;
  padding: 2rem 2.5rem;
  height: auto;
  opacity: 0;
  visibility: hidden;
  min-width: 45rem;
  max-width: 45rem;
  transition: ease-in-out 0.4s;

  &.active {
    top: 7%;
    opacity: 1;
    visibility: visible;
  }
`;
export const Titel = styled.h3`
  padding-bottom: 1rem;
  margin-bottom: 3rem;
  font-size: 17px;
  font-weight: 550;
  border-bottom: 2px solid var(--eee-color);
`;
export const Form = styled.form`
  text-align: right;
  & .from-group {
    padding-bottom: 2rem;
    display: flex;
  }
  & .from-group label {
    margin-right: 2rem;
    line-height: 3rem;
    font-size: 13px;
  }
  & .from-group > input {
    width: 25rem;
    border-radius: 5px;
    font-size: 14px;
    padding-left: 1rem;
    outline: none;
    border: 1px solid #c1bcbc;
    height: 3.8rem;
    font-weight: 200;
    :focus {
      border: 2px solid #165bf3;
    }
  }
  & .from-group .select {
    width: 25.2rem;
    font-size: 14px;
    margin-left: 2.2rem;
  }
  & button {
    font-size: 17px;
    padding: 8px 12px;
    margin-right: 15px;
    box-shadow: 0px 0px 4px 0.3px #3498db;
    border-radius: 5px;
    border: none;
    background-color: #3498db;
    color: var(--white-color);
  }
  & > span {
    background-color: #e54b3c;
    font-size: 17px;
    padding: 8px 12px;
    margin-right: 15px;
    color: var(--white-color);
    box-shadow: 0px 0px 4px 0.3px #e54b3c;
    border-radius: 5px;
    cursor: pointer;
  }
`;
