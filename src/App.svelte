<style>
</style>

<script>
	import { Route } from 'tinro'
	import Chat from './Chat.svelte'
</script>

<Route path="/*">
	<Route path="/"><Chat /></Route>
	<Route fallback>No page found</Route>
</Route>