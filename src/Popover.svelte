<style>
	.popover {
		position: relative;
	}

	.popover-content {
		display: inline-block;
		position: absolute;
		opacity: 0;
		visibility: hidden;
		transform: translate(0, 0px);
		box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
		transition: all 0.3s cubic-bezier(0.75, -0.02, 0.2, 0.97);
	}

	.popover-content.visible {
		opacity: 1;
		visibility: visible;
		transform: translate(0, -10px);
	}

	.arrow {
		position: absolute;
		content: '';
		bottom: -6px;
		padding: 7px;
		background: #7d7d7d;
		transform: rotate(-45deg);
		z-index: -1;
	}

	.left-align,
	.left-align .arrow {
		left: 3px;
		right: unset;
	}

	.right-align,
	.right-align .arrow {
		right: 3px;
		left: unset;
	}
</style>

<script>
	import {onMount} from 'svelte'

	export let color = 'transparent'

	let triggerRef
	let contentRef
	let alignment
	let open = false

	onMount(() => {
		const triggerBounds = triggerRef.getBoundingClientRect()
		const contentBounds = contentRef.getBoundingClientRect()

		alignment = triggerBounds.left + contentBounds.width > window.innerWidth ? -1 : 0
		contentRef.style.bottom = triggerBounds.height + 'px'
	});

	const show = () => open = true
	const hide = () => open = false
</script>

<div class="popover" on:mousedown on:mouseover={show} on:mouseout={hide} on:mouseup on:mousewheel>
	<div bind:this={triggerRef}>
		<slot name="target"/>
	</div>
	<div class="popover-content visible" bind:this={contentRef} class:visible={open} class:left-align={alignment !== -1} class:right-align={alignment === -1}>
		<slot name="content"/>
		<div class="arrow" style="border-color: {color} transparent transparent transparent;"></div>
	</div>
</div>