import React, { memo } from 'react';
import { Title, BoxMain, BoxControl } from './BoxChartProduct.style';
import { Doughnut } from 'react-chartjs-2';
import { dataDoug } from 'features/dashboard/constants/dashboard.constants';
import Select from 'react-select';
const BoxChartProduct = () => {
  return (
    <>
    

      <BoxMain>
      <Title> Thống kê sản phẩm </Title>
        <div className="sort">
          <BoxControl className="box-control">
            <label htmlFor="" className="label-control">
              Cơ Sở
            </label>
            <Select
              className="select-option input-search"
              options={[
                { label: 'Hà Nội ', value: 1 },
                { label: 'Đà Nẵng', value: 2 },
                { label: 'Hồ Chí Minh ', value: 3 },
                { label: 'Cần Thơ', value: 4 },
                { label: 'Tây Nguyên', value: 5 },
              ]}
              placeholder="Tìm theo bộ môn"
            />
          </BoxControl>
          <BoxControl className="box-control">
            <label htmlFor="" className="label-control">
                Năm 
            </label>
            <Select
              className="select-option input-search"
              options={[
                { label: 'Hà Nội ', value: 1 },
                { label: 'Đà Nẵng', value: 2 },
                { label: 'Hồ Chí Minh ', value: 3 },
                { label: 'Cần Thơ', value: 4 },
                { label: 'Tây Nguyên', value: 5 },
              ]}
              placeholder="Năm "
            />
          </BoxControl>
        </div>
        <div className="chart">
          {' '}
          <Doughnut data={dataDoug}> </Doughnut>
        </div>
      </BoxMain>
    </>
  );
};
export default memo(BoxChartProduct);
