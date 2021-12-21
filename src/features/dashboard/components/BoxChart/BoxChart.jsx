import React, { useState, useEffect, memo } from 'react';
import { Bar } from 'react-chartjs-2';
import { genData, options } from './../../constants/dashboard.constants';

import { BoxTitleDashboard } from 'styles/common/common-styles';
import { BoxChartMain } from './BoxChart.styles';

const BoxChart = ({totalProduct}) => {
  const [data, setData] = useState(genData());
  useEffect(() => {
    setData(genData(totalProduct?.anuary_april,totalProduct?.april_august,totalProduct?.august_december));
  }, [totalProduct]);

  return (
    <BoxChartMain>
      <BoxTitleDashboard>Thống kê sản phẩm theo giai đoạn  </BoxTitleDashboard>
      <Bar data={data} options={options} />
    </BoxChartMain>
  );
};

export default memo(BoxChart);
