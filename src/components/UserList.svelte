<script>
	import User from './User.svelte'

	export let showEmojis
	export let showAvatars
	export let users = []
</script>

{#each users as user}
	<User showEmojis={showEmojis} showAvatars={showAvatars} uid={user.info.user} nickname={user.info.name}/>
{:else}
	<div>No users</div>
{/each}