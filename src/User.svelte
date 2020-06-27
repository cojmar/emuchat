<style>
	:global(.user) {
		padding: 5px;
	}
</style>

<script>
	export let nickname = ''
	export let uid = ''
</script>

<div class="user" title={uid}>{nickname}</div>