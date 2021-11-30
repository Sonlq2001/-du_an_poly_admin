import React, { memo } from 'react';

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

const TableFeedback = ({feedbacks}) => {
  let data =[];
  for(let item in feedbacks){
         data.push(feedbacks[item])
  }
  console.log(data)
  return (
    <WrapTable>
      <BoxTitleDashboard>Phản hồi mới nhất</BoxTitleDashboard>
      <div className="group-table">
        <TableCustom>
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th className="fix-sort">Người đánh giá</Th>
              <Th>Nội dung</Th>
              <Th>Thời gian</Th>
            </Tr>
          </Thead>
          <Tbody>
           {data.map((item)=>{
               return (
                <Tr key={item.id}>
                  <Td>{item.id}</Td>
                  <Td>{item.email}</Td>
                  <Td>{item.content}</Td>
                  <Td>{item.created_at.split('T',1)}</Td>
                </Tr> 
           )})}
          </Tbody>
        </TableCustom>
      </div>
    </WrapTable>
  );
};

export default memo(TableFeedback);
