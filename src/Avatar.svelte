<style>
	:global(.avatar img) {
		width: 16px;
		height: 16px;
		vertical-align: middle;


	}

	:global(.avatar:after) {
		position: absolute;
		display: block;
		content: '';

		width: 16px;
		height: 16px;

		margin-top: -16px;

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
	export let uid = ''
</script>

<span class="avatar" style="--bg-image: url(https://avatars.dicebear.com/api/bottts/{uid}.svg)"><img src="https://avatars.dicebear.com/api/bottts/{uid}.svg" alt=""/></span>