import React from "react";

import { Table, TableTr, TableTh } from "./TableCustom.styles";

export const TableCustom = ({ children }) => {
	return <Table>{children}</Table>;
};

export const Thead = ({ children }) => {
	return <thead>{children}</thead>;
};

export const Tbody = ({ children }) => {
	return <tbody>{children}</tbody>;
};

export const Tr = ({ children }) => {
	return <TableTr>{children}</TableTr>;
};

export const Th = ({ children, sort }) => {
	const isSort = sort === undefined ? true : false;
	return isSort ? (
		<TableTh sort={isSort}>{children}</TableTh>
	) : (
		<th className="th-default">{children}</th>
	);
};

export const Td = ({ children }) => {
	return <td>{children}</td>;
};
