<style>
	button {
		background: none;
		border: none;
		border-bottom: 2px solid #fff;
		margin: 0;
		color: #fff;
		padding: 5px;
		cursor: pointer;
		outline: none;
	}

	button.selected {
		border-bottom: 2px solid #fff;
		color: #fff;
		outline: none;
		font-weight: bold;
	}
</style>

<script context="module">
	let id = 0
</script>

<script>
	import {getContext} from 'svelte'
	import {TABS} from './Tabs.svelte'

	const tab = {
		id: id++
	}

	const {registerTab, selectTab, selectedTab} = getContext(TABS)

	registerTab(tab)
</script>

<button class:selected={$selectedTab === tab} on:click={() => selectTab(tab)} type="button">
	<slot/>
</button>