<style>
</style>

<script>
	import {Route} from 'tinro'
	import Chat from './Chat.svelte'

	let development = typeof dev === 'undefined' ? undefined : dev
</script>

{#if development}
	<Route path="/*">
		<Route path="/"><Chat /></Route>
		<Route fallback>No page found</Route>
	</Route>
{:else}
	<Route path="/emuchat/*">
		<Route path="/"><Chat /></Route>
		<Route fallback>No page found</Route>
	</Route>
{/if}