<style>
	:global(.avatar img) {
		width: 2em;
		height: 2em;
		margin: 0.2em;
		vertical-align: middle;
	}

	:global(.avatar svg) {
		width: 2em;
		height: 2em;
		margin: 0.2em;
		vertical-align: middle;
	}

	/*:global(.avatar:after) {
		position: absolute;
		display: block;
		content: '';

		width: 32px;
		height: 32px;

		margin-top: -32px;

		background-image: var(--bg-image);

		-webkit-transition: all 0.5s ease 10ms;
		-moz-transition: all 0.5s ease 10ms;
		-ms-transition: all 0.5s ease 10ms;
		-o-transition: all 0.5s ease 10ms;
		transition: all 0.5s ease 10ms;

		transform: scale(1);
		transform-origin: center;
		opacity: 0;
	}

	:global(.avatar:hover:after) {
		-webkit-transition: all 0.5s ease 10ms;
		-moz-transition: all 0.5s ease 10ms;
		-ms-transition: all 0.5s ease 10ms;
		-o-transition: all 0.5s ease 10ms;
		transition: all 0.5s ease 10ms;

		transform: scale(6);
		opacity: 1;
	}*/
</style>

<script>
	import RandomAvatar from '../js/avatars'
	import Bots from '../js/avatars/bots'

	export let uid

	let randomAvatar = new RandomAvatar(Bots)

	$: userAvatar = randomAvatar.create(uid, {base64: true})
</script>

{#if uid}<span class="avatar"><img src="{userAvatar}" draggable="false" alt="{uid}"></span>{/if}