

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


describe('EditEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MIXPANEL_DATA_PIPELINES_TEST_LIVE=TRUE.
  afterEach(liveDelay('MIXPANEL_DATA_PIPELINES_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MixpanelDataPipelinesSDK.test()
    const ent = testsdk.Edit()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.MIXPANEL_DATA_PIPELINES_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'edit.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"edit","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /nessie/pipeline/edit","json":"{\"operationId\":\"edit-warehouse-pipeline\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/x-www-form-urlencoded\":{\"schema\":{\"oneOf\":[{\"properties\":{\"events\":{\"description\":\"A whitelist for the event(s) you intend to export. For multiple events, you will need to pass in each event name as separate `events` parameters like so: `--data 'events=event1' \\\\ --data 'events=event2'`\\n\\n\\nPlease note that after this update, the sync of older dates to your data warehouse\\n(if enabled) will only contain the new set of whitelisted events.\\n\",\"type\":\"string\"},\"name\":{\"description\":\"The name that uniquely identifies the pipeline.\",\"type\":\"string\"},\"project_id\":{\"description\":\"Your project id (must be specified when using service account based authentication)\",\"type\":\"number\"},\"where\":{\"description\":\"A selector expression used to filter by events data, such as event properties.\\n\\nPlease note that after this update, the sync of older dates to your data warehouse (if enabled) will only contain events matching your new where clause.\",\"type\":\"string\"}},\"required\":[\"name\"],\"title\":\"Raw GCS Pipeline\",\"type\":\"object\"},{\"properties\":{\"$ref\":\"#/requestBody/content/application~1x-www-form-urlencoded/schema/oneOf/0/properties\"},\"required\":{\"$ref\":\"#/requestBody/content/application~1x-www-form-urlencoded/schema/oneOf/0/required\"},\"title\":\"Raw Amazon S3 Pipeline\",\"type\":\"object\"},{\"allOf\":[{\"properties\":{\"$ref\":\"#/requestBody/content/application~1x-www-form-urlencoded/schema/oneOf/0/properties\"},\"required\":{\"$ref\":\"#/requestBody/content/application~1x-www-form-urlencoded/schema/oneOf/0/required\"},\"type\":\"object\"},{\"properties\":{\"azure_client_id\":{\"description\":\"`clientId` from the Service Principal credentials.\\n\",\"type\":\"string\"},\"azure_client_secret\":{\"description\":\"`clientSecret` from the Service Principal credentials.\\n\",\"type\":\"string\"},\"azure_tenant_id\":{\"description\":\"`tenantId` from the Service Principal credentials. This is specific to the Active Directory instance where the Service Principal resides.\\n\",\"type\":\"string\"}},\"type\":\"object\"}],\"title\":\"Raw Azure Pipeline\"},{\"allOf\":[{\"allOf\":[{\"properties\":{\"$ref\":\"#/requestBody/content/application~1x-www-form-urlencoded/schema/oneOf/0/properties\"},\"required\":{\"$ref\":\"#/requestBody/content/application~1x-www-form-urlencoded/schema/oneOf/0/required\"},\"type\":\"object\"}]},{\"properties\":{\"bq_share_with_group\":{\"description\":\"Group account email addresses to share the data-set with if managed by mixpanel. e.g. bq-access-alias@somecompany.com.\\n\\nPlease note that this will only add new shares and won't remove the old ones.\\n\",\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"}],\"title\":\"Schematized BigQuery Pipeline\"},{\"allOf\":{\"$ref\":\"#/requestBody/content/application~1x-www-form-urlencoded/schema/oneOf/3/allOf/0/allOf\"},\"title\":\"Schematized Snowflake Pipeline\"},{\"allOf\":[{\"allOf\":{\"$ref\":\"#/requestBody/content/application~1x-www-form-urlencoded/schema/oneOf/3/allOf/0/allOf\"}},{\"properties\":{\"glue_database\":{\"description\":\"The glue database to which the schema needs to be exported.\\n\",\"type\":\"string\"},\"glue_role\":{\"description\":\"There is no default value. The role that needs to be assumed for updating glue  e.g. arn:aws:iam::<account-id>:role/example-glue-role\\n\",\"type\":\"string\"},\"glue_table_prefix\":{\"description\":\"Prefix to add to table names when creating them.\\n\",\"type\":\"string\"}},\"type\":\"object\"}],\"title\":\"Schematized AWS Pipeline\"},{\"allOf\":[{\"allOf\":{\"$ref\":\"#/requestBody/content/application~1x-www-form-urlencoded/schema/oneOf/3/allOf/0/allOf\"}},{\"properties\":{\"$ref\":\"#/requestBody/content/application~1x-www-form-urlencoded/schema/oneOf/2/allOf/1/properties\"},\"type\":\"object\"}],\"title\":\"Schematized Azure Pipeline\"},{\"allOf\":{\"$ref\":\"#/requestBody/content/application~1x-www-form-urlencoded/schema/oneOf/3/allOf/0/allOf\"},\"title\":\"Schematized GCS Pipeline\"}]}}},\"required\":true},\"responses\":{\"200\":{\"description\":\"Success\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"type\":\"string\"},\"status\":{\"enum\":[\"error\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized\"},\"403\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"$ref\":\"#/responses/401/content/application~1json/schema/properties\"},\"type\":\"object\"}}},\"description\":\"Forbidden\"}},\"security\":[{\"ServiceAccount\":[]},{\"ProjectSecret\":[]}],\"securitySchemes\":{\"OAuthToken\":{\"description\":\"OAuth Token\",\"scheme\":\"bearer\",\"type\":\"http\"},\"ProjectSecret\":{\"description\":\"Project Secret\",\"scheme\":\"basic\",\"type\":\"http\"},\"ServiceAccount\":{\"description\":\"Service Account\",\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/nessie/pipeline/edit","segments":[{"lit":"nessie"},{"lit":"pipeline"},{"lit":"edit"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"edit","name__orig":"edit","Name":"Edit","name_":"edit","name-":"edit","NAME":"EDIT","index$":2}, {"active":true,"entity":"edit","key$":"BasicEditFlow","kind":"basic","name":"BasicEditFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"edit_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0}]}, 'Edit')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const edit_ref01_ent = client.Edit()
    let edit_ref01_data = setup.data.new.edit['edit_ref01']

    edit_ref01_data = (await edit_ref01_ent.create(edit_ref01_data)).data()
    assert(null != edit_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/edit/EditTestData.json')

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
    ['edit01','edit02','edit03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MIXPANEL_DATA_PIPELINES_TEST_EDIT_ENTID': idmap,
    'MIXPANEL_DATA_PIPELINES_TEST_LIVE': 'FALSE',
    'MIXPANEL_DATA_PIPELINES_TEST_EXPLAIN': 'FALSE',
    'MIXPANEL_DATA_PIPELINES_APIKEY': '',
    'MIXPANEL_DATA_PIPELINES_SECRET': '',
    'MIXPANEL_DATA_PIPELINES_SERVER_SERVER': "data",
  })

  idmap = env['MIXPANEL_DATA_PIPELINES_TEST_EDIT_ENTID']

  const live = 'TRUE' === env.MIXPANEL_DATA_PIPELINES_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MIXPANEL_DATA_PIPELINES_TEST_EDIT_ENTID']
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
  
