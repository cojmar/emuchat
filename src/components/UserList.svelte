<script>
	import User from './User.svelte'

	export let users = []
</script>

{#each users as user}
	<User uid={user.info.user} nickname={user.info.nick}/>
{:else}
	<div>No users</div>
{/each}