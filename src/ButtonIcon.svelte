<style>
	:global(.button.button-icon) {
		padding: 2px;
	}

	:global(.button.button-icon svg) {
		width: 16px;
		height: 16px;
		vertical-align: top;
	}

	:global(.button.button-icon svg path) {
		fill: #7d7d7d;
	}

	:global(.button.button-icon:active svg path) {
		fill: #fff;
	}

	:global(.button.button-icon:focus svg path) {
		fill: #fff;
	}

	:global(.button.button-icon:hover svg path) {
		fill: #fff;
	}

	:global(.button.button-icon:disabled svg path) {
		fill: #4c4c4c;
	}
</style>

<script>
	import Button from './Button.svelte'
</script>

<Button class="button button-icon" {...$$props}>
	<slot />
</Button>