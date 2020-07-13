<style>
	:global(.button.user) {
		display: block;
		width: 100%;
		border: none;
		background-color: transparent;
		padding: 5px;
		text-align: left;
		color: #fff;
		outline: none;
	}

	:global(.button.user:hover) {
		background-color: #4c4c4c;
		border-radius: 5px;
	}

	:global(.button.user:focus) {
		background-color: #4c4c4c;
		border-radius: 5px;
	}

	:global(.user img) {
		width: 2em;
		height: 2em;
		margin: 0.2em;
		vertical-align: middle;
	}

	:global(.user svg) {
		width: 2em;
		height: 2em;
		margin: 0.2em;
		vertical-align: middle;
	}

	:global(.user .nickname img) {
		width: 1em;
		height: 1em;
		margin: 0.2em;
		vertical-align: middle;
	}

	:global(.user .nickname svg) {
		width: 1em;
		height: 1em;
		margin: 0.2em;
		vertical-align: middle;
	}
</style>

<script>
	import {onMount} from 'svelte'
	import Emojis from '../js/emojis'
	import Avatar from './Avatar.svelte'
	import Button from './Button.svelte'

	export let showEmojis
	export let showAvatars
	export let nickname
	export let uid

	let span
	let replaced

	onMount(() => {
		if (showEmojis && span && !replaced) {
			span = Emojis.replace(span)
			replaced = true
		}
	})
</script>

<Button class="button user" title={uid} on:click {...$$props}>{#if showAvatars}<Avatar uid={uid}/> {/if}<span class="nickname" bind:this={span}>{nickname}</span></Button>