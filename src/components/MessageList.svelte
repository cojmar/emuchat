<script>
	import Message from './Message.svelte'

	export let showEmojis
	export let showAvatars
	export let messages = []
</script>

{#each messages as message}
	<Message showEmojis={showEmojis} showAvatars={showAvatars} uid={message.uid} timestamp={message.timestamp} nickname={message.nickname} status={message.status} text={message.text}/>
{:else}
	<div>No messages</div>
{/each}