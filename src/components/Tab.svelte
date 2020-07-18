<style>
	:global(.tab) {
		background: none;
		border: none;
		border-right: 1px solid #7d7d7d;
		margin: 0;
		color: #7d7d7d;
		padding: 4px;
		cursor: pointer;
		outline: none;

		-moz-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	:global(.tab:hover) {
		outline: 1px solid #fff;
		outline-offset: -1px;
		color: #fff;
	}

	:global(.tab svg) {
		width: 16px;
		height: 16px;
		vertical-align: top;
	}

	:global(.tab svg path) {
		fill: #7d7d7d;
	}

	:global(.tab:active svg path) {
		fill: #fff;
	}

	:global(.tab:focus svg path) {
		fill: #fff;
	}

	:global(.tab:hover svg path) {
		fill: #7d7d7d;
	}

	:global(.tab:disabled svg path) {
		fill: #4c4c4c;
	}

	:global(.tab.selected) {
		background-color: #7d7d7d;
		color: #fff;
		outline: none;
	}
</style>

<script context="module">
	let id = 0
</script>

<script>
	import {getContext, createEventDispatcher} from 'svelte'
	import {STATE} from './Tabs.svelte'
	import ButtonIcon from './ButtonIcon.svelte'
	import {faTimes} from '@fortawesome/free-solid-svg-icons/faTimes'

	export let showCloseButton = false

	const dispatch = createEventDispatcher()
	const tab = {id: id++}
	const {addTab, tabs, selectTab, selectedTab} = getContext(STATE)

	addTab(tab)

	function handleTabSelect(e, tab) {
		dispatch('select', tabs.indexOf(tab))
		selectTab(tab)
	}

	function handleTabClose(e, tab) {
		e.stopPropagation()

		let close = tabs.indexOf(tab)
		let select = close > tabs.indexOf($selectedTab) ? tabs.indexOf($selectedTab) : (tabs.indexOf($selectedTab) - 1 < 0 ? 0 : tabs.indexOf($selectedTab) - 1)

		selectTab(tabs[select])

		dispatch('close', {
			close: close,
			select: select
		})
		id--
	}
</script>

<span class="tab" class:selected={$selectedTab === tab} on:click={(e) => handleTabSelect(e, tab)}>
	<slot>Tab</slot>
	{#if showCloseButton}
		<ButtonIcon class="button button-icon button-close" title="Close" icon={faTimes} on:click={(e) => handleTabClose(e, tab)}/>
	{/if}
</span>