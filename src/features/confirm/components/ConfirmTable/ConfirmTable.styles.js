import styled from 'styled-components';

export const BoxMain = styled.div`
  .table-confirm .fix-th {
    min-width: 8rem;
  }
  .fix-td {
    text-align: center;
  }
`;

export const GroupAction = styled.div`
  text-align: right;
  position: relative;
  .show-action {
    cursor: pointer;
    font-size: 2rem;
  }
`;

export const ListAction = styled.div`
  position: absolute;
  top: -2rem;
  right: 3rem;
  background-color: var(--white-color);
  box-shadow: 0 0 1rem var(--eee-color);
  border-radius: 5px;
  z-index: 0;
  overflow: hidden;
  .item-action {
    white-space: nowrap;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 1rem;
    &:hover {
      background-color: var(--eee-color);
    }
  }
  .icon-action {
    padding-right: 7px;
  }
  .item-action.disabled {
    background-color: hsl(0deg 0% 93%);
    color: hsl(0deg 0% 40% / 40%);
    cursor: no-drop;
    cursor: not-allowed;
    pointer-events: none;
  }
  .item-action .disabled :hover {
    cursor: not-allowed;
  }
`;

export const GroupPagination = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
`;
