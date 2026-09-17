
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


describe('DeletePipelineEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MIXPANEL_DATA_PIPELINES_TEST_LIVE=TRUE.
  afterEach(liveDelay('MIXPANEL_DATA_PIPELINES_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MixpanelDataPipelinesSDK.test()
    const ent = testsdk.DeletePipeline()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"delete_pipeline","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /nessie/pipeline/cancel","json":"{\"operationId\":\"cancel-warehouse-pipeline\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/x-www-form-urlencoded\":{\"schema\":{\"properties\":{\"name\":{\"description\":\"The name that uniquely identifies the pipeline.\",\"type\":\"string\"},\"project_id\":{\"description\":\"Your project id (must be specified when using service account based authentication)\",\"type\":\"number\"}},\"required\":[\"name\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"description\":\"Success\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"type\":\"string\"},\"status\":{\"enum\":[\"error\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized\"},\"403\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"$ref\":\"#/responses/401/content/application~1json/schema/properties\"},\"type\":\"object\"}}},\"description\":\"Forbidden\"}},\"security\":[{\"ServiceAccount\":[]},{\"ProjectSecret\":[]}],\"securitySchemes\":{\"OAuthToken\":{\"description\":\"OAuth Token\",\"scheme\":\"bearer\",\"type\":\"http\"},\"ProjectSecret\":{\"description\":\"Project Secret\",\"scheme\":\"basic\",\"type\":\"http\"},\"ServiceAccount\":{\"description\":\"Service Account\",\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/nessie/pipeline/cancel","segments":[{"lit":"nessie"},{"lit":"pipeline"},{"lit":"cancel"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"delete_pipeline","name__orig":"delete_pipeline","Name":"DeletePipeline","name_":"delete_pipeline","name-":"delete-pipeline","NAME":"DELETE_PIPELINE","index$":1}, {"active":true,"entity":"delete_pipeline","key$":"BasicDeletePipelineFlow","kind":"basic","name":"BasicDeletePipelineFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"delete_pipeline_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0}]}, 'DeletePipeline')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const delete_pipeline_ref01_ent = client.DeletePipeline()
    let delete_pipeline_ref01_data = setup.data.new.delete_pipeline['delete_pipeline_ref01']

    delete_pipeline_ref01_data = (await delete_pipeline_ref01_ent.create(delete_pipeline_ref01_data)).data()
    assert(null != delete_pipeline_ref01_data)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/delete_pipeline/DeletePipelineTestData.json')

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
    ['delete_pipeline01','delete_pipeline02','delete_pipeline03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MIXPANEL_DATA_PIPELINES_TEST_DELETE_PIPELINE_ENTID': idmap,
    'MIXPANEL_DATA_PIPELINES_TEST_LIVE': 'FALSE',
    'MIXPANEL_DATA_PIPELINES_TEST_EXPLAIN': 'FALSE',
    'MIXPANEL_DATA_PIPELINES_APIKEY': '',
    'MIXPANEL_DATA_PIPELINES_SERVER_SERVER': "data",
  })

  idmap = env['MIXPANEL_DATA_PIPELINES_TEST_DELETE_PIPELINE_ENTID']

  const live = 'TRUE' === env.MIXPANEL_DATA_PIPELINES_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MIXPANEL_DATA_PIPELINES_TEST_DELETE_PIPELINE_ENTID']
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
  
