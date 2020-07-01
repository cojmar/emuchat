<style>
	:global(.user) {
		display: block;
		width: 100%;
		border: none;
		background-color: transparent;
		padding: 5px;
		text-align: left;
		color: #fff;
		outline: none;
	}

	:global(.user:hover) {
		background-color: #4c4c4c;
		border-radius: 5px;
	}
</style>

<script>
	import Avatar from './Avatar.svelte'

	export let nickname = ''
	export let uid = ''
</script>

<button class="user" title={uid} type="button" on:click {...$$props}><Avatar uid={uid}/> {nickname}</button>