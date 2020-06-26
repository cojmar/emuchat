<style>
	.tabs-panel {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: calc(100% - 32px);
	}
</style>

<script context="module">
	let id = 0
</script>

<script>
	import {getContext} from 'svelte'
	import {TABS} from './Tabs.svelte'

	const panel = {
		id: id++
	}

	const {registerPanel, selectedPanel} = getContext(TABS)

	registerPanel(panel)
</script>

{#if $selectedPanel === panel}
	<div class="tabs-panel">
		<slot/>
	</div>
{/if}