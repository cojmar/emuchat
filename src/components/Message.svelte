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
	import { fade } from 'svelte/transition';
	import Avatar from './Avatar.svelte'

	export let uid = '0'
	export let nickname = 'me'
	export let message = 'test'
	export let timestamp = '00:00:00'
</script>

<div class="message" transition:fade>
	<p class="text"><span class="timestamp">[{timestamp}]</span> <span title={uid}>[<Avatar uid={uid}/> {nickname}]</span> {message}</p>
</div>