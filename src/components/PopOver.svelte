<style>
	:global(.popover) {
		position: relative;
	}

	:global(.popover-content) {
		display: inline-block;
		position: absolute;
		opacity: 0;
		visibility: hidden;
		transform: translate(0, -20px);
		box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
		transition: all 0.3s cubic-bezier(0.75, -0.02, 0.2, 0.97);
	}

	:global(.popover-content.visible) {
		opacity: 1;
		visibility: visible;
		transform: translate(0, -2px);
	}

	:global(.popover-target .button) {
		background-color: #2c2c2c;
		border-color: #7d7d7d;
		outline: none;
		color: #7d7d7d;
	}

	:global(.popover-target .button:focus) {
		background-color: #2c2c2c;
		border-color: #7d7d7d;
		outline: none;
		color: #7d7d7d;
	}

	:global(.popover-target .button:active) {
		background-color: #7d7d7d;
		border-color: #7d7d7d;
		outline: none;
		color: #7d7d7d;
	}

	:global(.popover-target .button:hover) {
		border-color: #fff;
		outline: 1px solid #fff;
		outline-offset: -1px;
		color: #7d7d7d;
	}

	:global(.popover-target .button:active svg path) {
		fill: #fff !important;
	}

	:global(.popover-target .button:focus svg path) {
		fill: #7d7d7d !important;
	}

	:global(.popover-target .button:active:focus svg path) {
		fill: #fff !important;
	}

	:global(.popover-target .button:hover svg path) {
		fill: #7d7d7d !important;
	}

	:global(.popover-target.pinned .button svg path) {
		fill: #fff !important;
	}

	:global(.popover-target.pinned .button:active svg path) {
		fill: #fff !important;
	}
</style>

<script>
	import {onMount} from 'svelte'

	// export let color = 'transparent'

	let triggerRef
	let contentRef
	let alignmentLeftRight
	let alignmentTopBottom
	let open = false
	let pinned = false

	onMount(() => {
		const triggerBounds = triggerRef.getBoundingClientRect()
		const contentBounds = contentRef.getBoundingClientRect()

		alignmentLeftRight = triggerBounds.left + contentBounds.width > window.innerWidth
		alignmentTopBottom = triggerBounds.top + contentBounds.height > window.innerHeight

		if (alignmentTopBottom) {
			contentRef.style.bottom = triggerBounds.height + 'px'
		} else {
			contentRef.style.top = triggerBounds.height + 'px'
		}
	});

	const pin = () => {
		if (pinned) {
			pinned = false
			open = false
		} else {
			pinned = true
			open = true
		}
	}

	const show = () => open = true

	const hide = () => open = pinned
</script>

<span class="popover" on:mousedown on:mouseover={show} on:mouseout={hide} on:mouseup on:mousewheel>
	<span class="popover-target" on:click={pin} class:pinned={pinned} bind:this={triggerRef}>
		<slot name="target"/>
	</span>
	<div class="popover-content" class:visible={open} bind:this={contentRef} class:left-align={!alignmentLeftRight} class:right-align={alignmentLeftRight} class:top-align={alignmentTopBottom} class:bottom-align={!alignmentTopBottom}>
		<slot name="content"/>
	</div>
</span>