<style>
	:global(.message) {
		margin: 7px 0;
	}

	:global(.message p) {
		border-radius: 5px;
		padding: 5px;
		margin: 0;
		background-color: #4c4c4c;
		display: inline-block;
	}

	:global(.message.mine) {
		text-align: right;
	}

	:global(.message.mine p.text) {
		background-color: #a62824;
		color: white;
	}

	:global(.message p.author) {
		background-color: white;
		font-size: 0.8em;
		display: block;
		text-decoration: none;
	}
</style>

<script>
	export let nickname = '';
	export let message = '';
</script>

<div class="message">
	<p class="text"><span>{nickname}:</span> {message}</p>
</div>