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
		z-index: -1;
	}

	:global(.chat-wrapper > .chat-container > .chat-messages) {
		width: calc(100% - 4px);
		height: calc(100% - 28px);
		/* border: 1px solid #4c4c4c; */
		margin: 2px;
		/* padding: 4px; */
	}

	:global(.chat-wrapper > .chat-container > .chat-messages > .tabs > .tab-list) {
		background-color: rgba(44, 44, 44, 0.8);
	}

	:global(.chat-wrapper > .chat-container > .chat-messages > .tabs > .tabs-panel > .split-pane > .pane) {
		background-color: rgba(44, 44, 44, 0.8);
		border: 1px solid #7d7d7d;
		padding: 10px;
	}

	:global(.chat-wrapper .clear:before, .chat-wrapper .clear:after) {
		content: '';
		display: table;
	}

	:global(.chat-wrapper .clear:after) {
		clear: both;
	}
</style>

<script context="module">
	let id = 1

	const socket = new Socket()
</script>

<script>
	import {onMount, onDestroy} from 'svelte'
	import Socket from '../js/socket'
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
	import {faCog} from '@fortawesome/free-solid-svg-icons/faCog'

	let nickname = ''
	let currentTabIndex = 0
	let channels = [{
		name: 'Status',
		messages: [],
		users: []
	}];

	onMount(() => {
		//console.log('onMount')

		socket.on('connect', data => {
			channels[0].messages[channels[0].messages.length] = {
				uid: '0',
				timestamp: (`0${new Date().getHours()}`).slice(-2) + ':' + (`0${new Date().getMinutes()}`).slice(-2) + ':' + (`0${new Date().getSeconds()}`).slice(-2),
				nickname: 'STATUS',
				text: `Connected to ${data.server}`
			}

			socket.send_cmd('auth', {user: '', room: 'Emupedia'})
		})

		socket.on('disconnect', e => {
			channels[0].messages[channels[0].messages.length] = {
				uid: '0',
				timestamp: (`0${new Date().getHours()}`).slice(-2) + ':' + (`0${new Date().getMinutes()}`).slice(-2) + ':' + (`0${new Date().getSeconds()}`).slice(-2),
				nickname: 'STATUS',
				text: `Disconnected with ${e.reason ? `Reason ${e.reason}` : ''} Error Code ${e.code}`
			}
		})

		socket.on('auth.info', data => {
			nickname = data.info.nick
			// socket.send_cmd('list', {})
		})

		socket.on('cmd', data => {
			//console.log(data)
		})

		socket.on('eval', data => {
			//console.log(data)
		})

		socket.on('server.help', data => {
			// console.log(data)
		})

		socket.on('server.msg', data => {
			// console.log(data)
		})

		socket.on('silent.msg', data => {
			/*channels[0].messages[channels[0].messages.length] = {
				uid: '0',
				timestamp: (`0${new Date().getHours()}`).slice(-2) + ':' + (`0${new Date().getMinutes()}`).slice(-2) + ':' + (`0${new Date().getSeconds()}`).slice(-2),
				nickname: 'STATUS',
				text: data
			}*/

			// console.log(data)
		})

		socket.on('room.msg', data => {
			channels[0].messages[channels[0].messages.length] = {
				uid: data.user,
				timestamp: (`0${new Date().getHours()}`).slice(-2) + ':' + (`0${new Date().getMinutes()}`).slice(-2) + ':' + (`0${new Date().getSeconds()}`).slice(-2),
				nickname: channels[0].users[data.user].info.nick,
				text: data.msg
			}

			//console.log(data)
		})

		socket.on('room.info', data => {
			channels[0].name = data.room
			channels[0].users = sortUsers(data.users)

			//console.log(data)
		})

		socket.on('room.host', data => {
			// console.log(data)
		})

		socket.on('room.user_join', data => {
			let channel = channels.find(channel => channel.name === data.room)

			if (channel && data.data) {
				channel.users[data.user] = data.data
			}

			channel.users = sortUsers(channel.users)

			//console.log(channel.users[data.user])
		})

		socket.on('room.user_leave', data => {
			let channel = channels.find(channel => channel.name === data.room)

			if (channel && data.user) {
				delete channel.users[data.user]
			}

			//console.log(channel.users[data.user])
		})

		socket.on('room.user_reconnect', data => {
			//console.log(data)
		})

		socket.on('rooms.user_info', data => {
			// console.log(data)
		})

		socket.on('rooms.list', data => {
			// console.log(data)
		})

		socket.connect()
	})

	onDestroy(() => {
		socket.disconnect()

		//console.log('onDestroy')
	})

	function sortUsers(users) {
		let users_sorted = Object.values(users).sort((a, b) => {
			if (isNaN(parseInt(a.info.nick[0])) && isNaN(parseInt(b.info.nick[0]))) {
				return a.info.nick.localeCompare(b.info.nick)
			} else if (isNaN(parseInt(a.info.nick[0])) && !isNaN(parseInt(b.info.nick[0]))) {
				return -1
			} else if (!isNaN(parseInt(a.info.nick[0])) && isNaN(parseInt(b.info.nick[0]))) {
				return 1
			}

			return a.info.nick[0] - b.info.nick[0]
		})

		let result_users = {}

		users_sorted.forEach((user) => {
			result_users[user.info.user] = user
		})

		return result_users
	}

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
		if (channels[e.detail.close]) {
			channels.splice(e.detail.close, 1)
			channels = channels
		}

		currentTabIndex = e.detail.select
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
						<ButtonIcon class="button button-icon button-settings" title="Settings" icon={faCog}/>
					</TabList>
					{#each channels as channel}
						<TabPanel>
							<SplitPane type="horizontal" pos={75} min={200} spacing={1}>
								<div slot="messages">
									<MessageList messages="{channel.messages}"/>
								</div>
								<div slot="users">
									<UserList users="{Object.values(channel.users)}"/>
								</div>
							</SplitPane>
						</TabPanel>
					{/each}
				</Tabs>
			{/if}
		</div>
		<MessageInput placeholder={`You are typing as "${nickname}". To change nick, type /nick and your new nickname.`} on:message="{e => handleMessage(e, currentTabIndex)}"/>
	</div>
</div>