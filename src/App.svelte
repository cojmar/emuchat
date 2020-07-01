<script>
	import {Route} from 'tinro'
	import EmuChat from './components/EmuChat.svelte'
</script>

<Route path="/*">
	<Route path="/" redirect="/emuchat/"/>
	<Route path="/emuchat/"><EmuChat/></Route>
	<Route fallback>No page found</Route>
</Route>