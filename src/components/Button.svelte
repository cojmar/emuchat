<style>
	:global(.button) {
		background-color: #2c2c2c;
		border: 1px solid #7d7d7d;
		border-radius: 0;

		font-family: Arial, Helvetica, sans-serif;
		font-size: 100%;
		line-height: 1;

		padding: 2px 6px;

		color: #7d7d7d;
		outline: none;

		-moz-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;

		cursor: pointer;
	}

	:global(.engine-webkit .button) {
		font-family: Twemoji, Arial, Helvetica, sans-serif;
	}

	:global(.engine-gecko .button) {
		font-family: Twemoji, Arial, Helvetica, sans-serif;
	}

	:global(.engine-edgehtml .button) {
		font-family: Twemoji, Arial, Helvetica, sans-serif;
	}

	:global(.button:active) {
		background-color: #7d7d7d;
		outline: 1px solid #fff;
		outline-offset: -1px;
		border-color: #fff;
		color: #fff;
	}

	:global(.button:focus) {
		outline: 1px solid #fff;
		outline-offset: -1px;
		border-color: #fff;
		color: #fff;
	}

	:global(.button:hover) {
		outline: 1px solid #fff;
		outline-offset: -1px;
		border-color: #fff;
		color: #fff;
	}
</style>

<button class="button" type="button" on:click {...$$props}>
	<slot/>
</button>