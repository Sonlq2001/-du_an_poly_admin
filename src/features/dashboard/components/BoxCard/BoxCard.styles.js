import styled from 'styled-components';

export const ListBoxCard = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 575.98px) {
    & {
      flex-direction: column;
    }
  }
`;

export const ItemCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: var(--white-color);
  border-radius: 5px;
  padding: 1.5rem;
  width: 31%;

  .card-left {
    margin-right: 1.5rem;
  }

  .card-total {
    font-size: 2rem;
    line-height: 2.5rem;
    font-weight: 600;
  }

  .card-title {
    font-size: 1.5rem;
    margin-top: 1.5rem;
  }

  .card-right {
    font-size: 2.5rem;
    color: var(--yellow-color);
    position: relative;
    padding: 1.5rem;
    border-radius: 100%;
  }

  .card-right::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    border-radius: inherit;
    right: 0;
    background: currentColor;
    opacity: 0.1;
  }

  .view {
    color: var(--blue-color);
  }
  .blue{
    color: green;
  }
  .student {
    color: var(--red-color);
  }
  @media (max-width: 1198.98px) {
    .card-right {
      padding: 1.3rem;
    }
    .card-left {
      margin-right: 0;
    }
  }
  @media (max-width: 575.98px) {
    & {
      width: 100%;
      justify-content: space-between;
    }
    & + & {
      margin-top: 2rem;
    }
  }
`;
