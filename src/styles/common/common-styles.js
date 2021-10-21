import styled from 'styled-components';

export const BoxTitleDashboard = styled.div`
  font-size: 1.6rem;
  font-weight: 500;
`;
export const WrapContent = styled.div`
  border-radius: 5px;
  background-color: var(--white-color);
  padding: 2rem;
  & + & {
    margin-top: 2rem;
  }
`;
export const TitleMain = styled.h3`
  font-size: 2rem;
  font-weight: 500;
  margin: 1rem 0 2rem 0;
`;
export const TitleControl = styled(TitleMain)`
  font-size: 1.8rem;
  margin: 0 0 3rem 0;
`;
export const BoxControl = styled.div`
  .label-control {
    font-size: 1.5rem;
    color: var(--aaa-color);
    display: block;
    margin-bottom: 1rem;
  }
  & + & {
    margin-left: 4rem;
  }
  .select-option {
    font-size: 1.4rem;
    border-radius: 5px;
    padding: 2.5px 0;
    background-color: var(--eee-color);
  }
  .css-1s2u09g-control {
    background-color: var(--eee-color);
    border: none;
    height: 100%;
  }
  .css-1pahdxg-control {
    background-color: var(--eee-color);
    border: none;
    box-shadow: none;
  }
  .css-qc6sy-singleValue {
    font-size: 1.3rem;
  }
`;
export const BoxSearch = styled.div`
  & + & {
    margin-top: 3rem;
  }
  display: flex;
  align-items: center;
  .box-control {
    width: 50%;
  }
`;
export const BoxSearchInput = styled(BoxSearch)`
  justify-content: space-between;
`;
export const InputSearch = styled.input`
  width: 100%;
  padding: 1.3rem 1.5rem;
  border: none;
  border-radius: 5px;
  background-color: var(--eee-color);
`;
export const HeaderTable = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 2rem;
`;
export const GroupPagination = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
`;
export const BoxActionTable = styled.div`
  display: flex;
  justify-content: flex-end;
`;
export const EmptyResult = styled.div`
  font-size: 1.5rem;
  text-align: center;
  .text-result {
    font-size: 1.5rem;
  }
  img {
    height: 20rem;
  }
`;
