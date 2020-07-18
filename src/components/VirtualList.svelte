<style>
	:global(.virtual-list-viewport) {
		display: block;
		position: relative;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
		padding: 10px;

		scrollbar-base-color: #222;
		scrollbar-3dlight-color: #222;
		scrollbar-highlight-color: #222;
		scrollbar-track-color: #3e3e42;
		scrollbar-arrow-color: #111;
		scrollbar-shadow-color: #222;
		scrollbar-dark-shadow-color: #222;
		/* -ms-overflow-style: -ms-autohiding-scrollbar; */

		scrollbar-width: thin;
		scrollbar-face-color: rgba(0, 0, 0, 0.38);
		scrollbar-track-color: rgba(34, 33, 33, 0.95);
		scrollbar-color: rgba(0, 0, 0, 0.38) rgba(34, 33, 33, 0.95);
	}

	:global(.virtual-list-viewport::-webkit-scrollbar) {
		width: 7px;
		height: 7px;
	}

	:global(.virtual-list-viewport::-webkit-scrollbar-track) {
		background: rgba(34, 33, 33, 0.95);
	}

	:global(.virtual-list-viewport::-webkit-scrollbar-thumb) {
		background: rgba(0, 0, 0, 0.38);
	}

	:global(.virtual-list-viewport::-webkit-scrollbar-thumb:hover) {
		background: rgba(0, 0, 0, 0.64);
	}

	:global(.virtual-list-contents) {
		display: block;
	}

	:global(.virtual-list-row) {
		display: block;
		overflow: hidden;
	}
</style>

<script>
	import {onMount, tick} from 'svelte'

	// props
	export let items
	export let itemHeight = 0
	export let height = '100%'
	export let autoScroll = false

	// read-only, but visible to consumers via bind:start
	export let start = 0
	export let end = 0

	// local state
	let heightMap = []
	let rows
	let viewport
	let contents
	let viewportHeight = 0

	let visible = items.slice(start, items.length).map((data, i) => {
		return { index: i + start, data }
	})

	let mounted

	let top = 0
	let bottom = 0
	let averageHeight

	$: if (isVisible(viewport)) {
		visible = items.slice(start, end).map((data, i) => {
			return { index: i + start, data }
		})
	}

	// whenever `items` changes, invalidate the current heightmap
	$: if (mounted && isVisible(viewport)) refresh(items, viewportHeight, itemHeight)

	async function refresh(items, viewportHeight, itemHeight) {
		const { scrollTop } = viewport

		await tick() // wait until the DOM is up to date

		let contentHeight = top - scrollTop
		let i = start

		while (contentHeight < viewportHeight && i < items.length) {
			let row = rows[i - start]

			if (!row) {
				end = i + 1
				await tick() // render the newly visible row
				row = rows[i - start]
			}

			const rowHeight = heightMap[i] = itemHeight || row.offsetHeight
			contentHeight += rowHeight
			i += 1
		}

		end = i

		const remaining = items.length - end
		averageHeight = (top + contentHeight) / end

		bottom = remaining * averageHeight
		heightMap.length = items.length

		if (autoScroll && bottom <= 200) {
			viewport.scrollTo(0, viewport.scrollHeight)
		}
	}

	async function handleScroll() {
		const { scrollTop } = viewport

		const oldStart = start

		for (let v = 0; v < rows.length; v += 1) {
			heightMap[start + v] = itemHeight || rows[v].offsetHeight
		}

		let i = 0
		let y = 0

		while (i < items.length) {
			const rowHeight = heightMap[i] || averageHeight

			if (y + rowHeight > scrollTop) {
				start = i
				top = y

				break
			}

			y += rowHeight
			i += 1
		}

		while (i < items.length) {
			y += heightMap[i] || averageHeight
			i += 1

			if (y > scrollTop + viewportHeight) break
		}

		end = i

		const remaining = items.length - end
		averageHeight = y / end

		while (i < items.length) heightMap[i++] = averageHeight
		bottom = remaining * averageHeight

		// prevent jumping if we scrolled up into unknown territory
		if (start < oldStart) {
			await tick()

			let expectedHeight = 0
			let actualHeight = 0

			for (let i = start; i < oldStart; i += 1) {
				if (rows[i - start]) {
					expectedHeight += heightMap[i]
					actualHeight += itemHeight || rows[i - start].offsetHeight
				}
			}

			const d = actualHeight - expectedHeight
			viewport.scrollTo(0, scrollTop + d)
		}

		// TODO if we overestimated the space these
		// rows would occupy we may need to add some
		// more. maybe we can just call handleScroll again?
	}

	function isVisible(node) {
		if (!node) return false

		const style = getComputedStyle(node)

		if (style.display === 'none') return false
		if (style.visibility !== 'visible') return false
		if (style.opacity < 0.1) return false

		if (node.offsetWidth + node.offsetHeight + node.getBoundingClientRect().height + node.getBoundingClientRect().width === 0) return false

		const center = {
			x: node.getBoundingClientRect().left + node.offsetWidth / 2,
			y: node.getBoundingClientRect().top + node.offsetHeight / 2
		}

		if (center.x < 0) return false
		if (center.x > (document.documentElement.clientWidth || window.innerWidth)) return false
		if (center.y < 0) return false
		if (center.y > (document.documentElement.clientHeight || window.innerHeight)) return false

		return true
	}

	// trigger initial refresh
	onMount(() => {
		rows = contents.getElementsByClassName('virtual-list-row')
		mounted = true
	})
</script>

<div class="virtual-list-viewport" bind:this={viewport} bind:offsetHeight={viewportHeight} on:scroll={handleScroll} style="height: {height};">
	<div class="virtual-list-contents" bind:this={contents} style="padding-top: {top}px; padding-bottom: {bottom}px;">
		{#each visible as row (row.index)}
			<div class="virtual-list-row">
				<slot item={row.data}>Missing template</slot>
			</div>
		{/each}
	</div>
</div>