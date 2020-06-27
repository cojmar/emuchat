<style>
	:global(.chat-wrapper) {
		position: relative;
		/* width: 320px; */
		/* height: 200px; */
		width: 100%;
		height: 100%;

		box-sizing: border-box;

		background-color: #333;
		background-image: url(../images/bg.jpg);
		background-repeat: no-repeat;
		background-position: center;
		background-size: contain;

		border: 1px solid #4c4c4c;

		margin: auto;

		font-family: Arial, Helvetica, sans-serif;
		font-size: 100%;
		line-height: 1;
		color: #fff;
	}

	:global(.chat-wrapper *) {
		box-sizing: border-box;
	}

	:global(.chat-wrapper > .chat-container) {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
	}

	:global(.chat-wrapper > .chat-container > #chat-effect) {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	:global(.chat-wrapper > .chat-container > .chat-messages) {
		width: calc(100% - 4px);
		height: calc(100% - 38px);
		border: 1px solid #4c4c4c;
		margin: 2px;
		padding: 4px;
	}

	:global(.chat-wrapper > .chat-container > .chat-messages > .tabs > .tab-list) {
		background-color: rgba(44, 44, 44, 0.9);
	}

	:global(.chat-wrapper > .chat-container > .chat-messages > .tabs > .tabs-panel > .split-pane > .pane) {
		background-color: rgba(44, 44, 44, 0.9);
		border: 1px solid #7d7d7d;
		padding: 10px;
	}

	/*:global(.chat-wrapper .clear) {
		zoom: 1;
	}*/

	:global(.chat-wrapper .clear:before, .chat-wrapper .clear:after) {
		content: '';
		display: table;
	}

	:global(.chat-wrapper .clear:after) {
		clear: both;
	}
</style>

<script>
	import {onMount, getContext} from 'svelte'

	import ButtonIcon from './ButtonIcon.svelte'
	import SplitPane from './SplitPane.svelte'
	import MessageInput from './MessageInput.svelte'
	import MessageList from './MessageList.svelte'
	import TabPanel from './TabPanel.svelte'
	import TabList from './TabList.svelte'
	import Tabs from './Tabs.svelte'
	import {TABS} from './Tabs.svelte'
	import Tab from './Tab.svelte'

	let currentTab = 0

	let channels = [{
		name: 'Tab 0',
		messages: [{
			nickname: 'me',
			text: 'test'
		}],
		users: []
	} , {
		name: 'Tab 1',
		messages: [{
			nickname: 'me',
			text: 'test2'
		}],
		users: []
	} , {
		name: 'Tab 2',
		messages: [],
		users: []
	}];

	onMount(() => {
		const {selectedTab} = getContext(TABS)

		selectedTab.subscribe((tab) => {
			currentTab = tab ? tab.id : 0
		})
	})

	function handleMessage(e, tabIndex) {
		if (channels[tabIndex]) {
			channels[tabIndex].messages.push(e.detail)
			channels = channels
		}
	}

	function handleTabClose(e, tabIndex) {
		if (channels[tabIndex]) {
			channels.splice(tabIndex, 1)
			channels = channels
		}
	}

	function handleTabAdd() {
		channels[channels.length] = {
			name: `Tab ${channels.length}`,
			messages: [],
			users: []
		}
	}
</script>

<div class="chat-wrapper">
	<div class="chat-container">
		<canvas id="chat-effect"></canvas>
		<div class="chat-messages">
			{#if channels}
				<Tabs>
					<TabList>
						{#each channels as channel, index}
							<Tab on:close="{e => handleTabClose(e, index)}">{channel.name}</Tab>
						{/each}
						<ButtonIcon title="New Tab" on:click={handleTabAdd}>
							<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" viewBox="0 0 448 512">
								<path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
							</svg>
						</ButtonIcon>
					</TabList>

					{#each channels as channel}
						<TabPanel>
							<SplitPane type="horizontal" pos={75} spacing={1} fixed={false}>
								<div slot="a">
									<MessageList messages="{channel.messages}" />
								</div>
								<div slot="b">
									<p>right areaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
									<p>right areaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
									<p>right areaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
									<p>right areaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
									<p>right areaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
									<p>right areaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
									<p>right areaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
									<p>right areaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
									<p>right areaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
									<p>right areaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
									<p>right areaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
									<p>right areaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
									<p>right areaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
									<p>right areaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
									<p>right areaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
									<p>right areaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
									<p>right areaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
									<p>right areaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
									<p>right areaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaaareaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
								</div>
							</SplitPane>
						</TabPanel>
					{/each}
				</Tabs>
			{/if}
		</div>
		<MessageInput on:message="{e => handleMessage(e, currentTab)}" />
	</div>
</div>