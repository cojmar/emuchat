<style>
	:global(.tab-list) {
		position: relative;
		height: 28px;
		border: 1px solid #7d7d7d;
		padding-top: 2px;
		padding-bottom: 2px;
		margin-bottom: 2px;
		overflow-x: hidden;
		overflow-y: hidden;
		white-space: nowrap;

		scrollbar-width: thin;
		scrollbar-color: rgba(0, 0, 0, 0.38) rgba(34, 33, 33, 0.95);

		-moz-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	:global(.tab-list:hover) {
		overflow-x: auto;
	}

	:global(.tab-list::-webkit-scrollbar) {
		width: 5px;
		height: 5px;
	}

	:global(.tab-list::-webkit-scrollbar-track) {
		background: rgba(34, 33, 33, 0.95);
	}

	:global(.tab-list::-webkit-scrollbar-thumb) {
		background: rgba(0, 0, 0, 0.38);
	}

	:global(.tab-list::-webkit-scrollbar-thumb:hover) {
		background: rgba(0, 0, 0, 0.64);
	}
</style>

<script>
	function scroll(node) {
		if (!MutationObserver) return

		const observer = new MutationObserver(() => node.scrollLeft = node.scrollWidth)

		observer.observe(node, {childList: true, subtree: true})

		const scrollHorizontally = (e) => {
			e = window.event || e
			let delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)))
			node.scrollLeft -= delta * 40
		}

		if (node.addEventListener) {
			node.addEventListener('mousewheel', scrollHorizontally, false)
			node.addEventListener('DOMMouseScroll', scrollHorizontally, false)
		} else {
			node.attachEvent('onmousewheel', scrollHorizontally)
		}

		return {
			destroy() {
				if (observer) {
					observer.disconnect()
				}

				if (node.removeEventListener) {
					node.removeEventListener('mousewheel', scrollHorizontally, false)
					node.removeEventListener('DOMMouseScroll', scrollHorizontally, false)
				} else {
					node.detachEvent('onmousewheel', scrollHorizontally)
				}
			}
		}
	}
</script>

<div class="tab-list" use:scroll>
	<slot/>
</div>