<style>
	:global(.search) {
		padding: 0.25em;
		position: relative;
	}

	:global(.search input) {
		width: 100%;
		border-radius: 0;
		border: 1px solid #7d7d7d;
		background-color: #2c2c2c;
		color: #fff;
	}

	:global(.search input:-ms-input-placeholder) {
		color: #7d7d7d;
		opacity: 1;

		-moz-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	:global(.search input::-ms-input-placeholder) {
		color: #7d7d7d;
		opacity: 1;

		-moz-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	:global(.search input::-webkit-input-placeholder) {
		color: #7d7d7d;
		opacity: 1;

		-moz-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	:global(.search input::placeholder) {
		color: #7d7d7d;
		opacity: 1;

		-moz-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	:global(.search input:active::placeholder) {
		color: #fff;
		opacity: 1;
	}

	:global(.search input:focus) {
		outline: none;
		border-color: #fff;
	}

	:global(.search span.icon) {
		color: #aaa;
		position: absolute;
		font-size: 1em;
		top: calc(50% - 0.5em);
		right: 0.75em;
	}

	:global(.search span.icon.clear-button) {
		cursor: pointer;
	}
</style>

<script>
	import {onMount} from 'svelte'
	import {faSearch, faTimes} from '@fortawesome/free-solid-svg-icons'
	import Icon from '../Icon.svelte'

	export let searchText = ''

	let searchField

	onMount(() => {
		searchField.focus()
	})

	function clearSearchText() {
		searchText = ''
		searchField.focus()
	}

	function handleKeyDown(e) {
		if (e.key === 'Escape' && searchText) {
			clearSearchText()
			e.stopPropagation()
		}
	}
</script>

<div class="search">
	<input type="text" placeholder="Search" bind:value={searchText} bind:this={searchField} on:keydown={handleKeyDown}>

	{#if searchText}
		<span class="icon clear-button" role="button" on:click|stopPropagation={clearSearchText}><Icon icon={faTimes}/></span>
	{:else}
		<span class="icon"><Icon icon={faSearch}/></span>
	{/if}
</div>
