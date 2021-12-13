import React, { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RiDashboardLine, RiSettings4Line } from 'react-icons/ri';
import { BsBag, BsChat, BsPersonPlus } from 'react-icons/bs';
import { BiSitemap, BiBookAlt } from 'react-icons/bi';
import { FiBookOpen, FiUsers, FiType } from 'react-icons/fi';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { GiMagnifyingGlass } from 'react-icons/gi';
import { MdMailOutline } from 'react-icons/md';

import { WrapSidebar, ListMenu, ItemLink } from './Sidebar.styles';
import LogoFpt from 'assets/images/logo.png';
import { DASHBOARD_PATH } from 'features/dashboard/constants/dashboard.paths';
import { getPermissions } from 'features/auth/redux/auth.slice';
import { labelSidebar, labelIcons } from 'constants/value-string.constants';

const Sidebar = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const routesPermission = JSON.parse(
      JSON.parse(localStorage.getItem('persist:auth'))?.permission
    );
    dispatch(getPermissions(routesPermission));
  }, [dispatch]);

  const { listPermission } = useSelector((state) => ({
    listPermission: state.auth?.permission,
  }));

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
          {listPermission &&
            listPermission.map((sidebar, index) => {
              if (sidebar?.items.length > 0) {
                let titleGroup = null;
                switch (sidebar.title) {
                  case 1:
                    titleGroup = labelSidebar.manager;
                    break;
                  case 2:
                    titleGroup = labelSidebar.position;
                    break;
                  case 3:
                    titleGroup = labelSidebar.import;
                    break;
                  case 4:
                    titleGroup = labelSidebar.setting;
                    break;
                  default:
                    break;
                }
                return (
                  <ListMenu key={index}>
                    {sidebar?.title && (
                      <div className="title-sidebar">
                        <span className="title-cate">{titleGroup}</span>
                      </div>
                    )}
                    {sidebar?.items.map((sidebarItem, index) => {
                      let componentIcon = null;
                      const nameIcon = sidebarItem?.items[0]?.icon
                        .slice(1, sidebarItem?.items[0].icon.length - 2)
                        .trim();
                      switch (nameIcon) {
                        case labelIcons.bsBag:
                          componentIcon = <BsBag />;
                          break;
                        case labelIcons.biSitemap:
                          componentIcon = <BiSitemap />;
                          break;
                        case labelIcons.fiBookOpen:
                          componentIcon = <FiBookOpen />;
                          break;
                        case labelIcons.aiOutlineCloudUpload:
                          componentIcon = <AiOutlineCloudUpload />;
                          break;
                        case labelIcons.riSettings4Line:
                          componentIcon = <RiSettings4Line />;
                          break;
                        case labelIcons.fiUsers:
                          componentIcon = <FiUsers />;
                          break;
                        case labelIcons.giMagnifyingGlass:
                          componentIcon = <GiMagnifyingGlass />;
                          break;
                        case labelIcons.fiType:
                          componentIcon = <FiType />;
                          break;
                        case labelIcons.bsChat:
                          componentIcon = <BsChat />;
                          break;
                        case labelIcons.biBookAlt:
                          componentIcon = <BiBookAlt />;
                          break;
                        case labelIcons.mdMailOutline:
                          componentIcon = <MdMailOutline />;
                          break;
                        case labelIcons.bsPersonPlus:
                          componentIcon = <BsPersonPlus />;
                          break;
                        default:
                          break;
                      }

                      return (
                        sidebarItem?.items.length !== 0 && (
                          <li className="item-menu" key={index}>
                            <ItemLink
                              exact
                              to={
                                sidebarItem?.items.length === 1
                                  ? sidebarItem?.items[0]?.url
                                  : sidebarItem?.items[0]?.url
                              }
                              className="link-menu"
                              activeClassName="active"
                            >
                              <span className="icon-menu">{componentIcon}</span>
                              {sidebarItem?.items[0]?.title}
                            </ItemLink>
                          </li>
                        )
                      );
                    })}
                  </ListMenu>
                );
              }
              return null;
            })}
        </div>
      </div>
    </WrapSidebar>
  );
};

export default memo(Sidebar);
