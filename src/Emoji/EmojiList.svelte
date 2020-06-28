<style>
	h3 {
		margin: 0.25em;
		font-size: 0.9em;
		color: #7d7d7d;
	}

	.svelte-emoji-picker__emoji-list {
		height: 11.53rem;
		font-size: 14px;
		overflow-x: hidden;
		overflow-y: auto;
	}

	.svelte-emoji-picker__emoji-list::-webkit-scrollbar {
		width: 5px;
		height: 5px;
	}

	.svelte-emoji-picker__emoji-list::-webkit-scrollbar-track {
		background: rgba(34, 33, 33, 0.95);
	}

	.svelte-emoji-picker__emoji-list::-webkit-scrollbar-thumb {
		background: rgba(0, 0, 0, 0.38);
	}

	.svelte-emoji-picker__emoji-list::-webkit-scrollbar-thumb:hover {
		background: rgba(0, 0, 0, 0.64);
	}

	.svelte-emoji-picker__emoji-list.tall {
		height: 14.9rem;
	}
</style>

<script>
	import Emoji from './Emoji.svelte'

	export let name = ''
	export let withTabs = true
	export let emojis
</script>

<h3>{name}</h3>

<div class="svelte-emoji-picker__emoji-list" class:tall={!withTabs}>
	{#each emojis as emoji}
		<Emoji emoji={emoji} on:emojihover on:emojiclick/>
	{/each}
</div>