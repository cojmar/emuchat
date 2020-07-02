import seedrandom from 'seedrandom'

export default class Random {
	constructor(seed) {
		this.seed = seed
		this.prng = seedrandom(seed)
	}

	bool(likelihood = 50) {
		return this.prng() * 100 < likelihood
	}

	integer(min, max) {
		return Math.floor(this.prng() * (max - min + 1) + min)
	}

	pickone(arr) {
		return arr[this.integer(0, arr.length - 1)]
	}
}