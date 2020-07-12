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
		vertical-align: middle;
	}

	:global(.emoji-detail .emoji svg) {
		width: 22px;
		height: 22px;
		vertical-align: middle;
	}
</style>

<script>
	import Emoji from './Emoji.svelte'

	export let showEmojis
	export let currentEmoji
</script>

<div class="emoji-detail">
	{#if currentEmoji}
		<Emoji showEmojis={showEmojis} emoji={currentEmoji}/> {currentEmoji.name.replace(/_|-/gi, ' ').replace(/female/gi, 'female ').replace(/male/gi, 'male ')}
	{:else}
		Select or search for a emoji
	{/if}
</div>