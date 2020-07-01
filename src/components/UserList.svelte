<script>
	import User from './User.svelte'

	export let users = []
</script>

<div class="user-container">
	{#each users as user}
		<User uid={user.info.user} nickname={user.info.nick}/>
	{:else}
		<div>No users</div>
	{/each}
</div>