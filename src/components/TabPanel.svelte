<style>
	:global(.tabs-panel) {
		display: none;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: calc(100% - 30px);
		/* visibility: hidden; */

		scrollbar-base-color: #222;
		scrollbar-3dlight-color: #222;
		scrollbar-highlight-color: #222;
		scrollbar-track-color: #3e3e42;
		scrollbar-arrow-color: #111;
		scrollbar-shadow-color: #222;
		scrollbar-dark-shadow-color: #222;
		/* -ms-overflow-style: -ms-autohiding-scrollbar; */

		scrollbar-width: thin;
		scrollbar-face-color: rgba(0, 0, 0, 0.38);
		scrollbar-track-color: rgba(34, 33, 33, 0.95);
		scrollbar-color: rgba(0, 0, 0, 0.38) rgba(34, 33, 33, 0.95);
	}

	:global(.tabs-panel.visible) {
		display: block;
		/* visibility: visible; */
	}

	:global(.tabs-panel::-webkit-scrollbar) {
		width: 7px;
		height: 7px;
	}

	:global(.tabs-panel::-webkit-scrollbar-track) {
		background: rgba(34, 33, 33, 0.95);
	}

	:global(.tabs-panel::-webkit-scrollbar-thumb) {
		background: rgba(0, 0, 0, 0.38);
	}

	:global(.tabs-panel::-webkit-scrollbar-thumb:hover) {
		background: rgba(0, 0, 0, 0.64);
	}

	:global(.tabs-panel.scrollable) {
		overflow-y: auto;
	}
</style>

<script context="module">
	let id = 0
</script>

<script>
	import {getContext} from 'svelte'
	import {STATE} from './Tabs.svelte'

	export let autoScroll = false
	export let scrollable = false

	const panel = {
		id: id++
	}

	const {addPanel, selectedPanel} = getContext(STATE)

	addPanel(panel)

	function scroll(node) {
		if (!autoScroll) return
		if (!MutationObserver) return

		const observer = new MutationObserver(() => node.scrollTop = node.scrollHeight)

		observer.observe(node, {childList: true, subtree: true})

		return {
			destroy() {
				if (observer) {
					observer.disconnect()
				}
			}
		}
	}
</script>

<div class="tabs-panel" class:scrollable class:visible={$selectedPanel === panel} use:scroll>
	<slot/>
</div>