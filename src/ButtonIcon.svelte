<style>
	:global(.button.button-icon) {
		width: 22px;
		height: 22px;
		padding: 2px;
	}

	:global(.button.button-icon svg) {
		display: inline-block;
		width: 16px;
		height: 16px;
		vertical-align: top;
		overflow: visible;
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

	export let icon

	let path = typeof icon !== 'undefined' ? icon.icon[4] : ''
	let viewBox = typeof icon !== 'undefined' ? '0 0 ' + icon.icon[0] + ' ' + icon.icon[1] : ''
</script>

<Button class="button button-icon" {...$$props} on:click>
	<slot>
		<svg aria-hidden="true" class="icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="{viewBox}">
			<path fill="currentColor" d="{path}"/>
		</svg>
	</slot>
</Button>