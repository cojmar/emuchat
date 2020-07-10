<script>
	import User from './User.svelte'

	export let avatars
	export let users = []
</script>

{#each users as user}
	<User avatars={avatars} uid={user.info.user} nickname={user.info.name}/>
{:else}
	<div>No users</div>
{/each}