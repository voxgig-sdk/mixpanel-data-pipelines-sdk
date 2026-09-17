-- MixpanelDataPipelines SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "MixpanelDataPipelines",
      slug = "mixpanel-data-pipelines",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["debug"] = {
        ["options"] = {
          ["active"] = false,
          ["max"] = 100,
          ["redact"] = {
            "authorization",
            "cookie",
            "set-cookie",
            "api-key",
            "apikey",
            "x-api-key",
            "idempotency-key",
          },
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["onEntry"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "none",
      },
      ["idempotency"] = {
        ["options"] = {
          ["active"] = false,
          ["header"] = "Idempotency-Key",
          ["methods"] = {
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
          },
          ["ops"] = {
            "create",
            "update",
            "remove",
          },
        },
        ["optspec"] = {
          ["keygen"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "none",
      },
      ["metrics"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "none",
      },
      ["paging"] = {
        ["options"] = {
          ["active"] = false,
          ["afterVar"] = "after",
          ["cursorParam"] = "cursor",
          ["firstVar"] = "first",
          ["limitParam"] = "limit",
          ["pageParam"] = "page",
          ["startPage"] = 1,
        },
        ["optspec"] = {
          ["limit"] = "`$NUMBER`",
          ["ops"] = "`$LIST`",
        },
        ["strict"] = false,
        ["transport"] = "none",
      },
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://{server}.mixpanel.com/api/2.0",
      server = {
        ["server"] = "data",
      },
      auth = {
        prefix = "Basic",
      },
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["create"] = {},
        ["delete_pipeline"] = {},
        ["edit"] = {},
        ["pause"] = {},
        ["pipeline_status"] = {},
        ["resume"] = {},
        ["retrieve_pipeline"] = {},
      },
    },
    entity = {
      ["create"] = {
        ["fields"] = {
          {
            ["name"] = "bigquery_dataset_name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "pipeline_names",
            ["type"] = "`$ARRAY`",
          },
        },
        ["name"] = "create",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/nessie/pipeline/create",
                ["segments"] = {
                  {
                    ["lit"] = "nessie",
                  },
                  {
                    ["lit"] = "pipeline",
                  },
                  {
                    ["lit"] = "create",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "nessie",
                  "pipeline",
                  "create",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["delete_pipeline"] = {
        ["fields"] = {},
        ["name"] = "delete_pipeline",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/nessie/pipeline/cancel",
                ["segments"] = {
                  {
                    ["lit"] = "nessie",
                  },
                  {
                    ["lit"] = "pipeline",
                  },
                  {
                    ["lit"] = "cancel",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "nessie",
                  "pipeline",
                  "cancel",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["edit"] = {
        ["fields"] = {},
        ["name"] = "edit",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/nessie/pipeline/edit",
                ["segments"] = {
                  {
                    ["lit"] = "nessie",
                  },
                  {
                    ["lit"] = "pipeline",
                  },
                  {
                    ["lit"] = "edit",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "nessie",
                  "pipeline",
                  "edit",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["pause"] = {
        ["fields"] = {},
        ["name"] = "pause",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/nessie/pipeline/pause",
                ["segments"] = {
                  {
                    ["lit"] = "nessie",
                  },
                  {
                    ["lit"] = "pipeline",
                  },
                  {
                    ["lit"] = "pause",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "nessie",
                  "pipeline",
                  "pause",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["pipeline_status"] = {
        ["fields"] = {
          {
            ["name"] = "canceled",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "retried",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "succeeded",
            ["type"] = "`$ARRAY`",
          },
        },
        ["name"] = "pipeline_status",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "name",
                      ["orig"] = "name",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "project_id",
                      ["orig"] = "project_id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "status",
                      ["orig"] = "status",
                      ["type"] = "`$ARRAY`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "summary",
                      ["orig"] = "summary",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/nessie/pipeline/status",
                ["segments"] = {
                  {
                    ["lit"] = "nessie",
                  },
                  {
                    ["lit"] = "pipeline",
                  },
                  {
                    ["lit"] = "status",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "name",
                    "project_id",
                    "status",
                    "summary",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "nessie",
                  "pipeline",
                  "status",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["resume"] = {
        ["fields"] = {},
        ["name"] = "resume",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/nessie/pipeline/resume",
                ["segments"] = {
                  {
                    ["lit"] = "nessie",
                  },
                  {
                    ["lit"] = "pipeline",
                  },
                  {
                    ["lit"] = "resume",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "nessie",
                  "pipeline",
                  "resume",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["retrieve_pipeline"] = {
        ["fields"] = {
          {
            ["name"] = "9876543210",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "day_syncs",
            ["type"] = "`$ARRAY`",
          },
        },
        ["name"] = "retrieve_pipeline",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "name",
                      ["orig"] = "name",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "project_id",
                      ["orig"] = "project_id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/nessie/pipeline/timeline",
                ["segments"] = {
                  {
                    ["lit"] = "nessie",
                  },
                  {
                    ["lit"] = "pipeline",
                  },
                  {
                    ["lit"] = "timeline",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "name",
                    "project_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "nessie",
                  "pipeline",
                  "timeline",
                },
              },
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "project_id",
                      ["orig"] = "project_id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/nessie/pipeline/jobs",
                ["segments"] = {
                  {
                    ["lit"] = "nessie",
                  },
                  {
                    ["lit"] = "pipeline",
                  },
                  {
                    ["lit"] = "jobs",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "project_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "nessie",
                  "pipeline",
                  "jobs",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
