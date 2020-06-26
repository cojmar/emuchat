<style>
	:global(.chat-wrapper) {
		position: relative;
		/* width: 320px; */
		/* height: 200px; */
		width: 100%;
		height: 100%;

		box-sizing: border-box;

		background-color: #333;
		background-image: url(../images/logos/emuchat/emuchat-logo-256.png);
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

	:global(.chat-wrapper > .chat-container > .chat-messages > .split-pane > .pane) {
		background-color: rgba(44, 44, 44, 0.9);
		border: 1px solid #7d7d7d;
		padding: 2px;
	}

	:global(.chat-wrapper .clear) {
		zoom: 1;
	}

	:global(.chat-wrapper .clear:before, .chat-wrapper .clear:after) {
		content: '';
		display: table;
	}

	:global(.chat-wrapper .clear:after) {
		clear: both;
	}
</style>

<script>
	import SplitPane from './SplitPane.svelte'
	import MessageInput from './MessageInput.svelte'
</script>

<div class="chat-wrapper">
	<div class="chat-container">
		<canvas id="chat-effect"></canvas>
		<div class="chat-messages">
			<SplitPane type="horizontal" pos={75} spacing={1} fixed={false}>
				<div slot="a">
					<p>left area</p>
				</div>
				<div slot="b">
					<p>right area</p>
				</div>
			</SplitPane>
		</div>
		<MessageInput />
	</div>
</div>