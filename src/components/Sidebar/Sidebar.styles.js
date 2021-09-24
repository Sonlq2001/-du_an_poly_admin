import styled from "styled-components";

export const WrapSidebar = styled.div`
	width: 28rem;
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	box-shadow: 0px 0px 28px 0px rgb(82 63 105 / 8%);
	border: 1px solid rgb(82 63 105 / 8%);
	padding: 2rem;
	height: 100vh;
	.img-logo {
		width: 14rem;
	}
`;

export const ListMenu = styled.ul`
	margin-top: 2rem;

	.item-menu + .item-menu {
		margin-top: 1rem;
	}

	.link-menu {
		display: flex;
		align-items: center;
		color: var(--txt-sidebar);
		padding: 1.4rem;
		border-radius: 5px;
		font-size: 1.5rem;
		font-weight: 500;
		transition: linear 0.3s;
	}

	.link-menu:hover {
		color: var(--blue-color);
		background-color: var(--blue2-color);
	}

	.link-menu.active {
		color: var(--blue-color);
		background-color: var(--blue2-color);
	}

	.icon-menu {
		margin-right: 1.5rem;
	}
`;
