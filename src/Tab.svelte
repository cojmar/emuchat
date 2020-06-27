<style>
	:global(.tab) {
		background: none;
		border: none;
		border-right: 1px solid #7d7d7d;
		margin: 0;
		color: #7d7d7d;
		padding: 5px;
		cursor: pointer;
		outline: none;

		-moz-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	:global(.tab:hover) {
		outline: 1px solid #fff;
		outline-offset: -2px;
		color: #fff;
	}

	:global(.tab svg) {
		width: 16px;
		height: 16px;
		vertical-align: top;
	}

	:global(.tab svg path) {
		fill: #7d7d7d;
	}

	:global(.tab:active svg path) {
		fill: #fff;
	}

	:global(.tab:focus svg path) {
		fill: #fff;
	}

	:global(.tab:hover svg path) {
		fill: #7d7d7d;
	}

	:global(.tab:disabled svg path) {
		fill: #4c4c4c;
	}

	:global(.tab.selected) {
		background-color: #7d7d7d;
		color: #fff;
		outline: none;
	}
</style>

<script context="module">
	let id = 0
</script>

<script>
	import {getContext, createEventDispatcher} from 'svelte'
	import {TABS} from './Tabs.svelte'
	import ButtonIcon from './ButtonIcon.svelte'

	const dispatch = createEventDispatcher()

	const tab = {
		id: id++
	}

	// let dragging = false
	// let pos = 0
	// let min = 50

	const {addTab, selectTab, selectedTab} = getContext(TABS)

	addTab(tab)

	function removeTab() {
		id--
		dispatch('close')
	}

	/*function clamp(num, min, max) {
		return num < min ? min : num > max ? max : num
	}

	function setPos(e) {
		console.log(e)

		const {left, right } = e.target.parentElement.getBoundingClientRect()
		const extents = [left, right]
		const px = clamp(e.clientX, extents[0] + min, extents[1] - min)
		pos = 100 * (px - extents[0]) / (extents[1] - extents[0])
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
	}*/
</script>

<!--style="margin-left: {pos}%;"-->
<span class="tab" class:selected={$selectedTab === tab}  on:click={() => selectTab(tab)}>
	<slot/>
	<ButtonIcon class="button button-icon button-close" title="Close" on:click={removeTab}>
		<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" viewBox="0 0 352 512">
			<path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
		</svg>
	</ButtonIcon>
</span>