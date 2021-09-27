import styled from "styled-components";

export const ButtonCustom = styled.button`
	display: inline-block;
	padding: 8px;
	border-radius: 5px;
	background-color: ${({ color }) => color};
	cursor: pointer;
	color: var(--white-color);
	font-size: 1.4rem;
	border: none;

	& + & {
		margin-left: 1rem;
	}

	&:hover {
		opacity: 0.9;
	}

	button {
		border: none;
	}

	a {
		color: var(--white-color);
		display: inline-block;
	}
`;
