<style>
	:global(h3) {
		margin: 0.25em;
		font-size: 0.9em;
		color: #7d7d7d;
	}

	:global(.emoji-list) {
		height: 11.53rem;
		font-size: 15px;
		/* text-align: center; */
		overflow-x: hidden;
		overflow-y: auto;

		-moz-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	:global(.emoji-list::-webkit-scrollbar) {
		width: 5px;
		height: 5px;
	}

	:global(.emoji-list::-webkit-scrollbar-track) {
		background: rgba(34, 33, 33, 0.95);
	}

	:global(.emoji-list::-webkit-scrollbar-thumb) {
		background: rgba(0, 0, 0, 0.38);
	}

	:global(.emoji-list::-webkit-scrollbar-thumb:hover) {
		background: rgba(0, 0, 0, 0.64);
	}

	:global(.emoji-list.tall) {
		height: 14.9rem;
	}
</style>

<script>
	import Emoji from './Emoji.svelte'

	export let showEmojis
	export let name = ''
	export let withTabs = true
	export let emojis
</script>

<h3>{name}</h3>

<div class="emoji-list" class:tall={!withTabs}>
	{#each emojis as emoji}
		<Emoji showEmojis={showEmojis} emoji={emoji} on:emojihover on:emojiclick/>
	{/each}
</div>