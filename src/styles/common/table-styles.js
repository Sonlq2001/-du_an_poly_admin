import styled from "styled-components";

export const Table = styled.table`
	border-collapse: collapse;
	width: 100%;
	background-color: var(--white-color);
	font-size: 1.4rem;

	thead tr {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}

	thead tr th {
		width: 100%;
	}

	.box-th {
		display: flex;
		align-items: center;
	}

	.box-th-ctr {
		display: flex;
	}
	tr {
		border-bottom: 1px solid var(--eee-color);
	}

	th,
	td {
		padding: 1rem;
		text-align: left;
	}

	th {
		font-weight: 500;
	}

	td {
		padding: 1.3rem 1rem;
	}
`;

export const TableTh = styled.th`
	display: flex;
	align-items: center;
`;
