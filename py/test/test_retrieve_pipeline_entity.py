# RetrievePipeline entity test

import json
import os
import time

import pytest

from mixpaneldatapipelines_sdk.utility.voxgig_struct import voxgig_struct as vs
from mixpaneldatapipelines_sdk import MixpanelDataPipelinesSDK
from mixpaneldatapipelines_sdk.core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestRetrievePipelineEntity:

    def test_should_create_instance(self):
        testsdk = MixpanelDataPipelinesSDK.test(None, None)
        ent = testsdk.RetrievePipeline(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _retrieve_pipeline_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "retrieve_pipeline." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set MIXPANEL_DATA_PIPELINES_TEST_RETRIEVE_PIPELINE_ENTID JSON to run live")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        retrieve_pipeline_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.retrieve_pipeline")))
        retrieve_pipeline_ref01_data = None
        if len(retrieve_pipeline_ref01_data_raw) > 0:
            retrieve_pipeline_ref01_data = helpers.to_map(retrieve_pipeline_ref01_data_raw[0][1])

        # LOAD
        retrieve_pipeline_ref01_ent = client.RetrievePipeline(None)
        retrieve_pipeline_ref01_match_dt0 = {}
        retrieve_pipeline_ref01_data_dt0_loaded = retrieve_pipeline_ref01_ent.load(retrieve_pipeline_ref01_match_dt0, None)
        assert retrieve_pipeline_ref01_data_dt0_loaded is not None



def _retrieve_pipeline_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/retrieve_pipeline/RetrievePipelineTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = MixpanelDataPipelinesSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["retrieve_pipeline01", "retrieve_pipeline02", "retrieve_pipeline03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "MIXPANEL_DATA_PIPELINES_TEST_RETRIEVE_PIPELINE_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "MIXPANEL_DATA_PIPELINES_TEST_RETRIEVE_PIPELINE_ENTID": idmap,
        "MIXPANEL_DATA_PIPELINES_TEST_LIVE": "FALSE",
        "MIXPANEL_DATA_PIPELINES_TEST_EXPLAIN": "FALSE",
        "MIXPANEL_DATA_PIPELINES_APIKEY": "",
        "MIXPANEL_DATA_PIPELINES_SERVER_SERVER": "data",
    })

    idmap_resolved = helpers.to_map(
        env.get("MIXPANEL_DATA_PIPELINES_TEST_RETRIEVE_PIPELINE_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("MIXPANEL_DATA_PIPELINES_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            # FIRST, so the generated fields below win: sdk-test-control.json's
            # test.client.options adds to the live client, it does not
            # redirect it.
            runner.live_client_options(),
            {
                "apikey": env.get("MIXPANEL_DATA_PIPELINES_APIKEY"),
                "server": {
                    "server": env.get("MIXPANEL_DATA_PIPELINES_SERVER_SERVER"),
                },
            },
            extra or {},
        ])
        client = MixpanelDataPipelinesSDK(helpers.to_map(merged_opts))

    _live = env.get("MIXPANEL_DATA_PIPELINES_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("MIXPANEL_DATA_PIPELINES_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
