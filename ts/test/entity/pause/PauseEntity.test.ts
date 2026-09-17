

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { MixpanelDataPipelinesSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('PauseEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MIXPANEL_DATA_PIPELINES_TEST_LIVE=TRUE.
  afterEach(liveDelay('MIXPANEL_DATA_PIPELINES_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MixpanelDataPipelinesSDK.test()
    const ent = testsdk.Pause()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.MIXPANEL_DATA_PIPELINES_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'pause.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"pause","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /nessie/pipeline/pause","json":"{\"operationId\":\"pause-warehouse-pipeline\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/x-www-form-urlencoded\":{\"schema\":{\"properties\":{\"name\":{\"description\":\"The name that uniquely identifies the pipeline.\",\"type\":\"string\"},\"project_id\":{\"description\":\"Your project id (must be specified when using service account based authentication)\",\"type\":\"number\"}},\"required\":[\"name\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"description\":\"Success\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"type\":\"string\"},\"status\":{\"enum\":[\"error\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized\"},\"403\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"$ref\":\"#/responses/401/content/application~1json/schema/properties\"},\"type\":\"object\"}}},\"description\":\"Forbidden\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"$ref\":\"#/responses/401/content/application~1json/schema/properties\"},\"type\":\"object\"}}},\"description\":\"Not Found\"}},\"security\":[{\"ServiceAccount\":[]},{\"ProjectSecret\":[]}],\"securitySchemes\":{\"OAuthToken\":{\"description\":\"OAuth Token\",\"scheme\":\"bearer\",\"type\":\"http\"},\"ProjectSecret\":{\"description\":\"Project Secret\",\"scheme\":\"basic\",\"type\":\"http\"},\"ServiceAccount\":{\"description\":\"Service Account\",\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/nessie/pipeline/pause","segments":[{"lit":"nessie"},{"lit":"pipeline"},{"lit":"pause"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"pause","name__orig":"pause","Name":"Pause","name_":"pause","name-":"pause","NAME":"PAUSE","index$":3}, {"active":true,"entity":"pause","key$":"BasicPauseFlow","kind":"basic","name":"BasicPauseFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"pause_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0}]}, 'Pause')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const pause_ref01_ent = client.Pause()
    let pause_ref01_data = setup.data.new.pause['pause_ref01']

    pause_ref01_data = (await pause_ref01_ent.create(pause_ref01_data)).data()
    assert(null != pause_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/pause/PauseTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = MixpanelDataPipelinesSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['pause01','pause02','pause03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MIXPANEL_DATA_PIPELINES_TEST_PAUSE_ENTID': idmap,
    'MIXPANEL_DATA_PIPELINES_TEST_LIVE': 'FALSE',
    'MIXPANEL_DATA_PIPELINES_TEST_EXPLAIN': 'FALSE',
    'MIXPANEL_DATA_PIPELINES_APIKEY': '',
    'MIXPANEL_DATA_PIPELINES_SECRET': '',
    'MIXPANEL_DATA_PIPELINES_SERVER_SERVER': "data",
  })

  idmap = env['MIXPANEL_DATA_PIPELINES_TEST_PAUSE_ENTID']

  const live = 'TRUE' === env.MIXPANEL_DATA_PIPELINES_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MIXPANEL_DATA_PIPELINES_TEST_PAUSE_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new MixpanelDataPipelinesSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.MIXPANEL_DATA_PIPELINES_APIKEY,
        secret: env.MIXPANEL_DATA_PIPELINES_SECRET,
        server: {
          server: env.MIXPANEL_DATA_PIPELINES_SERVER_SERVER,
        },
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.MIXPANEL_DATA_PIPELINES_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
