import React, { memo, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { GrTopCorner } from "react-icons/gr";
import { BiLogOut } from "react-icons/bi";
import OutsideClickHandler from "react-outside-click-handler";

import {
	WrapNavbar,
	NavbarLeft,
	NavbarRight,
	NavbarSearch,
	NavbarAction,
	NavNotification,
	NavControl,
	ListAction,
} from "./Navbar.styles";

const Navbar = () => {
	const [actionUser, setActionUser] = useState(false);

	return (
		<WrapNavbar>
			<NavbarLeft>
				<h1 className="title-admin">Dashboard</h1>
			</NavbarLeft>
			<NavbarRight>
				<NavbarSearch>
					<input type="text" className="main-search" placeholder="Search" />
					<span className="icon-search">
						<BiSearchAlt2 />
					</span>
				</NavbarSearch>

				<NavbarAction>
					<NavNotification>
						<span className="icon-notification">
							<IoMdNotificationsOutline />
						</span>
						<span className="total-notification">0</span>
					</NavNotification>

					<NavControl>
						<div className="box-control">
							<img
								src="https://i.pinimg.com/564x/1c/c2/40/1cc2408849475c4fe0963566ad520fea.jpg"
								alt=""
								className="avatar-user"
							/>
							le quang son
							<div
								className="icon-drop"
								onClick={() => setActionUser(!actionUser)}
							>
								<GrTopCorner />
							</div>
						</div>
						<OutsideClickHandler onOutsideClick={() => setActionUser(false)}>
							<ListAction className={`${actionUser ? "active" : ""}`}>
								<li className="item-action">
									<a href="!#" className="link-action">
										<BiLogOut className="icon-action" />
										Logout
									</a>
								</li>
							</ListAction>
						</OutsideClickHandler>
					</NavControl>
				</NavbarAction>
			</NavbarRight>
		</WrapNavbar>
	);
};

export default memo(Navbar);
