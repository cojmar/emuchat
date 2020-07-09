<script>
	import {Route} from 'tinro'
	import EmuChat from './components/EmuChat.svelte'

	let sys = window.$sys

	let virtualScroll = !sys.isIE
	let useAvatars = !sys.isEdgeHTML

</script>

<Route path="/*">
	<Route path="/" redirect="/emuchat/"/>
	<Route path="/emuchat/"><EmuChat useAvatars={useAvatars} statusJoinPart={true} virtualScroll={virtualScroll}/></Route>
	<Route fallback>No page found</Route>
</Route>