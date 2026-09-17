

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


describe('PipelineStatusEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MIXPANEL_DATA_PIPELINES_TEST_LIVE=TRUE.
  afterEach(liveDelay('MIXPANEL_DATA_PIPELINES_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MixpanelDataPipelinesSDK.test()
    const ent = testsdk.PipelineStatus()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.MIXPANEL_DATA_PIPELINES_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'pipeline_status.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"canceled","req":false,"type":"`$ARRAY`","index$":0},{"active":true,"name":"retried","req":false,"type":"`$ARRAY`","index$":1},{"active":true,"name":"succeeded","req":false,"type":"`$ARRAY`","index$":2}],"name":"pipeline_status","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"name","orig":"name","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"project_id","orig":"project_id","reqd":true,"type":"`$INTEGER`","index$":1},{"active":true,"kind":"query","name":"status","orig":"status","reqd":false,"type":"`$ARRAY`","index$":2},{"active":true,"kind":"query","name":"summary","orig":"summary","reqd":false,"type":"`$STRING`","index$":3}]},"contract":{"id":"GET /nessie/pipeline/status","json":"{\"operationId\":\"get-warehouse-pipeline-status\",\"parameters\":[{\"description\":\"Required if using service account to authenticate request.\",\"in\":\"query\",\"name\":\"project_id\",\"required\":true,\"schema\":{\"type\":\"integer\"}},{\"description\":\"The name that uniquely identifies the pipeline.\",\"in\":\"query\",\"name\":\"name\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Default: `false`. Only lists task count by status and no details.\",\"in\":\"query\",\"name\":\"summary\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Filters the tasks by the given status. Valid options for status are `pending`, `running`, `retried`, `failed`, `canceled`, and `timed_out`.\\n\",\"in\":\"query\",\"name\":\"status\",\"schema\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"canceled\":{\"items\":{\"properties\":{\"from_date\":{\"type\":\"string\"},\"last_finish\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"project_id\":{\"description\":\"Your project id (must be specified when using service account based authentication)\",\"type\":\"number\"},\"run_at\":{\"type\":\"string\"},\"state\":{\"type\":\"string\"},\"to_date\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"retried\":{\"items\":{\"properties\":{\"from_date\":{\"type\":\"string\"},\"last_finish\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"project_id\":{\"description\":\"Your project id (must be specified when using service account based authentication)\",\"type\":\"number\"},\"run_at\":{\"type\":\"string\"},\"state\":{\"type\":\"string\"},\"to_date\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"succeeded\":{\"items\":{\"properties\":{\"from_date\":{\"$ref\":\"#/responses/200/content/application~1json/schema/properties/retried/items/properties/from_date\"},\"last_finish\":{\"$ref\":\"#/responses/200/content/application~1json/schema/properties/retried/items/properties/last_finish\"},\"name\":{\"$ref\":\"#/responses/200/content/application~1json/schema/properties/retried/items/properties/name\"},\"project_id\":{\"$ref\":\"#/responses/200/content/application~1json/schema/properties/retried/items/properties/project_id\"},\"run_at\":{\"$ref\":\"#/responses/200/content/application~1json/schema/properties/retried/items/properties/run_at\"},\"state\":{\"$ref\":\"#/responses/200/content/application~1json/schema/properties/retried/items/properties/state\"},\"to_date\":{\"$ref\":\"#/responses/200/content/application~1json/schema/properties/retried/items/properties/to_date\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Success\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"type\":\"string\"},\"status\":{\"enum\":[\"error\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized\"},\"403\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"$ref\":\"#/responses/401/content/application~1json/schema/properties\"},\"type\":\"object\"}}},\"description\":\"Forbidden\"}},\"security\":[{\"ServiceAccount\":[]},{\"ProjectSecret\":[]}],\"securitySchemes\":{\"OAuthToken\":{\"description\":\"OAuth Token\",\"scheme\":\"bearer\",\"type\":\"http\"},\"ProjectSecret\":{\"description\":\"Project Secret\",\"scheme\":\"basic\",\"type\":\"http\"},\"ServiceAccount\":{\"description\":\"Service Account\",\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/nessie/pipeline/status","segments":[{"lit":"nessie"},{"lit":"pipeline"},{"lit":"status"}],"select":{"exist":["name","project_id","status","summary"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"pipeline_status","name__orig":"pipeline_status","Name":"PipelineStatus","name_":"pipeline_status","name-":"pipeline-status","NAME":"PIPELINE_STATUS","index$":4}, {"active":true,"entity":"pipeline_status","key$":"BasicPipelineStatusFlow","kind":"basic","name":"BasicPipelineStatusFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"pipeline_status_ref01"}}],"index$":0}]}, 'PipelineStatus')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let pipeline_status_ref01_data = Object.values(setup.data.existing.pipeline_status)[0] as any

    // LIST
    const pipeline_status_ref01_ent = client.PipelineStatus()
    const pipeline_status_ref01_match: any = {}

    const pipeline_status_ref01_list = (await pipeline_status_ref01_ent.list(pipeline_status_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/pipeline_status/PipelineStatusTestData.json')

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
    ['pipeline_status01','pipeline_status02','pipeline_status03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MIXPANEL_DATA_PIPELINES_TEST_PIPELINE_STATUS_ENTID': idmap,
    'MIXPANEL_DATA_PIPELINES_TEST_LIVE': 'FALSE',
    'MIXPANEL_DATA_PIPELINES_TEST_EXPLAIN': 'FALSE',
    'MIXPANEL_DATA_PIPELINES_APIKEY': '',
    'MIXPANEL_DATA_PIPELINES_SECRET': '',
    'MIXPANEL_DATA_PIPELINES_SERVER_SERVER': "data",
  })

  idmap = env['MIXPANEL_DATA_PIPELINES_TEST_PIPELINE_STATUS_ENTID']

  const live = 'TRUE' === env.MIXPANEL_DATA_PIPELINES_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MIXPANEL_DATA_PIPELINES_TEST_PIPELINE_STATUS_ENTID']
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
  
