import styled from "styled-components";
export const Title = styled.div`
        font-size: 18px;
        font-weight:  500;
        padding: 10px 0px;
`
export const BoxMain =styled.div`
	background-color: var(--white-color);
    margin-top: 10px;
    margin-bottom: 10rem;
    padding: 1.5rem;
    width: 100%;
    height: auto;
    .sort{
        display: flex;
        width: 100%;
        margin: 2rem 0px;
        padding-left: 10px;
    }
    .chart{
        width: 50%;
        text-align: center;
        margin-top:40px;
    }
`
export const BoxControl = styled.div`
  .label-control {
    font-size: 1.2rem;
    color: var(--aaa-color);
    display: block;
    margin-bottom: 1rem;
  }
  & + & {
    margin-left: 4rem;
  }
  .select-option {
    font-size: 1.2rem;
    border-radius: 5px;
    padding: 2.5px 0;
    width: 200px;
    /* height: 10px; */
  }
  .css-1s2u09g-control {
    background-color: #f4f4f4;
    border: none;
    height: 100%;
  }
  .css-1pahdxg-control {
    background-color: var(--eee-color);
    border: none;
    box-shadow: none;
  }
  .css-qc6sy-singleValue {
    font-size: 1.1rem;
  }
`