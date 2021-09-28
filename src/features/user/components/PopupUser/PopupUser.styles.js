import styled from "styled-components";

export const GroupField = styled.div`
	& + & {
		margin-top: 1.5rem;
	}

	.label-field {
		font-size: 1.4rem;
	}

	.content-field {
		font-size: 1.4rem;
		margin-top: 5px;
		color: var(--aaa-color);
	}
`;

export const GroupRole = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	margin-top: -1rem;
`;
