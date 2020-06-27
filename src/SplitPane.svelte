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
		width: 5px;
		height: 5px;
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
		padding: 0 6px;
		width: 0;
		height: 100%;
		cursor: ew-resize;
	}

	:global(.split-pane > .horizontal::after) {
		left: 6px;
		top: 0;
		width: 1px;
		height: 100%;
	}

	:global(.split-pane > .vertical) {
		padding: 6px 0;
		width: 100%;
		height: 0;
		cursor: ns-resize;
	}

	:global(.split-pane > .vertical::after) {
		top: 6px;
		left: 0;
		width: 100%;
		height: 1px;
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

	const refs = {};

	let dragging = false;

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

	$: side = type === 'horizontal' ? 'left' : 'top'
	$: dimension = type === 'horizontal' ? 'width' : 'height'
	$: position = type === 'horizontal' ? {a: 'left', b: 'right'} : {a: 'top', b: 'bottom'}
	$: scrollable = dragging ? '' : 'pane-scrollable'
</script>

<div class="split-pane clear" bind:this={refs.container}>
	<div class="pane pane-{position.a} {scrollable}" style="{dimension}: calc({pos}% - {spacing}px); margin-{position.b}: {spacing}px;">
		<slot name="a"/>
	</div>

	<div class="pane pane-{position.b} {scrollable}" style="{dimension}: calc({100 - (pos)}% - {spacing}px); margin-{position.a}: {spacing}px;">
		<slot name="b"/>
	</div>

	{#if !fixed}
		<div class="{type} pane-divider" style="{side}: calc({pos}% - 7px)" use:drag={setPos}></div>
	{/if}
</div>

{#if dragging}
	<div class="mouse-catcher"></div>
{/if}