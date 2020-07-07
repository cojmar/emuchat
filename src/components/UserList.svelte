<script>
	import User from './User.svelte'
	import normalize from '../js/normalize'

	export let users = []
</script>

{#each users as user}
	<User uid={user.info.user} nickname={normalize.all(user.info.nick)}/>
{:else}
	<div>No users</div>
{/each}