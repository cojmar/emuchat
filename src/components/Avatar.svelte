<style>
	:global(.avatar svg) {
		width: 32px;
		height: 32px;
		vertical-align: middle;
	}

	:global(.avatar:after) {
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
	}
</style>

<script>
	import Avatar from '../js/avatar'
	import Bots from '../js/avatar/bots'

	export let uid

	let avatar = new Avatar(Bots, {})
	let svg = avatar.create(uid, {})
	//let base64 = `data:image/svg+xml;base64,${avatar.base64EncodeUnicode(svg)}`
</script>

{#if uid}
	<!--<span class="avatar" style="--bg-image: url({base64})">{@html svg}</span>-->
	<span class="avatar">{@html svg}</span>
{/if}