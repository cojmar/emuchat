<style>
	:global(.input) {
		/* background-color: #2c2c2c; */
		background-color: rgba(44, 44, 44, 0.9);
		border: 1px solid #7d7d7d;

		font-family: Twemoji, Arial, Helvetica, sans-serif;
		font-size: 100%;
		line-height: 1;
		height: 22px;

		padding: 1px 2px;

		color: #7d7d7d;
		outline: none;

		cursor: text;
	}

	:global(.input:active) {
		/* background-color: #7d7d7d; */
		border-color: #fff;
		color: #fff;
	}

	:global(.input:focus) {
		border-color: #fff;
		color: #fff;
	}

	:global(.input:hover) {
		border-color: #fff;
		color: #fff;
	}

	:global(.input:-ms-input-placeholder) {
		color: #7d7d7d;
		opacity: 1;

		-moz-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	:global(.input::-ms-input-placeholder) {
		color: #7d7d7d;
		opacity: 1;

		-moz-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	:global(.input::-webkit-input-placeholder) {
		color: #7d7d7d;
		opacity: 1;

		-moz-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	:global(.input::placeholder) {
		color: #7d7d7d;
		opacity: 1;

		-moz-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	:global(.input:active::placeholder) {
		color: #fff;
		opacity: 1;
	}
</style>

<script>
	export let value
</script>

<input class="input" type="text" bind:value {...$$props} />