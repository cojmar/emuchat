<script>
	import {Route} from 'tinro'
	import EmuChat from './components/EmuChat.svelte'

	if (window.$sys.browser.isIE) {
		document.documentElement.className += ' engine-trident'
	} else if (window.$sys.browser.isEdgeHTML) {
		document.documentElement.className +=  ' engine-edgehtml'
	} else if (window.$sys.browser.isChrome || window.$sys.browser.isOperaBlink || window.$sys.browser.isEdgeBlink || window.$sys.browser.isChromium) {
		document.documentElement.className += ' engine-blink'
	} else if (window.$sys.browser.isSafari || window.$sys.browser.isOperaPresto) {
		document.documentElement.className += ' engine-webkit'
	} else if (window.$sys.browser.isFirefox || window.$sys.browser.isPaleMoon || window.$sys.browser.isBasilisk || window.$sys.browser.isKMeleon || window.$sys.browser.isNetscape) {
		document.documentElement.className += ' engine-gecko'
	} else {
		document.documentElement.className += ' engine-other'
	}
</script>

<Route path="/*">
	<Route path="/" redirect="/emuchat/"/>
	<Route path="/emuchat/"><EmuChat showAvatars={!window.$sys.browser.isIE} showEmojis={!window.$sys.browser.isEdgeHTML && !window.$sys.browser.isSafari && !window.$sys.browser.isFirefox && !window.$sys.browser.isPaleMoon && !window.$sys.browser.isBasilisk} statusJoinPart={true} virtualScroll={!window.$sys.browser.isIE}/></Route>
	<Route fallback>No page found</Route>
</Route>