<script>
	import {Route} from 'tinro'
	import EmuChat from './components/EmuChat.svelte'

	let sys = window.$sys

	let virtualScroll = !sys.browser.isIE
	let showAvatars = !sys.browser.isEdgeHTML

	console.log('showAvatars', showAvatars)
	console.log('virtualScroll', virtualScroll)
	console.log('sys.browser.isIE', sys.browser.isIE)
	console.log('sys.browser.isEdgeHTML', sys.browser.isEdgeHTML)
</script>

<Route path="/*">
	<Route path="/" redirect="/emuchat/"/>
	<Route path="/emuchat/"><EmuChat showAvatars={showAvatars} statusJoinPart={true} virtualScroll={virtualScroll}/></Route>
	<Route fallback>No page found</Route>
</Route>