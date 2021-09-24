import React, { memo } from "react";

import { ContentDashboard } from "./Dashboard.styles";
import BoxCard from "./../../components/BoxCard/BoxCard";

const DashboardScreen = () => {
	return (
		<ContentDashboard>
			<div className="wrap-left">
				<BoxCard />
			</div>

			<div className="wrap-right">col right</div>
		</ContentDashboard>
	);
};

export default memo(DashboardScreen);
