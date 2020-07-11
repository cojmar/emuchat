<style>
	:global(.split-pane) {
		position: relative;
		width: 100%;
		height: 100%;
	}

	:global(.split-pane > .pane) {
		float: left;
		width: 100%;
		height: 100%;
		word-break: break-all;
		overflow-x: hidden;
		overflow-y: hidden;
	}

	:global(.split-pane > .pane::-webkit-scrollbar) {
		width: 7px;
		height: 7px;
	}

	:global(.split-pane > .pane::-webkit-scrollbar-track) {
		background: rgba(34, 33, 33, 0.95);
	}

	:global(.split-pane > .pane::-webkit-scrollbar-thumb) {
		background: rgba(0, 0, 0, 0.38);
	}

	:global(.split-pane > .pane::-webkit-scrollbar-thumb:hover) {
		background: rgba(0, 0, 0, 0.64);
	}

	:global(.split-pane > .pane.pane-scrollable) {
		overflow-y: auto;
	}

	:global(.split-pane > .mouse-catcher) {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: transparent;
	}

	:global(.split-pane > .pane-divider) {
		position: absolute;
		display: none;
	}

	:global(.split-pane > .horizontal) {
		padding: 0 2px;
		width: 0;
		height: 100%;
		cursor: ew-resize;
	}

	:global(.split-pane > .vertical) {
		padding: 2px 0;
		width: 100%;
		height: 0;
		cursor: ns-resize;
	}

	:global(.split-pane > .left, .split-pane > .right, .split-pane > .pane-divider) {
		display: block;
	}

	:global(.split-pane > .left, .split-pane > .right) {
		height: 100%;
		float: left;
	}

	:global(.split-pane > .top, .split-pane > .bottom) {
		position: absolute;
		width: 100%;
	}

	:global(.split-pane > .top) {
		top: 0;
	}

	:global(.split-pane > .bottom) {
		bottom: 0;
	}
</style>

<script>
	import {createEventDispatcher} from 'svelte'

	const dispatch = createEventDispatcher()

	export let type
	export let pos = 50
	export let spacing = 0
	export let fixed = false
	export let min = 50
	export let scrollable = true

	const refs = {}

	let dragging = false

	function clamp(num, min, max) {
		return num < min ? min : num > max ? max : num
	}

	function setPos(e) {
		const { top, bottom, left, right } = refs.container.getBoundingClientRect()

		const extents = type === 'vertical' ? [top, bottom] : [left, right]

		const px = clamp(type === 'vertical' ? e.clientY : e.clientX, extents[0] + min, extents[1] - min)

		pos = 100 * (px - extents[0]) / (extents[1] - extents[0])

		dispatch('change')
	}

	function drag(node, cb) {
		const mousedown = e => {
			if (e.which !== 1) return

			e.preventDefault()

			dragging = true

			const onmouseup = () => {
				dragging = false

				window.removeEventListener('mousemove', cb, false)
				window.removeEventListener('mouseup', onmouseup, false)
			}

			window.addEventListener('mousemove', cb, false)
			window.addEventListener('mouseup', onmouseup, false)
		}

		node.addEventListener('mousedown', mousedown, false)

		return {
			destroy() {
				node.removeEventListener('mousedown', onmousedown, false)
			}
		}
	}

	function scroll(node) {
		if (!scrollable) return
		if (!MutationObserver) return

		const observer = new MutationObserver(() => node.scrollTop = node.scrollHeight)

		observer.observe(node, {childList: true, subtree: true})

		return {
			destroy() {
				if (observer) {
					observer.disconnect()
				}
			}
		}
	}

	$: side = type === 'horizontal' ? 'left' : 'top'
	$: dimension = type === 'horizontal' ? 'width' : 'height'
	$: position = type === 'horizontal' ? {messages: 'left', users: 'right'} : {messages: 'top', users: 'bottom'}
	$: scrolling = scrollable && !dragging ? ' pane-scrollable' : ''
</script>

<div class="split-pane clear" bind:this={refs.container}>
	<div class="pane pane-{position.messages}{scrolling}" style="{dimension}: calc({pos}% - {spacing}px); margin-{position.users}: {spacing}px;" use:scroll>
		<slot name="messages"/>
	</div>

	<div class="pane pane-{position.users}{scrolling}" style="{dimension}: calc({100 - (pos)}% - {spacing}px); margin-{position.messages}: {spacing}px;">
		<slot name="users"/>
	</div>

	{#if !fixed}
		<div class="{type} pane-divider" style="{side}: calc({pos}% - 2px)" use:drag={setPos}></div>
	{/if}
</div>

{#if dragging}
	<div class="mouse-catcher"></div>
{/if}