<script>
	import {Route} from 'tinro'
	import EmuChat from './components/EmuChat.svelte'
</script>

<Route path="/*">
	<Route path="/" redirect="/emuchat/"/>
	<Route path="/emuchat/"><EmuChat useAvatars={true} statusJoinPart={true} virtualScroll={true}/></Route>
	<Route fallback>No page found</Route>
</Route>