import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { RiDashboardFill } from 'react-icons/ri';
import { MdCloudUpload } from 'react-icons/md';
import { FaShoppingBag, FaUserFriends } from 'react-icons/fa';
import { GiBookCover } from 'react-icons/gi';

import { WrapSidebar, ListMenu } from './Sidebar.styles';
import LogoFpt from './../../assets/images/logo.png';

const Sidebar = () => {
  return (
    <WrapSidebar>
      <img src={LogoFpt} alt="" className="img-logo" />

      <ListMenu>
        <li className="item-menu">
          <NavLink exact to="/" className="link-menu" activeClassName="active">
            <RiDashboardFill className="icon-menu" />
            Quản trị Dashboard
          </NavLink>
        </li>
        <li className="item-menu">
          <NavLink to="/confirm" className="link-menu" activeClassName="active">
            <FaShoppingBag className="icon-menu" />
            Quản sản phẩm
          </NavLink>
        </li>
        <li className="item-menu">
          <NavLink to="/user" className="link-menu" activeClassName="active">
            <FaUserFriends className="icon-menu" />
            Quản trị user
          </NavLink>
        </li>
        <li className="item-menu">
          <NavLink
            to="/specialized"
            className="link-menu"
            activeClassName="active"
          >
            <GiBookCover className="icon-menu" />
            Quản trị chuyên ngành
          </NavLink>
        </li>
        <li className="item-menu">
          <NavLink
            to="/upload-excel"
            className="link-menu"
            activeClassName="active"
          >
            <MdCloudUpload className="icon-menu" />
            Nhập điểm
          </NavLink>
        </li>

        <li className="item-menu">
          <NavLink to="/subject" className="link-menu" activeClassName="active">
            <RiDashboardFill className="icon-menu" />
            Quản trị môn học
          </NavLink>
        </li>
      </ListMenu>
    </WrapSidebar>
  );
};

export default memo(Sidebar);
