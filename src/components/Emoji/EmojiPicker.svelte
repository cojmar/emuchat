<style>
	:global(.emoji-picker) {
		background: #2c2c2c;
		border: 1px solid #7d7d7d;
		width: 16rem;
		/* height: 21rem; */
		z-index: 1;
	}

	:global(.emoji-picker a) {
		color: rgb(0,100,200);
		text-decoration: none;
	}

	:global(.emoji-picker a:hover) {
		text-decoration: underline;
	}

	:global(.emoji-picker a:visited) {
		color: rgb(0,80,160);
	}

	:global(.emoji-picker input) {
		padding: 0.4em;
		box-sizing: border-box;
	}

	:global(.emoji-picker button) {
		border-color: #7d7d7d;
		outline: none;
	}

	:global(.emoji-picker button:active) {
		background-color: #7d7d7d;
	}

	:global(.emoji-picker button:hover) {
		border-color: #fff;
	}

	:global(.emoji-picker .emoji-tabs) {
		padding: 0.25em;
		height: 15rem;
	}

	:global(.emoji-picker .emoji-tabs) {
		padding: 0.25em;
		height: 15rem;
	}

	:global(.emoji-picker .emoji-tabs .tabs .tabs-panel) {
		padding: 0;
	}

	:global(.emoji-picker .emoji-tabs .tabs .tab-list) {
		display: flex;
		border: none;
	}

	:global(.emoji-picker .emoji-tabs .tabs .tab-list .tab) {
		border-right: none;
		flex-grow: 1;
	}

	:global(.emoji-picker .emoji-tabs .tabs .tab-list .tab:hover) {
		outline: none;
	}

	:global(.emoji-picker .emoji-tabs .tabs .tab-list .tab:hover svg path) {
		fill: #fff
	}

	:global(.emoji-picker .emoji-tabs .tabs .tab-list .tab.selected) {
		background: transparent;
		border-bottom: 2px solid #fff;
	}

	:global(.emoji-picker .emoji-tabs .tabs .tab-list .tab.selected svg path) {
		fill: #fff
	}
</style>

<script>
	import {createEventDispatcher} from 'svelte'
	import Icon from '../Icon.svelte'
	import {faBuilding, faFlag, faLightbulb} from '@fortawesome/free-regular-svg-icons'
	import {faSmile, faCat, faCoffee, faFutbol, faHistory, faMusic} from '@fortawesome/free-solid-svg-icons'
	import TabPanel from '../TabPanel.svelte'
	import TabList from '../TabList.svelte'
	import Tabs from '../Tabs.svelte'
	import Tab from '../Tab.svelte'
	import EmojiDetail from './EmojiDetail.svelte'
	import EmojiList from './EmojiList.svelte'
	import EmojiSearch from './EmojiSearch.svelte'
	import EmojiSearchResults from './EmojiSearchResults.svelte'
	import EmojiVariantPopup from './EmojiVariantPopup.svelte'
	import emojiData from '../../emoji.js'

	export let maxRecents = 50

	let variantsVisible = false

	let variants
	let currentEmoji
	let searchText
	let recentEmojis = JSON.parse(localStorage.getItem('emoji-picker-recent')) || []

	const dispatch = createEventDispatcher()

	const emojiCategories = {}

	emojiData.forEach(emoji => {
		let categoryList = emojiCategories[emoji.category]

		if (!categoryList) {
			categoryList = emojiCategories[emoji.category] = []
		}

		categoryList.push(emoji)
	});

	const categoryOrder = [
		'Smileys & People',
		'Animals & Nature',
		'Food & Drink',
		'Activities',
		'Travel & Places',
		'Objects',
		'Symbols',
		'Flags'
	]

	const categoryIcons = {
		'Smileys & People': faSmile,
		'Animals & Nature': faCat,
		'Food & Drink': faCoffee,
		'Activities': faFutbol,
		'Travel & Places': faBuilding,
		'Objects': faLightbulb,
		'Symbols': faMusic,
		'Flags': faFlag
	}

	function showEmojiDetails(e) {
		currentEmoji = e.detail
	}

	function onEmojiClick(e) {
		if (e.detail.variants) {
			variants = e.detail.variants
			variantsVisible = true
		} else {
			dispatch('emoji', e.detail.emoji)
			saveRecent(e.detail)
		}
	}

	function onVariantClick(e) {
		dispatch('emoji', e.detail.emoji)
		saveRecent(e.detail)
		hideVariants()
	}

	function saveRecent(emoji) {
		recentEmojis = [emoji, ...recentEmojis.filter(recent => recent.key !== emoji.key)].slice(0, maxRecents)
		localStorage.setItem('emoji-picker-recent', JSON.stringify(recentEmojis))
	}

	function hideVariants() {
		// We have to defer the removal of the variants popup.
		// Otherwise, it gets removed before the click event on the body
		// happens, and the target will have a `null` parent, which
		// means it will not be excluded and the clickoutside event will fire.
		setTimeout(() => {
			variantsVisible = false
		});
	}
</script>

<div class="emoji-picker">
	<EmojiSearch bind:searchText={searchText}/>
	{#if searchText}
		<EmojiSearchResults searchText={searchText} on:emojihover={showEmojiDetails} on:emojiclick={onEmojiClick}/>
	{:else}
		<div class="emoji-tabs">
			<Tabs initialSelectedIndex={recentEmojis.length > 0 ? 0 : 1}>
				<TabList>
					<Tab>
						<Icon icon={faHistory}/>
					</Tab>
					{#each categoryOrder as category}
						<Tab>
							<Icon icon={categoryIcons[category]}/>
						</Tab>
					{/each}
				</TabList>

				<TabPanel>
					<EmojiList name="Recently Used" emojis={recentEmojis} on:emojihover={showEmojiDetails} on:emojiclick={onEmojiClick} />
				</TabPanel>

				{#each categoryOrder as category}
					<TabPanel>
						<EmojiList name={category} emojis={emojiCategories[category]} on:emojihover={showEmojiDetails} on:emojiclick={onEmojiClick} />
					</TabPanel>
				{/each}
			</Tabs>
		</div>
	{/if}

	{#if variantsVisible}
		<EmojiVariantPopup variants={variants} on:emojiclick={onVariantClick} on:close={hideVariants}/>
	{/if}

	<EmojiDetail emoji={currentEmoji}/>
</div>