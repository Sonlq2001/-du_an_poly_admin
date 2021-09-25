import React, { memo } from "react";
import { BsThreeDotsVertical, BsTrash } from "react-icons/bs";
import { RiChat3Line } from "react-icons/ri";

import { BoxTitleDashboard } from "./../../../../styles/common/common-styles";
import {
	BoxMessageWait,
	MsgItem,
	MsgAction,
	GroupMessageWait,
} from "./BoxMessage.styles";

const BoxMessage = () => {
	return (
		<BoxMessageWait>
			<BoxTitleDashboard>Tin nhắn chờ</BoxTitleDashboard>

			<GroupMessageWait>
				<MsgItem>
					<div className="msg-content">
						<img
							src="https://i.pinimg.com/564x/1c/c2/40/1cc2408849475c4fe0963566ad520fea.jpg"
							alt=""
							className="msg-img"
						/>
						<div className="msg-box">
							<h4 className="msg-title">Link tải bị lỗi rồi admin ơi</h4>
							<span className="msg-time">09/18/2021</span>
						</div>
					</div>

					<MsgAction>
						<div className="icon-show">
							<BsThreeDotsVertical />
						</div>

						<div className="list-action">
							<div className="icon-action">
								<RiChat3Line />
							</div>
							<div className="icon-action">
								<BsTrash />
							</div>
						</div>
					</MsgAction>
				</MsgItem>

				<MsgItem>
					<div className="msg-content">
						<img
							src="https://i.pinimg.com/564x/1c/c2/40/1cc2408849475c4fe0963566ad520fea.jpg"
							alt=""
							className="msg-img"
						/>
						<div className="msg-box">
							<h4 className="msg-title">
								Link tải bị lỗi rồi admin ơi le quang sonw sfa asdf asdf asdf
								asdfasd fsd f
							</h4>
							<span className="msg-time">09/18/2021</span>
						</div>
					</div>

					<MsgAction>
						<div className="icon-show">
							<BsThreeDotsVertical />
						</div>

						<div className="list-action">
							<div className="icon-action">
								<RiChat3Line />
							</div>
							<div className="icon-action">
								<BsTrash />
							</div>
						</div>
					</MsgAction>
				</MsgItem>

				<MsgItem>
					<div className="msg-content">
						<img
							src="https://i.pinimg.com/564x/1c/c2/40/1cc2408849475c4fe0963566ad520fea.jpg"
							alt=""
							className="msg-img"
						/>
						<div className="msg-box">
							<h4 className="msg-title">Link tải bị lỗi rồi admin ơi</h4>
							<span className="msg-time">09/18/2021</span>
						</div>
					</div>

					<MsgAction>
						<div className="icon-show">
							<BsThreeDotsVertical />
						</div>

						<div className="list-action">
							<div className="icon-action">
								<RiChat3Line />
							</div>
							<div className="icon-action">
								<BsTrash />
							</div>
						</div>
					</MsgAction>
				</MsgItem>

				<MsgItem>
					<div className="msg-content">
						<img
							src="https://i.pinimg.com/564x/1c/c2/40/1cc2408849475c4fe0963566ad520fea.jpg"
							alt=""
							className="msg-img"
						/>
						<div className="msg-box">
							<h4 className="msg-title">Link tải bị lỗi rồi admin ơi</h4>
							<span className="msg-time">09/18/2021</span>
						</div>
					</div>

					<MsgAction>
						<div className="icon-show">
							<BsThreeDotsVertical />
						</div>

						<div className="list-action">
							<div className="icon-action">
								<RiChat3Line />
							</div>
							<div className="icon-action">
								<BsTrash />
							</div>
						</div>
					</MsgAction>
				</MsgItem>
			</GroupMessageWait>
		</BoxMessageWait>
	);
};

export default memo(BoxMessage);
