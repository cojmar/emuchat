<style>

</style>

<script>
	import Message from './Message.svelte'

	export let messages = []
</script>

<div class="message-container">
	{#each messages as message}
		<Message nickname={message.nickname} message={message.text} />
	{:else}
		<p>No messages</p>
	{/each}
</div>