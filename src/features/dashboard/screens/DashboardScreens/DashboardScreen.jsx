import React, { memo, useEffect, useCallback } from 'react';

import { ContentDashboard } from './DashboardScreen.styles';
import BoxCard from './../../components/BoxCard/BoxCard';
import BoxMessage from '../../components/BoxMessage/BoxMessage';
import BoxChart from './../../components/BoxChart/BoxChart';
import BoxView from './../../components/BoxView/BoxView';
import TableFeedback from './../../components/TableFeedback/TableFeedback';

import { useDispatch, useSelector } from 'react-redux';
import { getDataDashboard } from 'features/dashboard/redux/dashboard.slice';
import Loading from 'components/Loading/Loading';

const DashboardScreen = () => {
  const dispatch = useDispatch();
  const getData = useCallback(() => {
    dispatch(getDataDashboard());
  }, [dispatch]);

  useEffect(() => {
    getData();
  }, [dispatch, getData]);

  const {
    dataFeedbackNew,
    isDataDashboardLoading,
    dataViewChart,
    totalComment,
    total_users
  } = useSelector((state) => ({
    isDataDashboardLoading: state.dashboard?.isDataDashboardLoading,
    dataFeedbackNew: state.dashboard?.dataFeedbackNew,
    dataViewChart: state.dashboard?.dataViewChart,
    totalComment: state.dashboard?.totalComment,
    total_users: state.dashboard?.total_users,
  }));

  if (isDataDashboardLoading) {
    return <Loading />;
  }

  return (
    <ContentDashboard>
      <div className="wrap-left">
        <BoxCard />
        <BoxChart totalProduct={dataViewChart} />
        <TableFeedback feedbacks={dataFeedbackNew ?? []} />
      </div>

      <div className="wrap-right">
        <BoxMessage />

        <BoxView totalComment={totalComment} total_users={total_users} />
      </div>
    </ContentDashboard>
  );
};

export default memo(DashboardScreen);
