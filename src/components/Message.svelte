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

	:global(.message img) {
		width: 30px;
		height: 30px;
		padding: 1px;
		vertical-align: middle;
	}

	:global(.message svg) {
		width: 30px;
		height: 30px;
		padding: 1px;
		vertical-align: middle;
	}

	:global(.message .nickname img) {
		width: 16px;
		height: 16px;
		padding: 1px;
		vertical-align: middle;
	}

	:global(.message .nickname svg) {
		width: 16px;
		height: 16px;
		padding: 1px;
		vertical-align: middle;
	}
</style>

<script>
	import {onMount} from 'svelte'
	import Emojis from '../js/emojis'
	import Avatar from './Avatar.svelte'

	export let avatars
	export let timestamp
	export let uid
	export let nickname
	export let text
	export let status

	let nicknameSpan
	let textSpan

	onMount(() => {
		if (nicknameSpan) nicknameSpan = Emojis.replace(nicknameSpan)
		if (textSpan) textSpan = Emojis.replace(textSpan)
	})
</script>

<div class="message">
	<p class="text">
		<span class="timestamp">[{timestamp}]</span>
		<span title={uid}>{#if avatars}<Avatar uid={uid}/> {/if}[<span class="nickname" bind:this={nicknameSpan}>{nickname}</span>]</span>
		{#if status}<span class="status">{@html status}</span>{/if}
		{#if text}<span class="text" bind:this={textSpan}>{text}</span>{/if}
	</p>
</div>