<style>
</style>

<script>
	import {Route} from 'tinro'
	import Chat from './Chat.svelte'

	const path = window.location.pathname === '/' ? '' : window.location.pathname

	console.log(path)
</script>

<Route path="{path}/*">
	<Route path="/"><Chat /></Route>
	<Route fallback>No page found</Route>
</Route>