import {parseSync, stringify} from 'svgson'

export default class Parser {
	static parse(svg) {
		return typeof svg === 'string' ? parseSync(svg) : svg
	}

	static stringify(svg) {
		return typeof svg === 'string' ? svg : stringify(svg)
	}
}