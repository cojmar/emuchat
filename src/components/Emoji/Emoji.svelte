<style>
	:global(.emoji) {
		font-family: Arial, Helvetica, sans-serif;
		border: none;
		background: transparent;
		cursor: pointer;
		font-size: 1.3em;
		width: 1.5em;
		height: 1.5em;
		padding: 0.2em;
		margin: 0;
	}

	:global(.engine-webkit .emoji) {
		font-family: Twemoji, Arial, Helvetica, sans-serif;
	}

	:global(.engine-gecko .emoji) {
		font-family: Twemoji, Arial, Helvetica, sans-serif;
	}

	:global(.engine-edgehtml .emoji) {
		font-family: Twemoji, Arial, Helvetica, sans-serif;
	}

	:global(.emoji:hover) {
		background: #7d7d7d;
		border-radius: 5px;
	}

	:global(.emoji img) {
		width: 1em;
		height: 1em;
		vertical-align: middle;
	}

	:global(.emoji svg) {
		width: 1em;
		height: 1em;
	}
</style>

<script>
	import {onMount, createEventDispatcher} from 'svelte'
	import Emojis from '../../js/emojis'

	export let showEmojis
	export let emoji

	const dispatch = createEventDispatcher()

	let button
	let replaced

	onMount(() => {
		if (showEmojis && button && !replaced) {
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