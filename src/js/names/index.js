import adjectives from './adjectives'
import animals from './animals'
import colors from './colors'

import Random from '../random'

export default (seed) => {
	let rand = new Random(seed)
	let adjective = rand.pickone(adjectives)
	let color = rand.pickone(colors)
	let animal = rand.pickone(animals)
	let name = `${color} ${adjective} ${animal}`

	return name.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}