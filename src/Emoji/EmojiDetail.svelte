<style>
	:global(.emoji-detail) {
		border-top: 1px solid #7d7d7d;
		/* padding: 0.25em; */
		font-size: 0.8em;
		font-weight: bold;
		height: 3em;
		line-height: 3em;
		text-align: center;

		-moz-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
</style>

<script>
	export let emoji
</script>

<div class="emoji-detail">
	{#if emoji}
		{emoji.emoji} {emoji.name.replace(/_|-/gi, ' ').replace(/female/gi, 'female ').replace(/male/gi, 'male ')}
	{:else}
		Select or search for a emoji
	{/if}
</div>