
const envlocal = __dirname + '/../../../.env.local'
require('../../utility').loadEnvLocal(envlocal)

const Path = require('node:path')
const Fs = require('node:fs')

const { test, describe, afterEach } = require('node:test')
const assert = require('node:assert')
const { createLiveTransport } = require('../../live-runner')
const { runLiveEntity } = require('../../live-entity')


const { MixpanelDataPipelinesSDK, BaseFeature, stdutil, config } = require('../../..')

const {
  envOverride,
  liveClientOptions,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
} = require('../../utility')


describe('RetrievePipelineEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MIXPANEL_DATA_PIPELINES_TEST_LIVE=TRUE.
  afterEach(liveDelay('MIXPANEL_DATA_PIPELINES_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MixpanelDataPipelinesSDK.test()
    const ent = testsdk.RetrievePipeline()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"9876543210","req":false,"type":"`$ARRAY`","index$":0},{"active":true,"name":"day_syncs","req":false,"type":"`$ARRAY`","index$":1}],"name":"retrieve_pipeline","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"name","orig":"name","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"project_id","orig":"project_id","reqd":true,"type":"`$INTEGER`","index$":1}]},"contract":{"id":"GET /nessie/pipeline/timeline","json":"{\"operationId\":\"list-warehouse-pipeline-sync-dates\",\"parameters\":[{\"description\":\"Required if using service account to authenticate request.\",\"in\":\"query\",\"name\":\"project_id\",\"required\":true,\"schema\":{\"type\":\"integer\"}},{\"description\":\"The name that uniquely identifies the pipeline.\",\"in\":\"query\",\"name\":\"name\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"example\":{\"value\":{\"day_syncs\":[{\"date\":\"2019-08-19\",\"status\":\"synced\",\"sync_times\":[\"2019-08-19 14:27:46.044605 -0700 PDT\"]},{\"date\":\"2019-08-20\",\"status\":\"synced\",\"sync_times\":[\" 2019-08-20 14:33:09.315098 -0700 PDT\"]}]}}}}},\"description\":\"Success\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"type\":\"string\"},\"status\":{\"enum\":[\"error\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized\"},\"403\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"$ref\":\"#/responses/401/content/application~1json/schema/properties\"},\"type\":\"object\"}}},\"description\":\"Forbidden\"}},\"security\":[{\"ServiceAccount\":[]},{\"ProjectSecret\":[]}],\"securitySchemes\":{\"OAuthToken\":{\"description\":\"OAuth Token\",\"scheme\":\"bearer\",\"type\":\"http\"},\"ProjectSecret\":{\"description\":\"Project Secret\",\"scheme\":\"basic\",\"type\":\"http\"},\"ServiceAccount\":{\"description\":\"Service Account\",\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/nessie/pipeline/timeline","segments":[{"lit":"nessie"},{"lit":"pipeline"},{"lit":"timeline"}],"select":{"exist":["name","project_id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"project_id","orig":"project_id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /nessie/pipeline/jobs","json":"{\"operationId\":\"list-warehouse-pipeline-jobs\",\"parameters\":[{\"description\":\"Required if using service account to authenticate request.\",\"in\":\"query\",\"name\":\"project_id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"example\":{\"value\":{\"9876543210\":[{\"Dispatcher\":\"backfill\",\"frequency\":\"hourly\",\"last_dispatched\":\"2019-02-01 12:00:00 US/Pacific\",\"name\":\"events-daily-bigquery-monoschema\",\"sync_enabled\":\"true\"}]}}}}},\"description\":\"Success\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"type\":\"string\"},\"status\":{\"enum\":[\"error\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized\"},\"403\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"$ref\":\"#/responses/401/content/application~1json/schema/properties\"},\"type\":\"object\"}}},\"description\":\"Forbidden\"}},\"security\":[{\"ServiceAccount\":[]},{\"ProjectSecret\":[]}],\"securitySchemes\":{\"OAuthToken\":{\"description\":\"OAuth Token\",\"scheme\":\"bearer\",\"type\":\"http\"},\"ProjectSecret\":{\"description\":\"Project Secret\",\"scheme\":\"basic\",\"type\":\"http\"},\"ServiceAccount\":{\"description\":\"Service Account\",\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/nessie/pipeline/jobs","segments":[{"lit":"nessie"},{"lit":"pipeline"},{"lit":"jobs"}],"select":{"exist":["project_id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"retrieve_pipeline","name__orig":"retrieve_pipeline","Name":"RetrievePipeline","name_":"retrieve_pipeline","name-":"retrieve-pipeline","NAME":"RETRIEVE_PIPELINE","index$":6}, {"active":true,"entity":"retrieve_pipeline","key$":"BasicRetrievePipelineFlow","kind":"basic","name":"BasicRetrievePipelineFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"retrieve_pipeline_ref01","srcdatavar":"retrieve_pipeline_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-retrieve_pipeline_ref01"}}],"index$":0}]}, 'RetrievePipeline')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let retrieve_pipeline_ref01_data = Object.values(setup.data.existing.retrieve_pipeline)[0]

    // LOAD
    const retrieve_pipeline_ref01_ent = client.RetrievePipeline()
    const retrieve_pipeline_ref01_match_dt0 = {}
    const retrieve_pipeline_ref01_data_dt0 = (await retrieve_pipeline_ref01_ent.load(retrieve_pipeline_ref01_match_dt0)).data()
    assert(null != retrieve_pipeline_ref01_data_dt0)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/retrieve_pipeline/RetrievePipelineTestData.json')

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
    ['retrieve_pipeline01','retrieve_pipeline02','retrieve_pipeline03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MIXPANEL_DATA_PIPELINES_TEST_RETRIEVE_PIPELINE_ENTID': idmap,
    'MIXPANEL_DATA_PIPELINES_TEST_LIVE': 'FALSE',
    'MIXPANEL_DATA_PIPELINES_TEST_EXPLAIN': 'FALSE',
    'MIXPANEL_DATA_PIPELINES_APIKEY': '',
    'MIXPANEL_DATA_PIPELINES_SERVER_SERVER': "data",
  })

  idmap = env['MIXPANEL_DATA_PIPELINES_TEST_RETRIEVE_PIPELINE_ENTID']

  const live = 'TRUE' === env.MIXPANEL_DATA_PIPELINES_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MIXPANEL_DATA_PIPELINES_TEST_RETRIEVE_PIPELINE_ENTID']
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
        server: {
          server: env.MIXPANEL_DATA_PIPELINES_SERVER_SERVER,
        },
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when
      // the last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey and
      // server values above and handed the SDK undefined.
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
  
