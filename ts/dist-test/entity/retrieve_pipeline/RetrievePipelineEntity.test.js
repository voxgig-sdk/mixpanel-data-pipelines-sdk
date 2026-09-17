"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('RetrievePipelineEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when MIXPANEL_DATA_PIPELINES_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('MIXPANEL_DATA_PIPELINES_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.MixpanelDataPipelinesSDK.test();
        const ent = testsdk.RetrievePipeline();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.MIXPANEL_DATA_PIPELINES_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'retrieve_pipeline.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "9876543210", "req": false, "type": "`$ARRAY`", "index$": 0 }, { "active": true, "name": "day_syncs", "req": false, "type": "`$ARRAY`", "index$": 1 }], "name": "retrieve_pipeline", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "name", "orig": "name", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "query", "name": "project_id", "orig": "project_id", "reqd": true, "type": "`$INTEGER`", "index$": 1 }] }, "contract": { "id": "GET /nessie/pipeline/timeline", "json": "{\"operationId\":\"list-warehouse-pipeline-sync-dates\",\"parameters\":[{\"description\":\"Required if using service account to authenticate request.\",\"in\":\"query\",\"name\":\"project_id\",\"required\":true,\"schema\":{\"type\":\"integer\"}},{\"description\":\"The name that uniquely identifies the pipeline.\",\"in\":\"query\",\"name\":\"name\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"example\":{\"value\":{\"day_syncs\":[{\"date\":\"2019-08-19\",\"status\":\"synced\",\"sync_times\":[\"2019-08-19 14:27:46.044605 -0700 PDT\"]},{\"date\":\"2019-08-20\",\"status\":\"synced\",\"sync_times\":[\" 2019-08-20 14:33:09.315098 -0700 PDT\"]}]}}}}},\"description\":\"Success\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"type\":\"string\"},\"status\":{\"enum\":[\"error\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized\"},\"403\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"$ref\":\"#/responses/401/content/application~1json/schema/properties\"},\"type\":\"object\"}}},\"description\":\"Forbidden\"}},\"security\":[{\"ServiceAccount\":[]},{\"ProjectSecret\":[]}],\"securitySchemes\":{\"OAuthToken\":{\"description\":\"OAuth Token\",\"scheme\":\"bearer\",\"type\":\"http\"},\"ProjectSecret\":{\"description\":\"Project Secret\",\"scheme\":\"basic\",\"type\":\"http\"},\"ServiceAccount\":{\"description\":\"Service Account\",\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/nessie/pipeline/timeline", "segments": [{ "lit": "nessie" }, { "lit": "pipeline" }, { "lit": "timeline" }], "select": { "exist": ["name", "project_id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "project_id", "orig": "project_id", "reqd": true, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "GET /nessie/pipeline/jobs", "json": "{\"operationId\":\"list-warehouse-pipeline-jobs\",\"parameters\":[{\"description\":\"Required if using service account to authenticate request.\",\"in\":\"query\",\"name\":\"project_id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"example\":{\"value\":{\"9876543210\":[{\"Dispatcher\":\"backfill\",\"frequency\":\"hourly\",\"last_dispatched\":\"2019-02-01 12:00:00 US/Pacific\",\"name\":\"events-daily-bigquery-monoschema\",\"sync_enabled\":\"true\"}]}}}}},\"description\":\"Success\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"type\":\"string\"},\"status\":{\"enum\":[\"error\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized\"},\"403\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"$ref\":\"#/responses/401/content/application~1json/schema/properties\"},\"type\":\"object\"}}},\"description\":\"Forbidden\"}},\"security\":[{\"ServiceAccount\":[]},{\"ProjectSecret\":[]}],\"securitySchemes\":{\"OAuthToken\":{\"description\":\"OAuth Token\",\"scheme\":\"bearer\",\"type\":\"http\"},\"ProjectSecret\":{\"description\":\"Project Secret\",\"scheme\":\"basic\",\"type\":\"http\"},\"ServiceAccount\":{\"description\":\"Service Account\",\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/nessie/pipeline/jobs", "segments": [{ "lit": "nessie" }, { "lit": "pipeline" }, { "lit": "jobs" }], "select": { "exist": ["project_id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "retrieve_pipeline", "name__orig": "retrieve_pipeline", "Name": "RetrievePipeline", "name_": "retrieve_pipeline", "name-": "retrieve-pipeline", "NAME": "RETRIEVE_PIPELINE", "index$": 6 }, { "active": true, "entity": "retrieve_pipeline", "key$": "BasicRetrievePipelineFlow", "kind": "basic", "name": "BasicRetrievePipelineFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "retrieve_pipeline_ref01", "srcdatavar": "retrieve_pipeline_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-retrieve_pipeline_ref01" } }], "index$": 0 }] }, 'RetrievePipeline');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let retrieve_pipeline_ref01_data = Object.values(setup.data.existing.retrieve_pipeline)[0];
        // LOAD
        const retrieve_pipeline_ref01_ent = client.RetrievePipeline();
        const retrieve_pipeline_ref01_match_dt0 = {};
        const retrieve_pipeline_ref01_data_dt0 = (await retrieve_pipeline_ref01_ent.load(retrieve_pipeline_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != retrieve_pipeline_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/retrieve_pipeline/RetrievePipelineTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.MixpanelDataPipelinesSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['retrieve_pipeline01', 'retrieve_pipeline02', 'retrieve_pipeline03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'MIXPANEL_DATA_PIPELINES_TEST_RETRIEVE_PIPELINE_ENTID': idmap,
        'MIXPANEL_DATA_PIPELINES_TEST_LIVE': 'FALSE',
        'MIXPANEL_DATA_PIPELINES_TEST_EXPLAIN': 'FALSE',
        'MIXPANEL_DATA_PIPELINES_APIKEY': '',
        'MIXPANEL_DATA_PIPELINES_SECRET': '',
        'MIXPANEL_DATA_PIPELINES_SERVER_SERVER': "data",
    });
    idmap = env['MIXPANEL_DATA_PIPELINES_TEST_RETRIEVE_PIPELINE_ENTID'];
    const live = 'TRUE' === env.MIXPANEL_DATA_PIPELINES_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['MIXPANEL_DATA_PIPELINES_TEST_RETRIEVE_PIPELINE_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.MixpanelDataPipelinesSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
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
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=RetrievePipelineEntity.test.js.map