import styled from "styled-components";

export const BoxCheckbox = styled.div`
	display: flex;
	align-items: center;
	margin-top: 1.5rem;

	& + & {
		margin-left: 2rem;
	}

	.label-filed {
		font-size: 1.4rem;
		margin-right: 1rem;
		cursor: pointer;
	}

	.checkbox-field {
		appearance: none;
		position: relative;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		height: 2rem;
		width: 2rem;
		transition: all 0.15s ease-in-out 0s;
		background-color: var(--eee-color);
		border: none;
		cursor: pointer;
		display: inline-block;
		border-radius: 5px;
	}

	.checkbox-field:checked::after {
		content: "";
		animation: click-wave 0.75s;
		opacity: 0.5;
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		z-index: 10;
	}

	@keyframes click-wave {
		0% {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			opacity: 0.35;
			border-radius: 5px;
			background-color: var(--blue-color);
		}
		100% {
			width: 100%;
			height: 100%;
			background-color: var(--blue-color);
			opacity: 0;
		}
	}

	.checkbox-field:checked::before {
		content: "\\2713";
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--blue-bold-color);
	}
`;
