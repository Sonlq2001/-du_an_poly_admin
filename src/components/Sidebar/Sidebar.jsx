import React, { memo } from 'react';
import { RiDashboardLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import { WrapSidebar, ListMenu, ItemLink } from './Sidebar.styles';
import LogoFpt from 'assets/images/logo.png';
import { sidebars } from 'routes/sidebars.constants';
import { DASHBOARD_PATH } from 'features/dashboard/constants/dashboard.paths';

const Sidebar = () => {
  return (
    <WrapSidebar>
      <Link to="/">
        <img src={LogoFpt} alt="" className="img-logo" />
      </Link>

      <div className="group-sidebar scroll-delayed">
        <div className="content-sidebar ">
          <div>
            <ItemLink
              exact
              to={DASHBOARD_PATH.LIST}
              className="link-menu"
              activeClassName="active"
            >
              <RiDashboardLine className="icon-menu" />
              Quản trị Dashboard
            </ItemLink>
          </div>
          {sidebars.map((sidebar) => (
            <ListMenu key={sidebar.title}>
              {sidebar.title && (
                <div className="title-sidebar">
                  <span className="title-cate">{sidebar?.title ?? ''}</span>
                </div>
              )}
              {sidebar?.items.map((sidebarItem) => {
                return (
                  <li className="item-menu" key={sidebarItem.id}>
                    <ItemLink
                      exact
                      to={sidebarItem.path}
                      className="link-menu"
                      activeClassName="active"
                    >
                      {sidebarItem.icon && (
                        <span className="icon-menu">{sidebarItem.icon}</span>
                      )}
                      {/* <RiDashboardLine /> */}
                      {sidebarItem?.navigationTitle ?? ''}
                    </ItemLink>
                  </li>
                );
              })}
            </ListMenu>
          ))}
        </div>
      </div>
    </WrapSidebar>
  );
};

export default memo(Sidebar);
