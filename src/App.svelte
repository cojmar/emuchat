<script>
	import {Route} from 'tinro'
	import EmuChat from './components/EmuChat.svelte'
</script>

<Route path="/*">
	<Route path="/" redirect="/emuchat/"/>
	<Route path="/emuchat/"><EmuChat showAvatars={!window.$sys.browser.isIE} showEmojis={!window.$sys.browser.isEdgeHTML && !window.$sys.browser.isSafari && !window.$sys.browser.isFirefox && !window.$sys.browser.isPaleMoon && !window.$sys.browser.isBasilisk} statusJoinPart={true} virtualScroll={!window.$sys.browser.isIE}/></Route>
	<Route fallback>No page found</Route>
</Route>