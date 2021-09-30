import styled from "styled-components";

export const GroupUpload = styled.div`
	position: absolute;
	top: 30%;
	left: 50%;
	transform: translateY(-50%, -50%);
	text-align: center;

	.title-upload {
		font-size: 1.8rem;
		font-weight: 500;
	}

	.helper-upload {
		font-size: 1.2rem;
		font-style: italic;
	}

	.button-upload {
		margin-top: 3rem;
		display: flex;
		justify-content: center;
	}
`;

export const BoxUpload = styled.div`
	margin: 2rem 0 1rem 0;
	width: 100%;
	.label-upload {
		display: block;
		padding: 2rem 5rem;
		background-color: rgba(52 152 219 / 11%);
		border-radius: 1rem;
		border: 1px dashed var(--ddd-color);
		cursor: pointer;
	}

	.input-upload {
		display: none;
	}

	.icon-upload {
		font-size: 5rem;
	}

	.text-upload {
		font-size: 1.3rem;
	}

	.label-upload:hover .icon-upload,
	.label-upload:hover .text-upload {
		color: var(--blue-color);
	}
`;
