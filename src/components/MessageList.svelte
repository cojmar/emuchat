<script>
	import Message from './Message.svelte'

	export let avatars
	export let messages = []
</script>

{#each messages as message}
	<Message avatars={avatars} uid={message.uid} timestamp={message.timestamp} nickname={message.nickname} status={message.status} text={message.text}/>
{:else}
	<div>No messages</div>
{/each}