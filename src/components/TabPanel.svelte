<style>
	:global(.tabs-panel) {
		display: none;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: calc(100% - 30px);
		/* visibility: hidden; */
	}

	:global(.tabs-panel.visible) {
		display: block;
		/* visibility: visible; */
	}
</style>

<script context="module">
	let id = 0
</script>

<script>
	import {getContext} from 'svelte'
	import {STATE} from './Tabs.svelte'

	const panel = {
		id: id++
	}

	const {addPanel, selectedPanel} = getContext(STATE)

	addPanel(panel)
</script>

<div class="tabs-panel" class:visible={$selectedPanel === panel}>
	<slot/>
</div>