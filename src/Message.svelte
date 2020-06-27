<style>
	:global(.message) {
		margin: 7px 0;
	}

	:global(.message p) {
		display: inline-block;
		border-radius: 5px;
		padding: 5px;
		margin: 0;
		background-color: #4c4c4c;
	}
</style>

<script>
	export let uid = ''
	export let nickname = ''
	export let message = ''

	let now = new Date()
	let time = (`0${now.getHours()}`).slice(-2) + ':' + (`0${now.getMinutes()}`).slice(-2) + ':' + (`0${now.getSeconds()}`).slice(-2)

	export let timestamp = time
</script>

<div class="message">
	<p class="text"><span class="timestamp">[{timestamp}]</span> <span title={uid}>[{nickname}]</span> {message}</p>
</div>