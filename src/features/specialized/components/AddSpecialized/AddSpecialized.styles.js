import styled from "styled-components";
export const Title = styled.h3`
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
    z-index: 100;
  }
`;
