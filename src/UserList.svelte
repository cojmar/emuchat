<style>
</style>

<script>
	import User from './User.svelte'

	export let users = []
</script>

<div class="user-container">
	{#each users as user}
		<User uid={user.uid} nickname={user.nickname}/>
	{:else}
		<div>No users</div>
	{/each}
</div>