import styled from "styled-components";

export const ButtonCustom = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: ${({ size }) => size.padding};
	border-radius: 5px;
	background-color: ${({ color, disabled }) => (disabled ? "#eee" : color)};
	color: ${({ disabled }) => (disabled ? "#6666" : "var(--white-color)")};
	font-size: ${({ size }) => size.fontSize};
	border: none;
	cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};

	& + & {
		margin-left: 1rem;
	}

	&:hover {
		opacity: ${({ disabled }) => (disabled ? 1 : 0.9)};
	}

	button {
		border: none;
	}

	a {
		color: var(--white-color);
		display: inline-block;
	}

	.icon-btn {
		display: inline-block;
		transform: translateY(2px);
		margin-right: 5px;
	}

	.icon-btn.active {
		margin: 0;
	}
`;
