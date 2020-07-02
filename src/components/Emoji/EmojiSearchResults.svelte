<style>
	:global(.search-results) {
		padding: 0.25em;
		height: 15rem;
	}

	:global(.search-results h3) {
		margin: 0;
		font-size: 0.9em;
		margin: 0 auto;
		color: #999999;
	}

	:global(.no-results) {
		height: 15rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	:global(.no-results .icon) {
		margin: 0 auto;
		font-size: 3em;
		color: #999999;
	}
</style>

<script>
	import {createEventDispatcher} from 'svelte'
	import Icon from '../Icon.svelte'
	import {faFrown} from '@fortawesome/free-regular-svg-icons'
	import EmojiList from './EmojiList.svelte'
	import emojiData from '../../js/emoji.js'

	export let searchText = ''

	const dispatch = createEventDispatcher()

	$: searchResults = emojiData.filter(emoji => (
		emoji.names.find(name => name.indexOf(searchText) >= 0)
	))

	function onMouseOver() {
		dispatch('emojihover', null)
	}
</script>

<div class="search-results">
	{#if searchResults.length}
		<EmojiList emojis={searchResults} withTabs={false} on:emojihover on:emojiclick/>
	{:else}
		<div class="no-results" on:mouseover={onMouseOver}>
			<div class="icon">
				<Icon icon={faFrown}/>
			</div>
			<h3>No emojis found.</h3>
		</div>
	{/if}
</div>