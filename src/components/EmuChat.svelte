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
		/* padding: 10px; */
	}

	:global(.chat-wrapper .clear:before, .chat-wrapper .clear:after) {
		content: '';
		display: table;
	}

	:global(.chat-wrapper .clear:after) {
		clear: both;
	}

	:global(.message-container) {
		height: 100%;
	}

	:global(.user-container) {
		height: 100%;
	}

	:global(.padding) {
		padding: 10px;
	}
</style>

<script context="module">
	let id = 1

	const socket = new Socket()
</script>

<script>
	import {onMount, onDestroy} from 'svelte'
	import Socket from '../js/socket'
	import normalize from '../js/normalize'
	import Name from '../js/names'
	import ButtonIcon from './ButtonIcon.svelte'
	import SplitPane from './SplitPane.svelte'
	import MessageInput from './MessageInput.svelte'
	import VirtualList from './VirtualList.svelte'
	import MessageList from './MessageList.svelte'
	import UserList from './UserList.svelte'
	import Message from './Message.svelte'
	import User from './User.svelte'
	import PopOver from './PopOver.svelte'
	import TabPanel from './TabPanel.svelte'
	import TabList from './TabList.svelte'
	import Tabs from './Tabs.svelte'
	import Tab from './Tab.svelte'
	import {faPlus} from '@fortawesome/free-solid-svg-icons/faPlus'
	import {faCog} from '@fortawesome/free-solid-svg-icons/faCog'

	export let statusJoinPart
	export let virtualScroll
	export let showAvatars

	let currentTabIndex = 0

	let auth = JSON.parse(localStorage.getItem('emuchat-auth')) || {login: '', info: {user: '', nick: ''}}

	let me = {
		uid: auth.info.user || '',
		login: auth.login || '',
		nickname: auth.info.nick || ''
	}

	let channels = [{
		name: 'Status',
		messages: [],
		users: []
	}];

	let timestamp = (`0${new Date().getHours()}`).slice(-2) + ':' + (`0${new Date().getMinutes()}`).slice(-2) + ':' + (`0${new Date().getSeconds()}`).slice(-2)

	onMount(() => {
		socket.on('connect', data => {
			let channel = channels.find(channel => channel.name === 'Status')

			if (channel) {
				channel.messages[channel.messages.length] = {
					timestamp,
					nickname: 'STATUS',
					text: `Connected to ${data.server}`
				}

				channels = channels
			}

			socket.send_cmd('auth', {user: me.login, room: 'Emupedia'})
		})

		socket.on('disconnect', e => {
			let channel = channels.find(channel => channel.name === 'Status')
			let codes = {
				1000: {
					name: 'Normal Closure',
					description: 'Normal closure; the connection successfully completed whatever purpose for which it was created.'
				},
				1001: {
					name: 'Going Away',
					description: 'The endpoint is going away, either because of a server failure or because the browser is navigating away from the page that opened the connection.'
				},
				1002: {
					name: 'Protocol Error',
					description: 'The endpoint is terminating the connection due to a protocol error.'
				},
				1003: {
					name: 'Unsupported Data',
					description: 'The connection is being terminated because the endpoint received data of a type it cannot accept (for example, a text-only endpoint received binary data).'
				},
				1005: {
					name: 'No Status Received',
					description: 'Indicates that no status code was provided even though one was expected.'
				},
				1006: {
					name: 'Abnormal Closure',
					description: 'Used to indicate that a connection was closed abnormally (that is, with no close frame being sent) when a status code is expected.'
				},
				1007: {
					name: 'Invalid frame payload data',
					description: 'The endpoint is terminating the connection because a message was received that contained inconsistent data (e.g., non-UTF-8 data within a text message).'
				},
				1008: {
					name: 'Policy Violation',
					description: 'The endpoint is terminating the connection because it received a message that violates its policy. This is a generic status code, used when codes 1003 and 1009 are not suitable.'
				},
				1009: {
					name: 'Message too big',
					description: 'The endpoint is terminating the connection because a data frame was received that is too large.'
				},
				1010: {
					name: 'Missing Extension',
					description: 'The client is terminating the connection because it expected the server to negotiate one or more extension, but the server didn\'t.'
				},
				1011: {
					name: 'Internal Error',
					description: 'The server is terminating the connection because it encountered an unexpected condition that prevented it from fulfilling the request.'
				},
				1012: {
					name: 'Service Restart',
					description: 'The server is terminating the connection because it is restarting.'
				},
				1013: {
					name: 'Try Again Later',
					description: 'The server is terminating the connection due to a temporary condition, e.g. it is overloaded and is casting off some of its clients.'
				},
				1014: {
					name: 'Bad Gateway',
					description: 'The server was acting as a gateway or proxy and received an invalid response from the upstream server.'
				},
				1015: {
					name: 'TLS Handshake',
					description: 'Indicates that the connection was closed due to a failure to perform a TLS handshake (e.g., the server certificate can\'t be verified).'
				},
				4666: {
					name: 'Server Closed Connection',
					description: 'Server closed your connection forcibly and prevents your automatic reconnection'
				}
			}

			if (channel) {
				channel.messages[channel.messages.length] = {
					timestamp,
					nickname: 'STATUS',
					text: `Disconnected with ${e.reason ? `[Reason] ${e.reason}` : (typeof codes[e.code] !== 'undefined' ? `[Reason] [${codes[e.code].name}] ${codes[e.code].description}` : `[Error Code] ${e.code}`)}`
				}

				channels = channels
			}
		})

		socket.on('error', e => {
			console.log(e)
		})

		socket.on('auth.info', data => {
			localStorage.setItem('emuchat-auth', JSON.stringify(data))

			me.login = data.login
			me.uid = data.info.user
			me.nickname = data.info.nick

			//socket.send_cmd('list', {})
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
			let channel = channels.find(channel => channel.name === data.room)

			if (channel) {
				channel.messages[channel.messages.length] = {
					timestamp: (`0${new Date().getHours()}`).slice(-2) + ':' + (`0${new Date().getMinutes()}`).slice(-2) + ':' + (`0${new Date().getSeconds()}`).slice(-2),
					uid: data.user,
					nickname: channel.users[data.user] ? channel.users[data.user].info.name : data.user,
					text: normalize.all(data.msg)
				}

				channels = channels
			}
		})

		socket.on('room.info', data => {
			let channel = channels.find(channel => channel.name === data.room)

			if (channel) {
				channel.users = sortUsers(data.users)
			} else {
				channels[channels.length] = {
					name: data.room,
					messages: [],
					users: sortUsers(data.users)
				}
			}

			//console.log(data)
		})

		socket.on('room.host', data => {
			// console.log(data)
		})

		socket.on('room.user_join', data => {
			let channel = channels.find(channel => channel.name === data.room)

			if (channel && data.data) {
				channel.users[data.user] = data.data

				if (statusJoinPart) {
					let status = channels.find(channel => channel.name === 'Status')

					status.messages[status.messages.length] = {
						timestamp,
						nickname: 'STATUS',
						text: `${channel.users[data.user] ? channel.users[data.user].info.nick : data.user} has joined ${data.room}`
					}
				}

				channel.users = sortUsers(channel.users)

				channels = channels
			}
		})

		socket.on('room.user_leave', data => {
			let channel = channels.find(channel => channel.name === data.room)

			if (channel && data.user) {
				if (statusJoinPart) {
					let status = channels.find(channel => channel.name === 'Status')

					status.messages[status.messages.length] = {
						timestamp,
						nickname: 'STATUS',
						text: `${channel.users[data.user] ? channel.users[data.user].info.nick : data.user} has left ${data.room}`
					}
				}

				delete channel.users[data.user]

				channels = channels
			}
		})

		socket.on('room.user_reconnect', data => {
			/*let channel = channels.find(channel => channel.name === data.room)

			console.log(channel)

			if (channel && data.user) {
				channel.messages[channel.messages.length] = {
					uid: data.user,
					timestamp,
					nickname: channel.users[data.user] ? channel.users[data.user].info.nick : data.user,
					text: `has reconnected`
				}

				channels = channels
			}*/

			//console.log(data)
		})

		socket.on('room.user_disconnect', data => {
			/*let channel = channels.find(channel => channel.name === data.room)

			console.log(channel)

			if (channel && data.user) {
				channel.messages[channel.messages.length] = {
					uid: data.user,
					timestamp,
					nickname: channel.users[data.user] ? channel.users[data.user].info.nick : data.user,
					text: `has disconnected`
				}

				channels = channels
			}*/

			//console.log(data)
		})

		socket.on('rooms.user_info', data => {
			// console.log(data)
		})

		socket.on('rooms.list', data => {
			console.log(data)
		})

		socket.connect()
	})

	onDestroy(() => {
		socket.disconnect()

		//console.log('onDestroy')
	})

	function sortUsers(users) {
		let users_sorted = Object.values(users)

		try {
			users_sorted = Object.values(users).sort((a, b) => {
				if (isNaN(parseInt(a.info.nick)) && isNaN(parseInt(b.info.nick))) {
					return a.info.nick.localeCompare(b.info.nick)
				} else if (isNaN(parseInt(a.info.nick)) && !isNaN(parseInt(b.info.nick))) {
					return -1
				} else if (!isNaN(parseInt(a.info.nick)) && isNaN(parseInt(b.info.nick))) {
					return 1
				}

				return a.info.nick - b.info.nick
			})
		} catch(e) {}

		let result_users = {}

		users_sorted.forEach(user => {
			user.info.nick = normalize.all(user.info.nick)
			user.info.name = typeof user.info.name !== 'undefined' ? user.info.name : (!isNaN(parseInt(user.info.nick)) ? Name(user.info.user) : user.info.nick)
			result_users[user.info.user] = user
		})

		return result_users
	}

	function handleMessage(e) {
		if (channels[currentTabIndex]) {
			e.detail.nickname = normalize.all(e.detail.nickname)
			e.detail.text = normalize.all(e.detail.text)
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
						<PopOver>
							<span slot="target">
								<ButtonIcon class="button button-icon button-settings" title="Settings" icon={faCog}/>
							</span>
							<div slot="content">
								TEST
							</div>
						</PopOver>
					</TabList>
					{#each channels as channel}
						<TabPanel>
							<SplitPane type="horizontal" pos={75} min={200} spacing={1} scrollable={!virtualScroll}>
								<div class="message-container{virtualScroll ? '': ' padding'}" slot="messages">
									{#if virtualScroll}
										{#if channel.messages.length}
											<VirtualList autoScroll={true} items={channel.messages} let:item>
												<Message avatars={showAvatars} uid={item.uid} timestamp={item.timestamp} nickname={item.nickname} text={item.text}/>
											</VirtualList>
										{:else}
											<div class="padding">No messages</div>
										{/if}
									{:else}
										<MessageList avatars={showAvatars} messages="{channel.messages}"/>
									{/if}
								</div>
								<div class="user-container{virtualScroll ? '': ' padding'}" slot="users">
									{#if virtualScroll}
										{#if Object.values(channel.users).length}
											<VirtualList items={Object.values(channel.users)} let:item>
												<User avatars={showAvatars} uid={item.info.user} nickname={item.info.name}/>
											</VirtualList>
										{:else}
											<div class="padding">No users</div>
										{/if}
									{:else}
										<UserList avatars={showAvatars} users="{Object.values(channel.users)}"/>
									{/if}
								</div>
							</SplitPane>
						</TabPanel>
					{/each}
				</Tabs>
			{/if}
		</div>
		<MessageInput uid="{me.uid}" nickname="{me.nickname}" placeholder={`You are typing as "${me.nickname}". To change nick, type /nick and your new nickname.`} on:message="{e => handleMessage(e, currentTabIndex)}"/>
	</div>
</div>