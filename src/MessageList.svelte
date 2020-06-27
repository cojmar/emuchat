<style>
</style>

<script>
	import Message from './Message.svelte'

	export let messages = []
</script>

<div class="message-container">
	{#each messages as message}
		<Message uid={message.uid} nickname={message.nickname} message={message.text} />
	{:else}
		<div>No messages</div>
	{/each}
</div>