import styled from 'styled-components';

export const GroupField = styled.div`
  display: flex;
  align-items: center;
  & + & {
    margin-top: 2rem;
  }

  &:last-child {
    margin-top: 4rem;
    justify-content: flex-end;
  }

  .label-field {
    font-size: 1.4rem;
    width: 15rem;
  }

  .content-field {
    font-size: 1.4rem;
    color: var(--aaa-color);
  }
`;

export const GroupRole = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: -1rem;
`;
