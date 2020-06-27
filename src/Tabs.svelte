<style>
	:global(.tabs) {
		position: relative;
		width: 100%;
		height: 100%;
		/* overflow: hidden; */
	}
</style>

<script context="module">
	export const TABS = {}
</script>

<script>
	import {setContext, onDestroy} from 'svelte'
	import {writable} from 'svelte/store'

	const tabs = []
	const panels = []
	const selectedTab = writable(null)
	const selectedPanel = writable(null)

	export let initialSelectedIndex = 0

	setContext(TABS, {
		addTab: tab => {
			tabs.push(tab)
			selectedTab.update(current => initialSelectedIndex ? tabs[initialSelectedIndex] : current || tab)

			onDestroy(() => {
				const i = tabs.indexOf(tab)
				tabs.splice(i, 1)
				selectedTab.update(current => current === tab ? tabs[i] || tabs[tabs.length - 1] : current)
			})
		},

		addPanel: panel => {
			panels.push(panel)
			selectedPanel.update(current => initialSelectedIndex ? panels[initialSelectedIndex] : current || panel)

			onDestroy(() => {
				const i = panels.indexOf(panel)
				panels.splice(i, 1)
				selectedPanel.update(current => current === panel ? panels[i] || panels[panels.length - 1] : current)
			})
		},

		selectTab: tab => {
			const i = tabs.indexOf(tab)
			selectedTab.set(tab)
			selectedPanel.set(panels[i])
		},
		selectedTab,
		selectedPanel
	})
</script>

<div class="tabs">
	<slot/>
</div>