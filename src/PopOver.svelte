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
		border: 1px solid #7d7d7d;
		outline: none;
		color: #7d7d7d;
	}

	:global(.popover-target .button:focus) {
		background-color: #2c2c2c;
		border: 1px solid #7d7d7d;
		outline: none;
		color: #7d7d7d;
	}

	:global(.popover-target .button:active) {
		background-color: #2c2c2c;
		border: 1px solid #7d7d7d;
		outline: none;
		color: #7d7d7d;
	}

	:global(.popover-target .button:hover) {
		/* background-color: #2c2c2c; */
		border: 1px solid #fff;
		outline: 1px solid #fff;
		outline-offset: -1px;
		color: #7d7d7d;
	}

	:global(.popover-target .button:active svg path) {
		fill: #7d7d7d !important;
	}

	:global(.popover-target .button:focus svg path) {
		fill: #7d7d7d !important;
	}

	:global(.popover-target .button:hover svg path) {
		fill: #7d7d7d !important;
	}

	:global(.popover-target.pinned .button svg path) {
		fill: #fff !important;
	}

	:global(.arrow) {
		position: absolute;
		content: '';
		bottom: -10px;
		width: 0;
		height: 0;
		border-style: solid;
		border-width: 10px 10px 0 10px;
		border-color: #7d7d7d transparent transparent transparent;
		z-index: -1;
	}

	:global(.left-align, .left-align .arrow) {
		left: 0;
		right: unset;
	}

	:global(.right-align, .right-align .arrow) {
		right: -22px;
		left: unset;
	}
</style>

<script>
	import {onMount} from 'svelte'

	// export let color = 'transparent'

	let triggerRef
	let contentRef
	let alignment
	let open = false
	let pinned = false

	onMount(() => {
		const triggerBounds = triggerRef.getBoundingClientRect()
		const contentBounds = contentRef.getBoundingClientRect()

		alignment = triggerBounds.left + contentBounds.width > window.innerWidth ? -1 : 0
		contentRef.style.bottom = triggerBounds.height + 'px'
	});

	const pin = (e) => {
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

<div class="popover" on:mousedown on:mouseover={show} on:mouseout={hide} on:mouseup on:mousewheel>
	<div class="popover-target" on:click={pin} class:pinned={pinned} bind:this={triggerRef}>
		<slot name="target"/>
	</div>
	<div class="popover-content" class:visible={open} bind:this={contentRef} class:left-align={alignment !== -1} class:right-align={alignment === -1}>
		<slot name="content"/>
		<!-- <div class="arrow" style="border-color: {color} transparent transparent transparent;"></div> -->
	</div>
</div>