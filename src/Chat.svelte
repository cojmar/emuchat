<style>
	:global(.chat-wrapper) {
		position: relative;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		background-color: #333;
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
		background-color: rgba(44, 44, 44, 0.3);
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
		background-color: rgba(44, 44, 44, 0.8);
	}

	:global(.chat-wrapper > .chat-container > .chat-messages > .tabs > .tabs-panel > .split-pane > .pane) {
		background-color: rgba(44, 44, 44, 0.8);
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

<script context="module">
	let id = 3
</script>

<script>
	import ButtonIcon from './ButtonIcon.svelte'
	import SplitPane from './SplitPane.svelte'
	import MessageInput from './MessageInput.svelte'
	import MessageList from './MessageList.svelte'
	import UserList from './UserList.svelte'
	import TabPanel from './TabPanel.svelte'
	import TabList from './TabList.svelte'
	import Tabs from './Tabs.svelte'
	import Tab from './Tab.svelte'
	import {faPlus} from '@fortawesome/free-solid-svg-icons/faPlus'

	let currentTabIndex = 1
	let channels = [{
		name: 'Tab 0',
		messages: [{
			uid: '4546546456456456',
			nickname: 'me',
			text: 'test'
		}],
		users: [{
			uid: '4546546456456456',
			nickname: 'gigi'
		} , {
			uid: '2234443243234234',
			nickname: 'tibi'
		}]
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

	function handleMessage(e) {
		if (channels[currentTabIndex]) {
			channels[currentTabIndex].messages.push(e.detail)
			channels = channels
		}
	}

	function handleTabSelect(e) {
		currentTabIndex = e.detail
	}

	function handleTabClose(e) {
		if (channels[e.detail]) {
			channels.splice(e.detail, 1)
			channels = channels
		}

		currentTabIndex = channels.length - 1
	}

	function handleTabNew() {
		channels[channels.length] = {
			name: `Tab ${id++}`,
			messages: [],
			users: []
		}

		currentTabIndex = channels.length - 1
	}
</script>

<div class="chat-wrapper">
	<div class="chat-container">
		<canvas id="chat-effect"></canvas>
		<div class="chat-messages">
			{#if channels}
				<Tabs initialSelectedIndex={currentTabIndex}>
					<TabList>
						{#each channels as channel}
							<Tab showCloseButton={true} on:select={e => handleTabSelect(e)} on:close={e => handleTabClose(e)}>{channel.name}</Tab>
						{/each}
						<ButtonIcon title="New Tab" icon={faPlus} on:click={handleTabNew}/>
					</TabList>

					{#each channels as channel}
						<TabPanel>
							<SplitPane type="horizontal" pos={75} min={200} spacing={1}>
								<div slot="messages">
									<MessageList messages="{channel.messages}"/>
								</div>
								<div slot="users">
									<UserList users="{channel.users}"/>
								</div>
							</SplitPane>
						</TabPanel>
					{/each}
				</Tabs>
			{/if}
		</div>
		<MessageInput on:message="{e => handleMessage(e, currentTabIndex)}"/>
	</div>
</div>