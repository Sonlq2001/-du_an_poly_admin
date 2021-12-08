import React, { memo, useEffect, useCallback } from 'react';

import { ContentDashboard } from './DashboardScreen.styles';
import BoxCard from './../../components/BoxCard/BoxCard';
import BoxMessage from '../../components/BoxMessage/BoxMessage';
import BoxChart from './../../components/BoxChart/BoxChart';
import BoxView from './../../components/BoxView/BoxView';
import TableFeedback from './../../components/TableFeedback/TableFeedback';

import { useDispatch,useSelector } from 'react-redux';
import { DataDashboard } from 'features/dashboard/redux/dashboard.slice';
import Loading from 'components/Loading/Loading';

const DashboardScreen = () => {
  const dispatch  = useDispatch()
  const getData = useCallback(()=>{
    dispatch(DataDashboard())
  },[dispatch])
  useEffect(()=>{
    getData()
  },[dispatch,getData])

  const {data,loading} = useSelector(state=> state.dashboard);
  if(loading && !data){
    return <Loading />;
  }
  return (
    <ContentDashboard>
      <div className="wrap-left">
        <BoxCard  total_products={data ? data.total_products : 0} />
        <BoxChart totalProduct={data}/>
        <TableFeedback feedbacks={data?.feedback ? data.feedback : []} />
      </div>

      <div className="wrap-right">
        <BoxMessage />

        <BoxView />
      </div>
    </ContentDashboard>
  );
};

export default memo(DashboardScreen);
