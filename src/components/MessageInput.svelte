<style>
	:global(.chat-input) {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		/* border: 1px solid #4c4c4c; */
		margin: 2px;
		/* padding: 4px; */
	}

	:global(.chat-input > *) {
		float: left;
	}

	:global(.chat-input .button-emoji-picker) {
		border-right: none;
	}

	:global(.chat-input .button-emoji-picker:active) {
		border-right: none;
	}

	:global(.chat-input .button-emoji-picker:disabled:active) {
		border-right: none;
	}

	:global(.chat-input .button-send) {
		border-left: none;
	}

	:global(.chat-input .button-send:active) {
		border-left: none;
	}

	:global(.chat-input .button-send:disabled) {
		border-left: none;
	}

	:global(.chat-input .input-message) {
		width: calc(100% - 88px);
	}
</style>

<script>
	import {createEventDispatcher} from 'svelte'
	import ButtonIcon from './ButtonIcon.svelte'
	import PopOver from './PopOver.svelte'
	import Input from './Input.svelte'
	import {EmojiPicker} from './Emoji'
	import {faSmile} from '@fortawesome/free-solid-svg-icons/faSmile'
	import {faCog} from '@fortawesome/free-solid-svg-icons/faCog'
	import {faExpand} from '@fortawesome/free-solid-svg-icons/faExpand'
	import {faCompress} from '@fortawesome/free-solid-svg-icons/faCompress'

	const dispatch = createEventDispatcher()

	export let onToggle
	export let isFullScreen
	export let showEmojis
	export let uid = ''
	export let nickname = ''
	export let timestamp = (`0${new Date().getHours()}`).slice(-2) + ':' + (`0${new Date().getMinutes()}`).slice(-2) + ':' + (`0${new Date().getSeconds()}`).slice(-2)
	export let placeholder = 'Enter a message'

	let message = ''

	$: fsIcon = isFullScreen ? faCompress : faExpand
	$: fsTitle = isFullScreen ? 'Exit FullScreen' : 'FullScreen'

	function handleSubmit() {
		dispatch('message', {
			uid,
			timestamp,
			nickname,
			text: message
		})

		message = ''
	}

	function onEmoji(e) {
		message += e.detail
	}
</script>

<form class="chat-input clear" on:submit|preventDefault={handleSubmit}>
	<PopOver>
		<div slot="target">
			<ButtonIcon class="button button-icon button-emoji-picker" icon={faSmile}/>
		</div>
		<div slot="content">
			<EmojiPicker showEmojis={showEmojis} on:emoji={onEmoji}/>
		</div>
	</PopOver>
	<PopOver>
		<span slot="target">
			<ButtonIcon class="button button-icon button-settings" title="Settings" icon={faCog}/>
		</span>
		<div slot="content">
			TEST
		</div>
	</PopOver>
	<ButtonIcon class="button button-icon button-toggle-fullscreen" type="button" title={fsTitle} icon={fsIcon} on:click={onToggle}/>
	<Input class="input input-message" bind:value={message} placeholder="{placeholder}" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" maxlength="160" />
	<ButtonIcon class="button button-icon button-send" type="submit" title={message ? "Send" : "Disabled"} disabled={!message}>
		<svg class="icon" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" viewBox="0 0 24 24">
			<path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"></path>
		</svg>
	</ButtonIcon>
</form>