import styled from "styled-components";
export const TitleTable = styled.h3`
  font-size: 1.8rem;
  font-weight: 500;
  margin: 1rem 0 3rem 0;
`;
export const Buttons = styled.button`
  font-size: 1.2rem;
  padding: 5px 8px;
  margin-right: 0.6rem;
  border: none;
  outline: none;
  background-color: ${(props) => props.background || ""};
  color: var(--white-color);
  border-radius: 5px;
  cursor: pointer;
  & a {
    text-decoration: none;
    color: var(--white-color);
  }
`;
export const Btn = ({ children, backgroundColor }) => {
  let backgroundButton = "";
  switch (backgroundColor) {
    case "warning":
      backgroundButton = "#FBB837";
      break;
    case "danger":
      backgroundButton = "#E54B3C";
      break;
    default:
      backgroundButton = "#3498DB";
  }
  return <Buttons background={backgroundButton}> {children}</Buttons>;
};
export const GroupPagination = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
`;
