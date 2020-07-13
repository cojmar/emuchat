<style>
	:global(.message-wrapper) {
		margin: 7px 0;
	}

	:global(.message-wrapper .message) {
		display: inline-block;
		border-radius: 5px;
		padding: 5px;
		margin: 0;
		background-color: #4c4c4c;
	}

	:global(.message-wrapper img) {
		width: 2em;
		height: 2em;
		vertical-align: middle;
	}

	:global(.message-wrapper svg) {
		width: 2em;
		height: 2em;
		vertical-align: middle;
	}

	:global(.message-wrapper .nickname img) {
		width: 1em;
		height: 1em;
		vertical-align: middle;
	}

	:global(.message-wrapper .nickname svg) {
		width: 1em;
		height: 1em;
		vertical-align: middle;
	}

	:global(.message-wrapper .text img) {
		width: 1em;
		height: 1em;
		vertical-align: middle;
	}

	:global(.message-wrapper .text svg) {
		width: 1em;
		height: 1em;
		vertical-align: middle;
	}
</style>

<script>
	import {onMount} from 'svelte'
	import Emojis from '../js/emojis'
	import Avatar from './Avatar.svelte'

	export let showEmojis
	export let showAvatars
	export let timestamp
	export let uid
	export let nickname
	export let text
	export let status

	let nicknameSpan
	let nicknameReplaced
	let textSpan
	let textReplaced

	onMount(() => {
		if (showEmojis && nicknameSpan && !nicknameReplaced) {
			nicknameSpan = Emojis.replace(nicknameSpan)
			nicknameReplaced = true
		}

		if (showEmojis && textSpan && !textReplaced) {
			textSpan = Emojis.replace(textSpan)
			textReplaced = true
		}
	})
</script>

<div class="message-wrapper">
	<p class="message">
		<span class="timestamp">[{timestamp}]</span>
		<span title={uid}>{#if showAvatars}<Avatar uid={uid}/> {/if}[<span class="nickname" bind:this={nicknameSpan}>{nickname}</span>]</span>
		{#if status}<span class="status">{@html status}</span>{/if}
		{#if text}<span class="text" bind:this={textSpan}>{text}</span>{/if}
	</p>
</div>