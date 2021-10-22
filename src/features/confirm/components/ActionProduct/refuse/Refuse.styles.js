import styled from 'styled-components';
export const From = styled.form`
  padding: 0px 15px 0px 0px;
  & textarea {
    display: block;
    max-width: 100%;
    min-width: 100%;
    min-height: 100px;
    max-height: 150px;
    margin-left: 10px;
    border-radius: 5px;
    border: 1px solid gray;
    padding: 0.5rem;
  }
  & label {
    font-size: 1.4rem;
    padding: 1rem;
    margin-right: 0.6rem;
  }
  & label:hover {
    background-color: var(--ddd-color);
    border-radius: 5px;
  }
  & .errors {
    padding-left: 1rem;
    padding-top: 0.3rem;
    color: red;
  }
`;
export const GroupButton = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: right;
  align-items: center;
`;
