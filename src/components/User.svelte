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
		width: 30px;
		height: 30px;
		padding: 1px;
		vertical-align: middle;
	}

	:global(.user svg) {
		width: 30px;
		height: 30px;
		padding: 1px;
		vertical-align: middle;
	}

	:global(.user .nickname img) {
		width: 16px;
		height: 16px;
		padding: 1px;
		vertical-align: middle;
	}

	:global(.user .nickname svg) {
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
	import Button from './Button.svelte'

	export let avatars
	export let nickname
	export let uid

	let span;

	onMount(() => {
		if (span) span = Emojis.replace(span)
	})
</script>

<Button class="button user" title={uid} on:click {...$$props}>{#if avatars}<Avatar uid={uid}/> {/if}<span class="nickname" bind:this={span}>{nickname}</span></Button>