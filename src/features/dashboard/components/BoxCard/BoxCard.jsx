import React, { memo } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { AiFillEye } from "react-icons/ai";

import { ListBoxCard, ItemCard } from "./BoxCard.styles";

const BoxCard = () => {
	return (
		<ListBoxCard>
			<ItemCard>
				<div className="card-left">
					<div className="card-total">750</div>
					<div className="card-title">Sản phẩm</div>
				</div>
				<div className="card-right">
					<FaShoppingBag />
				</div>
			</ItemCard>

			<ItemCard>
				<div className="card-left">
					<div className="card-total">750</div>
					<div className="card-title">Lượt truy cập</div>
				</div>
				<div className="card-right">
					<AiFillEye />
				</div>
			</ItemCard>

			<ItemCard>
				<div className="card-left">
					<div className="card-total">750</div>
					<div className="card-total">Sản phẩm</div>
				</div>
				<div className="card-right">
					<FaShoppingBag />
				</div>
			</ItemCard>
		</ListBoxCard>
	);
};

export default memo(BoxCard);
