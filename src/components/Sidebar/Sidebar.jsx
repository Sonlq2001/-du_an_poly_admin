import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import { RiDashboardFill } from "react-icons/ri";
import { WrapSidebar, ListMenu } from "./Sidebar.styles";
import LogoFpt from "./../../assets/images/logo.png";

const Sidebar = () => {
	return (
		<WrapSidebar>
			<img src={LogoFpt} alt="" className="img-logo" />

			<ListMenu>
				<li className="item-menu">
					<NavLink exact to="/" className="link-menu" activeClassName="active">
						<RiDashboardFill className="icon-menu" />
						Quản trị
					</NavLink>
				</li>
				<li className="item-menu">
					<NavLink to="/confirm" className="link-menu" activeClassName="active">
						<RiDashboardFill className="icon-menu" />
						Quản sản phẩm
					</NavLink>
				</li>
				<li className="item-menu">
					<NavLink to="/user" className="link-menu" activeClassName="active">
						<RiDashboardFill className="icon-menu" />
						Quản trị user
					</NavLink>
				</li>
			</ListMenu>
		</WrapSidebar>
	);
};

export default memo(Sidebar);
