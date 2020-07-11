<style>
	:global(.icon) {
		width: 1em;
		height: 1em;
		overflow: visible;
		display: inline-block;
	}
</style>

<script>
	export let icon

	$: path = typeof icon !== 'undefined' ? icon.icon[4] : ''
	$: viewBox = typeof icon !== 'undefined' ? '0 0 ' + icon.icon[0] + ' ' + icon.icon[1] : ''
	$: classes = 'icon' + ($$props.class ? ' ' + $$props.class : '')
</script>

<svg aria-hidden="true" class="{classes}" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="{viewBox}">
	<path fill="currentColor" d="{path}"/>
</svg>