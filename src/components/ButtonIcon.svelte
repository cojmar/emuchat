<style>
	:global(.button.button-icon) {
		width: 22px;
		height: 22px;
		padding: 2px;
	}

	:global(.button.button-icon svg.icon) {
		display: inline-block;
		width: 16px;
		height: 16px;
		vertical-align: top;
		overflow: visible;
	}

	:global(.button.button-icon svg.icon path) {
		fill: #7d7d7d;
	}

	:global(.button.button-icon:active svg.icon path) {
		fill: #fff;
	}

	:global(.button.button-icon:focus svg.icon path) {
		fill: #fff;
	}

	:global(.button.button-icon:hover svg.icon path) {
		fill: #fff;
	}
</style>

<script>
	import Button from './Button.svelte'
	import Icon from './Icon.svelte'
	import {faQuestion} from '@fortawesome/free-solid-svg-icons/faQuestion'

	export let icon = faQuestion
</script>

<Button class="button button-icon" on:click {...$$props}>
	<slot><Icon icon={icon}/></slot>
</Button>