import styled from 'styled-components';

export const BoxTitleDashboard = styled.div`
  font-size: 1.6rem;
  font-weight: 500;
`;
export const WrapContent = styled.div`
  border-radius: 5px;
  background-color: var(--white-color);
  padding: 2rem;
  height: auto;
  & + & {
    margin-top: 2rem;
  }
  .titleSearch {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
  .titleSearch span {
    padding: 2px 8px;
    font-size: 11px;
    height: 32px;
    background-color: #f0ecec;
    border-radius: 10px;
    line-height: 28px;
    display: flex;
    justify-content: space-between;
  }
  .titleSearch span:hover {
    cursor: pointer;
  }
  .titleSearch span .icon {
    font-size: 25px;
  }
  .sortVip {
    margin-top: 5rem;
    transition: 2s ease;
    opacity: 0;
  }
  .activeAdvanced {
    margin-top: 5rem;
    transition: 2s ease;
    opacity: 1;
  }
  .hidenFilter {
    margin-top: 18px;
    opacity: 0;
    visibility: hidden;
    max-height: 0;
    transition: 0.3s ease-in-out;
  }
  .showFilter {
    margin-top: 18px;
    opacity: 1;
    visibility: visible;
    max-height: 15rem;
    transition: 0.3s ease-in-out;
    margin-bottom: 15px;
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
  @media (max-width: 767.98px) {
    flex-direction: column;
    .box-control {
      width: 100%;
      margin-left: 0;
    }
    .box-control + .box-control {
      margin-top: 2rem;
    }
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
  justify-content: space-between;
  margin-bottom: 2rem;
  .buttonAction {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 2rem;
  }
  .resultSeach {
    font-size: 1.7rem;
  }
  .resultSeach span {
    font-size: 1.4rem;
    font-weight: 500;
  }
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
