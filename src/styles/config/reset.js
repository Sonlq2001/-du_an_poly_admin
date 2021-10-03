const ResetCss = () => {
  return /*css*/ `
		* {
			margin: 0;
			padding: 0;
			box-sizing: border-box;
		}

		html {
			font-size: 62.5%;
		 	font-family: 'Roboto', sans-serif;
			 line-height: 1.6rem;
			 color: var(--txt-color);
		}

		ul {
			list-style: none;
		}

		a {
			text-decoration: none;
		}

		button,
		input,
		textarea {
			outline: none;
		}

		button {
			cursor: pointer;
		}

		img {
			max-width: 100%;
			height: auto;
			vertical-align: middle;
		}
	`;
};

export default ResetCss;
