import Benchmarkify from 'benchmarkify'
const benchmark = new Benchmarkify()
const suite = benchmark.createSuite('Leven', { time: 1000 })

async function setup() {}
async function teardown() {}

const A = Math.random().toString(36)
const B = Math.random().toString(36)

import * as stringfn from 'string-fn'
suite.add('string-fn', () => {
	stringfn.distance(A, B)
})

import jslevenshtein from 'js-levenshtein'
suite.add('js-levenshtein', () => {
	jslevenshtein(A, B)
})

import leven from 'leven'
suite.add('leven', () => {
	leven(A, B)
})

// allow ~1000ms for process to allocate memory footprint
setTimeout(async () => {
	await setup()
	let results = await suite.run()
	// console.log(`results ->`, results)
	await teardown()
}, 1000)
