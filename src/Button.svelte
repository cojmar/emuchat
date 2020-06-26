<style>
	:global(.button) {
		/* background-color: #2c2c2c; */
		background-color: rgba(44, 44, 44, 0.9);
		border: 1px solid #7d7d7d;

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

	:global(.button:disabled) {
		/* background-color: #2c2c2c; */
		background-color: rgba(44, 44, 44, 0.9);
		outline: 1px solid #4c4c4c;
		outline-offset: -1px;
		border-color: #4c4c4c;
		color: #4c4c4c;

		cursor: not-allowed;
	}
</style>

<script>
</script>

<button class="button" type="button" {...$$props}>
	<slot />
</button>