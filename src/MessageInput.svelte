<style>
	:global(.chat-input) {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;

		border: 1px solid #4c4c4c;

		margin: 2px;
		padding: 4px;

		/* white-space: nowrap; */
		/* overflow: hidden; */
	}

	:global(.chat-input > *) {
		float: left;
	}

	:global(.chat-input > .button-emoji-picker) {
		border-right: none;
	}

	:global(.chat-input > .button-emoji-picker:active) {
		border-right: none;
	}

	:global(.chat-input > .button-emoji-picker:disabled:active) {
		border-right: none;
	}

	:global(.chat-input > .button-send) {
		border-left: none;
	}

	:global(.chat-input > .button-send:active) {
		border-left: none;
	}

	:global(.chat-input > .button-send:disabled) {
		border-left: none;
	}

	:global(.chat-input > .input-message) {
		width: calc(100% - 66px);
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

	const dispatch = createEventDispatcher()

	let message = ''

	function handleSubmit() {
		dispatch('message', {
			uid: 0,
			timestamp: (`0${new Date().getHours()}`).slice(-2) + ':' + (`0${new Date().getMinutes()}`).slice(-2) + ':' + (`0${new Date().getSeconds()}`).slice(-2),
			nickname: 'me',
			text: message
		});

		message = ''
	}

	function onEmoji(e) {
		message += e.detail
	}
</script>

<form class="chat-input clear" on:submit|preventDefault={handleSubmit}>
	<PopOver color={'#fff'}>
		<div slot="target">
			<ButtonIcon class="button button-icon button-emoji-picker" title="Emoji" icon={faSmile}/>
		</div>
		<div slot="content">
			<EmojiPicker on:emoji={onEmoji}/>
		</div>
	</PopOver>
	<ButtonIcon class="button button-icon button-settings" title="Settings" icon={faCog}/>
	<Input class="input input-message" bind:value={message} placeholder="Enter a message" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" maxlength="160" />
	<ButtonIcon class="button button-icon button-send" type="submit" title={message ? "Send" : "Disabled"} disabled={!message}>
		<svg class="icon" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" viewBox="0 0 24 24">
			<path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"></path>
		</svg>
	</ButtonIcon>
</form>