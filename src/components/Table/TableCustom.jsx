import React from "react";

import { Table, TableTr, TableTh } from "./TableCustom.styles";

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

export const Th = ({ children, sort, className }) => {
	const isSort = sort === undefined ? true : false;
	return isSort ? (
		<TableTh sort={isSort} className={className}>
			{children}
		</TableTh>
	) : (
		<th className={`th-default ${className}`}>{children}</th>
	);
};

export const Td = ({ children, className }) => {
	return <td className={className}>{children}</td>;
};
