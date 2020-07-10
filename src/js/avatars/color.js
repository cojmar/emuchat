import colors from './colors'

export default class Color {
	constructor(color = '#000') {
		this.alpha = 1

		if (color[0] == '#') {
			this.hex = color
		} else {
			let match = /(.*)\((.*)\)/.exec(color)

			if (match) {
				let values = match[2].split(',').map(val => parseInt(val.trim()))

				switch (match[1].trim()) {
					case 'rgb':
						this.rgb = values
						break
					case 'rgba':
						this.rgba = values
						break
					case 'hsv':
						this.hsv = values
						break
					default:
						throw new Error('Unsupported color format: ' + color)
				}
			} else {
				throw new Error('Unknown color format: ' + color)
			}
		}
	}

	static get collection() {
		return colors
	}

	clone() {
		return new Color('rgb(' + this.rgb.join(',') + ')')
	}

	set rgb(rgb) {
		if (rgb.length != 3) {
			throw new Error('An array with a length of 3 is expected.')
		}

		this.alpha = 1
		this.color = {
			rgb: rgb
		}
	}

	get rgb() {
		return (this.color.rgb = this.color.rgb || (this.color.hex ? this.hexToRgb(this.hex) : this.hsvToRgb(this.hsv)))
	}

	set rgba(rgba) {
		if (rgba.length != 4) {
			throw new Error('An array with a length of 3 is expected.')
		}

		this.rgb = [rgba[0], rgba[1], rgba[2]]
		this.alpha = rgba[3]
	}

	get rgba() {
		return [this.rgb[0], this.rgb[1], this.rgb[2], this.alpha]
	}

	set hsv(hsv) {
		if (hsv.length != 3) {
			throw new Error('An array with a length of 3 is expected.')
		}

		this.alpha = 1
		this.color = {
			hsv: hsv
		}
	}

	get hsv() {
		// Slice array to return copy
		return (this.color.hsv = this.color.hsv || this.rgbToHsv(this.rgb)).slice(0)
	}

	set hex(hex) {
		this.alpha = 1
		this.color = {
			hex: hex
		}
	}

	get hex() {
		// Slice array to return copy
		return (this.color.hex = this.color.hex || this.rgbToHex(this.rgb)).slice(0)
	}

	brighterThan(color, difference) {
		let primaryColorHsv = this.hsv
		let secondaryColorHsv = color.hsv

		if (primaryColorHsv[2] >= secondaryColorHsv[2] + difference) {
			return this
		}

		primaryColorHsv[2] = secondaryColorHsv[2] + difference

		if (primaryColorHsv[2] > 360) {
			primaryColorHsv[2] = 360
		}

		this.hsv = primaryColorHsv

		return this
	}

	darkerThan(color, difference) {
		let primaryColorHsv = this.hsv
		let secondaryColorHsv = color.hsv

		if (primaryColorHsv[2] <= secondaryColorHsv[2] - difference) {
			return this
		}

		primaryColorHsv[2] = secondaryColorHsv[2] - difference

		if (primaryColorHsv[2] < 0) {
			primaryColorHsv[2] = 0
		}

		this.hsv = primaryColorHsv

		return this
	}

	brighterOrDarkerThan(color, difference) {
		let primaryColorHsv = this.hsv
		let secondaryColorHsv = color.hsv

		if (primaryColorHsv[2] <= secondaryColorHsv[2]) {
			return this.darkerThan(color, difference)
		} else {
			return this.brighterThan(color, difference)
		}
	}

	_componentToHex(c) {
		var value = Math.round(clamp(c, 0, 255))
		var hex = value.toString(16)

		return hex.length == 1 ? '0' + hex : hex
	}

	rgbToHex(rgb) {
		var alpha = rgb.length === 4 ? this._componentToHex(rgb[3] * 255) : ''

		return '#' + this._componentToHex(rgb[0]) + this._componentToHex(rgb[1]) + this._componentToHex(rgb[2]) + alpha
	}

	_expand(hex) {
		var result = '#'

		for (var i = 1; i < hex.length; i++) {
			var val = hex.charAt(i)
			result += val + val
		}

		return result
	}

	_hexToRgb(hex) {
		// #RGB or #RGBA
		if(hex.length === 4 || hex.length === 5) {
			hex = this._expand(hex)
		}

		var rgb = [
			parseInt(hex.substring(1,3), 16),
			parseInt(hex.substring(3,5), 16),
			parseInt(hex.substring(5,7), 16)
		]

		// #RRGGBBAA
		if (hex.length === 9) {
			var alpha = parseFloat((parseInt(hex.substring(7,9), 16) / 255).toFixed(2))
			rgb.push(alpha)
		}

		return rgb
	}

	hexToRgb(hex) {
		return this._hexToRgb(hex).map(val => Math.round(val))
	}

	_rgbToHsv(rgb) {
		let r = rgb[0],
		g = rgb[1],
		b = rgb[2],
		min = Math.min(r, g, b),
		max = Math.max(r, g, b),
		delta = max - min,
		h, s, v

		if (max == 0) s = 0
		else s = (delta/max * 1000)/10

		if (max == min) h = 0
		else if (r == max) h = (g - b) / delta
		else if (g == max) h = 2 + (b - r) / delta
		else if (b == max) h = 4 + (r - g) / delta

		h = Math.min(h * 60, 360)

		if (h < 0) h += 360

		v = ((max / 255) * 1000) / 10

		return [h, s, v]
	}

	rgbToHsv(rgb) {
		return this._rgbToHsv(rgb).map(val => Math.round(val))
	}

	_hsvToRgb(hsv) {
		var h = hsv[0] / 60,
			s = hsv[1] / 100,
			v = hsv[2] / 100,
			hi = Math.floor(h) % 6

		var f = h - Math.floor(h),
			p = 255 * v * (1 - s),
			q = 255 * v * (1 - (s * f)),
			t = 255 * v * (1 - (s * (1 - f))),
			v = 255 * v

		switch (hi) {
			case 0:
				return [v, t, p]
			case 1:
				return [q, v, p]
			case 2:
				return [p, v, t]
			case 3:
				return [p, q, v]
			case 4:
				return [t, p, v]
			case 5:
				return [v, p, q]
		}
	}

	hsvToRgb(hsv) {
		return this._hsvToRgb(hsv).map(val => Math.round(val))
	}
}