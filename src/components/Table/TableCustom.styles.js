import styled from "styled-components";

export const Table = styled.table`
	border-collapse: collapse;
	width: 100%;
	background-color: var(--white-color);
	font-size: 1.4rem;
	text-align: left;
`;

export const TableTr = styled.tr`
	border-bottom: 1px solid var(--eee-color);
	display: table-row;

	th {
		font-weight: 500;
		padding: 1rem;
	}

	td {
		padding: 1.2rem;
	}
`;

export const TableTh = styled.th`
	position: relative;
	cursor: pointer;

	&::after {
		content: "\\2191";
		position: absolute;
		right: 1rem;
	}

	&::before {
		content: "\\2193";
		position: absolute;
		right: 1.7rem;
	}
`;
