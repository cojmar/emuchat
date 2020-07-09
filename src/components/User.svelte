<style>
	:global(.button.user) {
		display: block;
		width: 100%;
		border: none;
		background-color: transparent;
		padding: 5px;
		text-align: left;
		color: #fff;
		outline: none;
	}

	:global(.button.user:hover) {
		background-color: #4c4c4c;
		border-radius: 5px;
	}

	:global(.button.user:focus) {
		background-color: #4c4c4c;
		border-radius: 5px;
	}
</style>

<script>
	//import Avatar from './Avatar.svelte'
	import Button from './Button.svelte'

	//export let avatars = false
	export let nickname = ''
	export let uid = ''
</script>

<Button class="button user" title={uid} on:click {...$$props}>{nickname}</Button>