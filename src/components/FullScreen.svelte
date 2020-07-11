<style>
	:global(.fullscreen) {
		width: 0;
		height: 0;
	}
</style>

<script>
	import {onMount, onDestroy, createEventDispatcher} from 'svelte'
	import fs from '../js/fullscreen'

	let component

	const dispatch = createEventDispatcher()

	onMount(() => {
		fs.on('change', () => dispatch('change', {isFullScreen: fs.isFullScreen()}))
		fs.on('error', () => dispatch('error'))
	})

	const onToggle = () => fs.toggle(component.nextElementSibling)
	const onRequest = () => fs.request(component.nextElementSibling)
	const onExit = () => fs.exit(component.nextElementSibling)
	const isFullScreen = () => fs.isFullScreen()

	onDestroy(() => {
		fs.off('change', null)
		fs.off('error', null)
	})
</script>

<div class="fullscreen" bind:this={component}/>
<slot {onToggle} {onRequest} {onExit} {isFullScreen}/>