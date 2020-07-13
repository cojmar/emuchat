import normalizeData from './normalize.json'

//Sтєя𝒍iη𝑮♟
//【﻿lil　neo】
//۞𝕍𝕖𝕟𝕦𝕤۞
//꧁༒꧂
//🤍C̷h̷r̷i̷s̷s̷y̷ 🤍
//⬙KATIE⬙
//𝒃⟁𝒃𝒊 𝒅⟁𝒅𝒅𝒊
//( ͡° ͜ʖ ͡°)
//(っ◔◡◔)っ
//¯\_(ツ)_/¯
//( ´ ▽ ` )ﾉ
//^-^
//-_-
//☆𝕄𝕚𝕊𝕥𝔸𝕜𝔼☆
//<3
//ツ
//(⓿_⓿)
//Y̶u̶h̶B̶o̶y̶D̶a̶v̶i̶

const normalizeDataSet = Object.keys(normalizeData)

function removeZalgo(str) {
	return str.replace(/[\u0300-\u036F\u1AB0-\u1AFF\u1DC0-\u1DFF\u20D0-\u20FF\uFE20-\uFE2F\u0483-\u0486\u05C7\u0610-\u061A\u0656-\u065F\u0670\u06D6-\u06ED\u0711\u0730-\u073F\u0743-\u074A\u0F18-\u0F19\u0F35\u0F37\u0F72-\u0F73\u0F7A-\u0F81\u0F84\u0e00-\u0eff\uFC5E-\uFC62]{2,}/gi, '');
};

function removeMeta(str) {
	let arr = Array.from(str)

	for (let i in arr) {
		for (let j in normalizeDataSet) {
			if (typeof normalizeData[normalizeDataSet[j]][arr[i]] !== 'undefined') {
				arr[i] = normalizeData[normalizeDataSet[j]][arr[i]]
			}
		}
	}

	return arr.join('')
}

function all(str) {
	return removeZalgo(removeMeta(str))
}

export default {
	all,
	removeZalgo,
	removeMeta
}