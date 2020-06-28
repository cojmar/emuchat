<style>
	:global(.tab) {
		background: none;
		border: none;
		border-right: 1px solid #7d7d7d;
		margin: 0;
		color: #7d7d7d;
		padding: 5px;
		cursor: pointer;
		outline: none;

		-moz-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	:global(.tab:hover) {
		outline: 1px solid #fff;
		outline-offset: -2px;
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
	import {TABS} from './Tabs.svelte'
	import ButtonIcon from './ButtonIcon.svelte'
	import Icon from 'fa-svelte'
	import {faTimes} from '@fortawesome/free-solid-svg-icons/faTimes'

	const dispatch = createEventDispatcher()

	const tab = {
		id: id++
	}

	const {addTab, selectTab, selectedTab} = getContext(TABS)

	addTab(tab)

	function removeTab() {
		id--
		dispatch('close')
	}
</script>

<span class="tab" class:selected={$selectedTab === tab} on:click={() => selectTab(tab)}>
	<slot>Tab</slot>
	<ButtonIcon class="button button-icon button-close" title="Close" on:click={removeTab}>
		<Icon icon={faTimes}/>
	</ButtonIcon>
</span>