<style>
	:global(.variants-container) {
		position: absolute;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.5);
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	:global(.variants) {
		background: #2c2c2c;
		margin: 0.5em;
		padding: 0.5em;
		text-align: center;
	}

	:global(.variants .close-button) {
		position: absolute;
		font-size: 1em;
		right: 0.75em;
		top: calc(50% - 0.5em);
		cursor: pointer;
	}
</style>

<script>
	import {createEventDispatcher} from 'svelte'
	import Icon from '../Icon.svelte'
	import {faTimes} from '@fortawesome/free-solid-svg-icons'
	import Emoji from './Emoji.svelte'

	export let showEmojis
	export let variants

	const dispatch = createEventDispatcher()

	function onClickClose() {
		dispatch('close')
	}

	function onClickContainer() {
		dispatch('close')
	}
</script>

<div class="variants-container" on:click={onClickContainer}>
	<div class="variants">
		{#each Object.keys(variants) as variant}
			<Emoji showEmojis={showEmojis} emoji={variants[variant]} on:emojiclick/>
		{/each}
		<div class="close-button" role="button" on:click={onClickClose}>
			<Icon icon={faTimes}/>
		</div>
	</div>
</div>