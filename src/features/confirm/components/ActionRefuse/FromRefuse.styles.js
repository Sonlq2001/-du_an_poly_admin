import styled from 'styled-components';
export const From = styled.form`
  max-width: 100%;
  overflow: hidden;
  & textarea {
    padding: 1rem;
    border-radius: 0.5rem;
    max-width: 100%;
    min-width: 100%;
    min-height: 100px;
    max-height: 300px;
    border: 1px solid var(--aaa-color);
  }
  & span.error {
    color: red;
  }
`;
export const GroupAction = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 4rem;
  width: 100%;
  float: right;
`;
