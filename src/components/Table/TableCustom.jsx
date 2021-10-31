import React from 'react';

import { Table, TableTr, TableTh } from './TableCustom.styles';

export const TableCustom = ({ children, className }) => {
  return <Table className={className}>{children}</Table>;
};

export const Thead = ({ children, className }) => {
  return <thead className={className}>{children}</thead>;
};

export const Tbody = ({ children, className }) => {
  return <tbody className={className}>{children}</tbody>;
};

export const Tr = ({ children, className }) => {
  return <TableTr className={className}>{children}</TableTr>;
};

export const Th = ({ children, sort = false, className, align, onClick }) => {
  let alignTh = '';
  switch (align) {
    case 'right':
      alignTh = 'right';
      break;
    case 'center':
      alignTh = 'center';
      break;
    default:
      alignTh = 'left';
  }
  return sort ? (
    <TableTh
      sort={sort}
      className={className}
      alignText={alignTh}
      onClick={onClick ? onClick : () => {}}
    >
      {children}
    </TableTh>
  ) : (
    <th className={`th-default ${className}`} align={alignTh}>
      {children}
    </th>
  );
};

export const Td = ({ children, className }) => {
  return <td className={className}>{children}</td>;
};
