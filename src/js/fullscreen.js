let document = typeof window !== 'undefined' && typeof window.document !== 'undefined' ? window.document : {}

let fn = (() => {
	let val

	let fnMap = [[
		'requestFullscreen',
		'exitFullscreen',
		'fullscreenElement',
		'fullscreenEnabled',
		'fullscreenchange',
		'fullscreenerror'
	] , [
		'webkitRequestFullscreen',
		'webkitExitFullscreen',
		'webkitFullscreenElement',
		'webkitFullscreenEnabled',
		'webkitfullscreenchange',
		'webkitfullscreenerror'

	] , [
		'webkitRequestFullScreen',
		'webkitCancelFullScreen',
		'webkitCurrentFullScreenElement',
		'webkitCancelFullScreen',
		'webkitfullscreenchange',
		'webkitfullscreenerror'

	] , [
		'mozRequestFullScreen',
		'mozCancelFullScreen',
		'mozFullScreenElement',
		'mozFullScreenEnabled',
		'mozfullscreenchange',
		'mozfullscreenerror'
	] , [
		'msRequestFullscreen',
		'msExitFullscreen',
		'msFullscreenElement',
		'msFullscreenEnabled',
		'MSFullscreenChange',
		'MSFullscreenError'
	]]

	let i = 0
	let l = fnMap.length
	let ret = {}

	for (; i < l; i++) {
		val = fnMap[i]

		if (val && val[1] in document) {
			for (i = 0; i < val.length; i++) {
				ret[fnMap[0][i]] = val[i]
			}

			return ret
		}
	}

	return false
})()

let eventNameMap = {
	change: fn.fullscreenchange,
	error: fn.fullscreenerror
}

let fs = {
	request: node => {
		return new Promise((resolve, reject) => {
			let onFullScreenEntered = () => {
				fs.off('change', onFullScreenEntered)
				resolve()
			}

			fs.on('change', onFullScreenEntered)

			node = node || document.documentElement

			let returnPromise = node[fn.requestFullscreen]()

			if (returnPromise instanceof Promise) {
				returnPromise.then(onFullScreenEntered).catch(reject)
			}
		})
	},
	exit: () => {
		return new Promise((resolve, reject) => {
			if (!fs.isFullScreen()) {
				resolve()
				return
			}

			let onFullScreenExit = () => {
				fs.off('change', onFullScreenExit)
				resolve()
			}

			fs.on('change', onFullScreenExit)

			let returnPromise = document[fn.exitFullscreen]()

			if (returnPromise instanceof Promise) {
				returnPromise.then(onFullScreenExit).catch(reject)
			}
		})
	},
	toggle: node => fs.isFullScreen() ? fs.exit() : fs.request(node),
	onchange: cb => fs.on('change', cb),
	onerror: cb => fs.on('error', cb),
	on: (e, cb) => {
		let eventName = eventNameMap[e]

		if (eventName) {
			document.addEventListener(eventName, cb, false)
		}
	},
	off: (e, cb) => {
		let eventName = eventNameMap[e]

		if (eventName) {
			document.removeEventListener(eventName, cb, false)
		}
	},
	isFullScreen: () => Boolean(document[fn.fullscreenElement]),
	element: () => document[fn.fullscreenElement],
	isEnabled: () => Boolean(document[fn.fullscreenEnabled]),
	raw: fn
}

export default fs