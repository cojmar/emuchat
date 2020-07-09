import Random from '../random'
//import Color from './color'
import Parser from './parser'

export default class Avatar {
	/**
	 * @param spriteCollection
	 */
	constructor(spriteCollection, defaultOptions) {
		this.spriteCollection = spriteCollection
		this.defaultOptions = {
			userAgent: typeof window !== 'undefined' && window.navigator && window.navigator.userAgent,
			...defaultOptions
		}
	}

	/**
	 * Creates an avatar
	 *
	 * @param seed
	 */
	create(seed, options) {
		options = { ...this.defaultOptions, ...options }

		// Apply alias options
		options = {
			radius: options.r,
			width: options.w,
			height: options.h,
			margin: options.m,
			background: options.b,
			...options
		}

		let svg = this.spriteCollection(new Random(seed), options)

		if (options) {
			svg = Parser.parse(svg)

			let viewBox = svg.attributes['viewBox'].split(' ')
			let viewBoxX = parseInt(viewBox[0])
			let viewBoxY = parseInt(viewBox[1])
			let viewBoxWidth = parseInt(viewBox[2])
			let viewBoxHeight = parseInt(viewBox[3])

			if (options.width) {
				svg.attributes['width'] = options.width.toString()
			}

			if (options.height) {
				svg.attributes['height'] = options.height.toString()
			}

			if (options.margin) {
				let groupable = []

				svg.children = svg.children.filter((child) => {
					if (this.isGroupable(child)) {
						groupable.push(child)

						return false
					}

					return true
				})

				svg.children.push({
					name: 'g',
					type: 'element',
					value: '',
					children: [{
						name: 'g',
						type: 'element',
						value: '',
						children: [{
							name: 'rect',
							type: 'element',
							value: '',
							children: [],
							attributes: {
								fill: 'none',
								width: viewBoxWidth.toString(),
								height: viewBoxHeight.toString(),
								x: viewBoxX.toString(),
								y: viewBoxY.toString(),
							},
						}, ...groupable],
						attributes: {
							transform: `scale(${1 - (options.margin * 2) / 100})`,
						},
					}],
					attributes: {
						transform: `translate(${viewBoxWidth * options.margin / 100}, ${viewBoxHeight * options.margin / 100})`
					}
				})
			}

			if (options.background) {
				svg.children.unshift({
					name: 'rect',
					type: 'element',
					value: '',
					children: [],
					attributes: {
						fill: options.background,
						width: viewBoxWidth.toString(),
						height: viewBoxHeight.toString(),
						x: viewBoxX.toString(),
						y: viewBoxY.toString(),
					}
				})
			}

			if (options.radius) {
				let groupable = []

				svg.children = svg.children.filter((child) => {
					if (this.isGroupable(child)) {
						groupable.push(child)

						return false
					}

					return true
				})

				svg.children.push({
					name: 'mask',
					type: 'element',
					value: '',
					children: [{
						name: 'rect',
						type: 'element',
						value: '',
						children: [],
						attributes: {
							width: viewBoxWidth.toString(),
							height: viewBoxHeight.toString(),
							rx: ((viewBoxWidth * options.radius) / 100).toString(),
							ry: ((viewBoxHeight * options.radius) / 100).toString(),
							fill: '#fff',
							x: viewBoxX.toString(),
							y: viewBoxY.toString(),
						},
					}],
					attributes: {
						id: 'avatarsRadiusMask',
					},
				} , {
					name: 'g',
					type: 'element',
					value: '',
					children: groupable,
					attributes: {
						mask: `url(#avatarsRadiusMask)`,
					},
				})
			}
		}

		svg = Parser.stringify(svg)

		return options && options.base64 ? `data:image/svg+xml;base64,${this.base64EncodeUnicode(svg)}` : svg
	}

	isGroupable(element) {
		return element.type === 'element' && ['title', 'desc', 'defs', 'metadata'].indexOf(element.name) === -1
	}

	base64EncodeUnicode(value) {
		// @see https://www.base64encoder.io/javascript/
		let utf8Bytes = encodeURIComponent(value).replace(/%([0-9A-F]{2})/g, function (match, p1) {
			return String.fromCharCode(parseInt(`0x${p1}`))
		})

		return btoa(utf8Bytes)
	}
}