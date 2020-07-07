<script>
	import Message from './Message.svelte'

	export let messages = []
</script>

{#each messages as message}
	<Message uid={message.uid} timestamp={message.timestamp} nickname={message.nickname} message={message.text}/>
{:else}
	<div>No messages</div>
{/each}