-- Create entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("mixpanel-data-pipelines_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

describe("CreateEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:Create(nil)
    assert.is_not_nil(ent)
  end)

  it("should run basic flow", function()
    local setup = create_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "create." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    -- The basic flow consumes synthetic IDs from the fixture. In live mode
    -- without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup.synthetic_only then
      pending("live entity test uses synthetic IDs from fixture — set MIXPANEL_DATA_PIPELINES_TEST_CREATE_ENTID JSON to run live")
      return
    end
    local client = setup.client

    -- CREATE
    local create_ref01_ent = client:Create(nil)
    local create_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.create"), "create_ref01"))

    local create_ref01_data_result, err = create_ref01_ent:create(create_ref01_data, nil)
    assert.is_nil(err)
    create_ref01_data = helpers.to_map(type(create_ref01_data_result) == 'table' and create_ref01_data_result.data_get and create_ref01_data_result:data_get() or create_ref01_data_result)
    assert.is_not_nil(create_ref01_data)

  end)
end)

function create_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/create/CreateTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read create test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "create01", "create02", "create03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Detect ENTID env override before envOverride consumes it. When live
  -- mode is on without a real override, the basic test runs against synthetic
  -- IDs from the fixture and 4xx's. Surface this so the test can skip.
  local entid_env_raw = os.getenv("MIXPANEL_DATA_PIPELINES_TEST_CREATE_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["MIXPANEL_DATA_PIPELINES_TEST_CREATE_ENTID"] = idmap,
    ["MIXPANEL_DATA_PIPELINES_TEST_LIVE"] = "FALSE",
    ["MIXPANEL_DATA_PIPELINES_TEST_EXPLAIN"] = "FALSE",
    ["MIXPANEL_DATA_PIPELINES_APIKEY"] = "",
    ["MIXPANEL_DATA_PIPELINES_SERVER_SERVER"] = "data",
  })

  local idmap_resolved = helpers.to_map(
    env["MIXPANEL_DATA_PIPELINES_TEST_CREATE_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["MIXPANEL_DATA_PIPELINES_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      -- FIRST, so the generated fields below win: sdk-test-control.json's
      -- test.client.options adds to the live client, it does not redirect it.
      runner.live_client_options(),
      {
        apikey = env["MIXPANEL_DATA_PIPELINES_APIKEY"],
        server = {
          ["server"] = env["MIXPANEL_DATA_PIPELINES_SERVER_SERVER"],
        },
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["MIXPANEL_DATA_PIPELINES_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["MIXPANEL_DATA_PIPELINES_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
