<style>
	:global(button.emoji) {
		border: none;
		background: transparent;
		cursor: pointer;
		font-size: 1.3em;
		width: 1.5em;
		height: 1.5em;
		padding: 0.2em;
		margin: 0;
	}

	:global(button.emoji:hover) {
		background: #7d7d7d;
		border-radius: 5px;
	}
</style>

<script>
	import {onMount, createEventDispatcher} from 'svelte'
	import Emojis from '../../js/emojis'

	export let emoji

	const dispatch = createEventDispatcher()

	let button
	let replaced

	onMount(() => {
		if (button && !replaced) {
			button = Emojis.replace(button)
			replaced = true
		}
	})

	function onClick() {
		dispatch('emojiclick', emoji)
	}

	function onMouseOver() {
		dispatch('emojihover', emoji)
	}

	function onMouseOut() {
		dispatch('emojihover', null)
	}
</script>

<button class="emoji" on:mouseover={onMouseOver} on:mouseout={onMouseOut} on:click={onClick} type="button" bind:this={button}>{emoji.emoji}</button>