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
</style>

<script>
	export let emoji
</script>

<div class="emoji-detail">
	{#if emoji}
		<span class="emoji">{emoji.emoji}</span> {emoji.name.replace(/_|-/gi, ' ').replace(/female/gi, 'female ').replace(/male/gi, 'male ')}
	{:else}
		Select or search for a emoji
	{/if}
</div>