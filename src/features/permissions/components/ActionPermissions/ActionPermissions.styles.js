import styled from 'styled-components';

export const ContentForm = styled.div`
  & .from-group {
    padding-bottom: 2rem;
    display: flex;
    justify-content: space-between;
  }
  .from-group + .from-group {
    margin-top: 1.5rem;
  }
  .form-checkbox {
    align-items: center;
  }
  & .from-group > label:nth-child(1) {
    line-height: 3rem;
    font-size: 15px;
    color: gray;
    white-space: nowrap;
    width: 40%;
  }
  @media (max-width: 575.98px) {
    .from-group {
      flex-direction: column;
    }
    .from-group + .from-group {
      margin-top: 0;
    }
    .form-checkbox {
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
    }
    .form-checkbox > label:nth-child(1) {
      width: auto;
      padding-right: 2rem;
    }
  }
`;
export const GroupAction = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 4rem;
`;
