import styled from "styled-components";

export const WrapTable = styled.div`
	background-color: var(--white-color);
	border-radius: 5px;
	padding: 1.5rem;
	margin-top: 2rem;
`;

export const Table = styled.table`
	&,
	td,
	th {
		border-bottom: 1px solid var(--eee-color);
	}

	& {
		border-collapse: collapse;
		width: 100%;
		margin-top: 2rem;
	}

	th {
		padding: 1rem;
		font-size: 1.4rem;
		font-weight: 500;
		white-space: nowrap;
	}

	td {
		padding: 1rem;
		font-size: 1.3rem;
	}

	tbody tr:nth-child(even) {
		background-color: var(--bg-tr-table);
	}

	tbody tr:hover {
		background-color: var(--blue3-color);
		cursor: context-menu;
	}
`;
