import React, { memo } from 'react';
import moment from 'moment';

import { WrapTable } from './TableFeedback.styles';
import { BoxTitleDashboard } from 'styles/common/common-styles';
import {
  TableCustom,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from 'components/Table/TableCustom';
import { useSortableData } from 'helpers/sortingTable/sortingTable';

const TableFeedback = ({ feedbacks }) => {
  let data = [];
  for (let item in feedbacks) {
    data.push(feedbacks[item]);
  }

  const { dataSort, requestSort } = useSortableData(data);

  return (
    <WrapTable>
      <BoxTitleDashboard>Phản hồi mới nhất</BoxTitleDashboard>
      <div className="group-table">
        <TableCustom>
          <Thead>
            <Tr>
              <Th sort onClick={() => requestSort('id')}>
                #
              </Th>
              <Th
                className="fix-sort"
                sort
                onClick={() => requestSort('email')}
              >
                Người đánh giá
              </Th>
              <Th sort onClick={() => requestSort('content')}>
                Nội dung
              </Th>
              <Th sort onClick={() => requestSort('created_at')}>
                Thời gian
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {dataSort?.map((item) => {
              return (
                <Tr key={item?.id}>
                  <Td>{item?.id}</Td>
                  <Td>{item?.email}</Td>
                  <Td>{item?.content}</Td>
                  <Td>
                    {moment(item?.created_at).format('YYYY-MM-DD HH:mm:ss')}
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </TableCustom>
      </div>
    </WrapTable>
  );
};

export default memo(TableFeedback);
