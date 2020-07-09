<style>
	:global(.message) {
		margin: 7px 0;
	}

	:global(.message p) {
		display: inline-block;
		border-radius: 5px;
		padding: 5px;
		margin: 0;
		background-color: #4c4c4c;
	}
</style>

<script>
	import Avatar from './Avatar.svelte'

	export let avatars
	export let timestamp
	export let uid
	export let nickname
	export let text
</script>

<div class="message">
	<p class="text"><span class="timestamp">[{timestamp}]</span> <span title={uid}>{#if avatars}<Avatar uid={uid}/> {/if}[{nickname}]</span> {text}</p>
</div>