
const { test, describe } = require('node:test')
const { equal } = require('node:assert')


const { MixpanelDataPipelinesSDK } = require('..')


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await MixpanelDataPipelinesSDK.test()
    equal(null !== testsdk, true)
  })

})
