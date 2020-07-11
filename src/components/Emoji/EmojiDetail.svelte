<style>
	:global(.emoji-detail) {
		border-top: 1px solid #7d7d7d;
		font-size: 0.8em;
		height: 3em;
		line-height: 3em;
		text-align: center;
		overflow: hidden;

		-moz-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	:global(.emoji-detail .emoji) {
		font-size: 1.6em;
		vertical-align: middle;
	}

	:global(.emoji-detail .emoji img) {
		width: 22px;
		height: 22px;
		vertical-align: text-top;
	}

	:global(.emoji-detail .emoji svg) {
		width: 22px;
		height: 22px;
		vertical-align: top;
	}
</style>

<script>
	import {onMount} from 'svelte'
	import Emojis from '../../js/emojis'

	export let emoji

	let mounted
	let span

	$: if (mounted && span) span = Emojis.replace(span)

	onMount(() => {
		mounted = true
	})
</script>

<div class="emoji-detail">
	{#if emoji}
		<span class="emoji" bind:this={span}>{emoji.emoji}</span> {emoji.name.replace(/_|-/gi, ' ').replace(/female/gi, 'female ').replace(/male/gi, 'male ')}
	{:else}
		Select or search for a emoji
	{/if}
</div>