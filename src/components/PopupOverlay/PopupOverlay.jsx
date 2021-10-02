import React from "react";
import { BiSave } from "react-icons/bi";

import {
	GroupPopupOverlay,
	ContentPopupOverlay,
	ActionPopup,
	ContentPopup,
} from "./PopupOverlay.styles";
import { Button } from "./../../components/Button/Button";

const PopupOverlay = ({ open, setOpen, children, title }) => {
	return (
		<>
			<GroupPopupOverlay
				className={`${open ? "active" : ""}`}
				onClick={() => setOpen(!open)}
			>
				<ContentPopupOverlay
					className={`${open ? "active" : ""}`}
					onClick={(e) => e.stopPropagation()}
				>
					<h3 className="title-popup">{title}</h3>

					<ContentPopup>{children}</ContentPopup>

					<ActionPopup>
						<Button type="submit" icon={<BiSave />} size="small">
							Lưu
						</Button>
						<Button color="danger" onClick={() => setOpen(!open)} size="small">
							Hủy
						</Button>
					</ActionPopup>
				</ContentPopupOverlay>
			</GroupPopupOverlay>
		</>
	);
};

export default PopupOverlay;
