import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const WrapSidebar = styled.div`
  width: 28rem;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  box-shadow: 0px 0px 28px 0px rgb(82 63 105 / 8%);
  border: 1px solid rgb(82 63 105 / 8%);
  padding: 2rem 5px 2rem 2rem;
  height: 100vh;
  .img-logo {
    width: 14rem;
  }
  .group-sidebar {
    position: relative;
    height: 100%;
    padding: 0 1rem 6rem 0;
    margin-top: 2.5rem;
    visibility: hidden;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 5px;
      height: 5rem;
    }
    &::-webkit-scrollbar-thumb {
      background: var(--eee-color);
      border-radius: 10px;
    }
  }
  .content-sidebar {
    margin-bottom: 2rem;
  }
  .content-sidebar,
  .group-sidebar:hover,
  .group-sidebar:focus {
    visibility: visible;
  }
  .scroll-delayed:hover {
    transition: visibility 0.2s;
  }
  @media (max-width: 991.98px) {
    & {
      width: 8rem;
      padding: 2rem 2px 2rem 5px;
    }
    .group-sidebar {
      padding-right: 3px;
      ::-webkit-scrollbar {
        width: 3px;
        height: 3rem;
      }
    }
  }
  @media (max-width: 575.98px) {
    & {
      width: 63%;
      padding: 2rem 2px 2rem 5px;
      background-color: var(--white-color);
      z-index: 100;
      transform: translateX(-100%);
      transition: ease-in-out 0.3s;
    }
    &.active {
      transform: translateX(0);
    }
    .img-logo {
      width: 12rem;
    }
  }
`;
export const SidebarHeader = styled.div`
  position: relative;
  .close-bar {
    display: none;
    position: absolute;
    font-size: 3rem;
    cursor: pointer;
    right: 0;
    top: 0;
    color: var(--blue-color);
    &:hover {
      opacity: 0.7;
    }
  }
  @media (max-width: 575.98px) {
    .close-bar {
      display: block;
    }
  }
`;
export const ListMenu = styled.ul`
  margin-top: 1.5rem;
  .item-menu + .item-menu {
    margin-top: 1rem;
  }
  .title-sidebar {
    font-size: 1.4rem;
    margin: 1.5rem 0;
    position: relative;
    color: var(--txt-sidebar);
  }
  .title-sidebar:after {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    z-index: -1;
    width: 100%;
    height: 0.5px;
    background-color: var(--txt-sidebar);
  }
  .title-cate {
    background-color: var(--white-color);
    padding-right: 1rem;
  }
  @media (max-width: 991.98px) {
    .title-sidebar::after {
      display: none;
    }
    .title-sidebar {
      text-align: center;
      border-bottom: 1px solid var(--txt-sidebar);
      padding-bottom: 5px;
    }
    .title-cate {
      padding-right: 0;
    }
  }
  @media (max-width: 575.98px) {
    .title-sidebar::after {
      display: block;
    }
    .title-sidebar {
      text-align: left;
      border-bottom: none;
      padding-bottom: 0;
    }
    .title-cate {
      padding-right: 5px;
    }
  }
`;
export const ItemLink = styled(NavLink)`
  display: flex;
  align-items: center;
  color: var(--txt-sidebar);
  padding: 1.4rem;
  border-radius: 5px;
  font-size: 1.5rem;
  font-weight: 500;
  transition: linear 0.3s;
  &:hover {
    color: var(--blue-color);
    background-color: var(--blue2-color);
  }
  &.active {
    color: var(--blue-color);
    background-color: var(--blue2-color);
  }
  & .icon-menu {
    margin-right: 1.5rem;
  }
  @media (max-width: 991.98px) {
    & {
      padding: 2rem 0;
      justify-content: center;
    }
    .name-menu {
      display: none;
    }
    .icon-menu {
      margin-right: 0;
    }
  }
  @media (max-width: 575.98px) {
    & {
      padding: 1.5rem 1rem;
      justify-content: flex-start;
      font-size: 1.4rem;
    }
    .name-menu {
      display: block;
    }
    .icon-menu {
      margin-right: 1rem;
    }
  }
`;
