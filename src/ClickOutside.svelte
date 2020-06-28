<style>
</style>

<script>
	import { createEventDispatcher } from 'svelte';

	export let exclude = [];

	let child;

	const dispatch = createEventDispatcher();

	function isExcluded(target) {
		let parent = target;

		while (parent) {
			if (exclude.indexOf(parent) >= 0 || parent === child) {
				return true;
			}

			parent = parent.parentNode;
		}

		return false;
	}

	function onClickOutside(e) {
		if (!isExcluded(e.target)) {
			dispatch('clickoutside');
		}
	}
</script>

<svelte:body on:click={onClickOutside} />

<div bind:this={child}>
	<slot/>
</div>