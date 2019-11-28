import 'node-env-dev'
import benchloop from 'benchloop'

benchloop.defaultOptions.iterations = 10000

benchloop.group('JSON.stringify', async () => {
	let imports = {} as any

	let { request } = await (await import('axios')).default.get(
		'https://thetvdb.com/api/B89CE93890E9419B/series/361753/all/en.zip',
	)
	const data = request

	imports['fast-safe-stringify'] = require('fast-safe-stringify')
	benchloop({
		name: 'fast-safe-stringify',
		before() {
			console.log(
				`imports['fast-safe-stringify'](data) ->`,
				imports['fast-safe-stringify'](data),
			)
		},
		fn: () => {
			imports['fast-safe-stringify'](data)
		},
	})

	imports['fast-safe-stringify'] = require('fast-safe-stringify')
	benchloop({
		name: 'fast-safe-stringify.stable',
		before() {
			console.log(
				`imports['fast-safe-stringify'].stable(data) ->`,
				imports['fast-safe-stringify'].stable(data),
			)
		},
		fn: () => {
			imports['fast-safe-stringify'].stable(data)
		},
	})

	imports['safe-stable-stringify'] = require('safe-stable-stringify')
	benchloop({
		name: 'safe-stable-stringify',
		before() {
			console.log(
				`imports['safe-stable-stringify'](data) ->`,
				imports['safe-stable-stringify'](data),
			)
		},
		fn() {
			imports['safe-stable-stringify'](data)
		},
	})

	imports['safe-json-stringify'] = require('safe-json-stringify')
	benchloop({
		name: 'safe-json-stringify',
		before() {
			console.log(
				`imports['safe-json-stringify'](data) ->`,
				imports['safe-json-stringify'](data),
			)
		},
		fn() {
			imports['safe-json-stringify'](data)
		},
	})
})

benchloop.summary()
