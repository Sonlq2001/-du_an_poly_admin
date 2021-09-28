import styled from "styled-components";

export const GroupFilter = styled.div`
  margin-bottom: 4rem;
  display: flex;
  align-items: center;
`;
export const BoxFilter = styled.div`
  width: 20rem;

  & + & {
    margin-left: 4rem;
  }

  .label-filter {
    font-size: 1.4rem;
    margin-bottom: 8px;
    display: inline-block;
  }
  .input-filter {
    width: 100%;
    padding: 1rem 1.5rem;
    border: 1px solid var(--ddd-color);
    border-radius: 5px;
  }

  .input-filter:focus {
    border: 1px solid var(--blue-color);
  }
`;
