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

	let today = new Date()
	let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
	export let timestamp = time
</script>

<div class="message">
	<p class="text"><span class="timestamp">[{timestamp}]</span> <span title={uid}>[{nickname}]</span> {message}</p>
</div>