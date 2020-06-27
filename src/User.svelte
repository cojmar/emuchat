<style>
	:global(.user) {
		padding: 5px;
	}
</style>

<script>
	import Avatar from './Avatar.svelte'

	export let nickname = ''
	export let uid = ''
</script>

<div class="user" title={uid}><Avatar uid={uid}/>{nickname}</div>