import 'node-env-dev'
import Benchmark from 'benchmark'
import parse from 'fast-json-parse'

let data: any
const imports = {} as any
const suite = new Benchmark.Suite('JSON.stringify', {
	onStart() {
		console.log(`onStart ->`)
	},
	onCycle({ target }) {
		console.log(`onCycle -> ${target}`)
	},
	onComplete() {
		console.log(`onComplete fastest -> ${this.filter('fastest').map('name')}`)
	},
	onError({ target }) {
		console.error(`onError -> %O`, target.error)
	},
})

process.nextTick(async () => {
	let url = 'https://thetvdb.com/api/B89CE93890E9419B/series/361753/all/en.zip'
	let response = await (await import('axios')).default.get(url, { responseType: 'arraybuffer' })
	data = response
	suite.run({ delay: 1, minSamples: 150 })
})

imports['fast-safe-stringify'] = require('fast-safe-stringify')
suite.add({
	name: 'fast-safe-stringify',
	onStart() {
		console.log(
			`onStart stringify fast-safe-stringify ->`,
			imports['fast-safe-stringify'](data),
		)
		console.log(
			`onStart parse fast-safe-stringify ->`,
			parse(imports['fast-safe-stringify'](data)),
		)
	},
	fn() {
		imports['fast-safe-stringify'](data)
	},
})
suite.add({
	name: 'fast-safe-stringify.stable',
	onStart() {
		console.log(
			`onStart stringify fast-safe-stringify.stable ->`,
			imports['fast-safe-stringify'].stable(data),
		)
		console.log(
			`onStart parse fast-safe-stringify.stable ->`,
			parse(imports['fast-safe-stringify'].stable(data)),
		)
	},
	fn() {
		imports['fast-safe-stringify'].stable(data)
	},
})

imports['safe-stable-stringify'] = require('safe-stable-stringify')
suite.add({
	name: 'safe-stable-stringify',
	onStart() {
		console.log(
			`onStart stringify safe-stable-stringify ->`,
			imports['safe-stable-stringify'](data),
		)
		console.log(
			`onStart parse safe-stable-stringify ->`,
			parse(imports['safe-stable-stringify'](data)),
		)
	},
	fn() {
		imports['safe-stable-stringify'](data)
	},
})

imports['safe-json-stringify'] = require('safe-json-stringify')
suite.add({
	name: 'safe-json-stringify',
	onStart() {
		console.log(
			`onStart stringify safe-json-stringify ->`,
			imports['safe-json-stringify'](data),
		)
		console.log(
			`onStart parse safe-json-stringify ->`,
			parse(imports['safe-json-stringify'](data)),
		)
	},
	fn() {
		imports['safe-json-stringify'](data)
	},
})
