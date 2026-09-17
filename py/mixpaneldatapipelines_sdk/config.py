# MixpanelDataPipelines SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "MixpanelDataPipelines",
            "slug": "mixpanel-data-pipelines",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "debug": {
        "options": {
          "active": False,
          "max": 100,
          "redact": [
            "authorization",
            "cookie",
            "set-cookie",
            "api-key",
            "apikey",
            "x-api-key",
            "idempotency-key",
          ],
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "onEntry": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "idempotency": {
        "options": {
          "active": False,
          "header": "Idempotency-Key",
          "methods": [
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
          ],
          "ops": [
            "create",
            "update",
            "remove",
          ],
        },
        "optspec": {
          "keygen": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "metrics": {
        "options": {
          "active": False,
        },
        "optspec": {
          "now": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "paging": {
        "options": {
          "active": False,
          "afterVar": "after",
          "cursorParam": "cursor",
          "firstVar": "first",
          "limitParam": "limit",
          "pageParam": "page",
          "startPage": 1,
        },
        "optspec": {
          "limit": "`$NUMBER`",
          "ops": "`$LIST`",
        },
        "strict": False,
        "transport": "none",
      },
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://{server}.mixpanel.com/api/2.0",
            "server": {
                "server": "data",
            },
            "auth": {
                "prefix": "Basic",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "create": {},
                "delete_pipeline": {},
                "edit": {},
                "pause": {},
                "pipeline_status": {},
                "resume": {},
                "retrieve_pipeline": {},
            },
        },
        "entity": {
      "create": {
        "fields": [
          {
            "name": "bigquery_dataset_name",
            "type": "`$STRING`",
          },
          {
            "name": "pipeline_names",
            "type": "`$ARRAY`",
          },
        ],
        "name": "create",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/nessie/pipeline/create",
                "segments": [
                  {
                    "lit": "nessie",
                  },
                  {
                    "lit": "pipeline",
                  },
                  {
                    "lit": "create",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "nessie",
                  "pipeline",
                  "create",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "delete_pipeline": {
        "fields": [],
        "name": "delete_pipeline",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/nessie/pipeline/cancel",
                "segments": [
                  {
                    "lit": "nessie",
                  },
                  {
                    "lit": "pipeline",
                  },
                  {
                    "lit": "cancel",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "nessie",
                  "pipeline",
                  "cancel",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "edit": {
        "fields": [],
        "name": "edit",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/nessie/pipeline/edit",
                "segments": [
                  {
                    "lit": "nessie",
                  },
                  {
                    "lit": "pipeline",
                  },
                  {
                    "lit": "edit",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "nessie",
                  "pipeline",
                  "edit",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "pause": {
        "fields": [],
        "name": "pause",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/nessie/pipeline/pause",
                "segments": [
                  {
                    "lit": "nessie",
                  },
                  {
                    "lit": "pipeline",
                  },
                  {
                    "lit": "pause",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "nessie",
                  "pipeline",
                  "pause",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "pipeline_status": {
        "fields": [
          {
            "name": "canceled",
            "type": "`$ARRAY`",
          },
          {
            "name": "retried",
            "type": "`$ARRAY`",
          },
          {
            "name": "succeeded",
            "type": "`$ARRAY`",
          },
        ],
        "name": "pipeline_status",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "name",
                      "orig": "name",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "project_id",
                      "orig": "project_id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "status",
                      "orig": "status",
                      "type": "`$ARRAY`",
                    },
                    {
                      "kind": "query",
                      "name": "summary",
                      "orig": "summary",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/nessie/pipeline/status",
                "segments": [
                  {
                    "lit": "nessie",
                  },
                  {
                    "lit": "pipeline",
                  },
                  {
                    "lit": "status",
                  },
                ],
                "select": {
                  "exist": [
                    "name",
                    "project_id",
                    "status",
                    "summary",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "nessie",
                  "pipeline",
                  "status",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "resume": {
        "fields": [],
        "name": "resume",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/nessie/pipeline/resume",
                "segments": [
                  {
                    "lit": "nessie",
                  },
                  {
                    "lit": "pipeline",
                  },
                  {
                    "lit": "resume",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "nessie",
                  "pipeline",
                  "resume",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "retrieve_pipeline": {
        "fields": [
          {
            "name": "9876543210",
            "type": "`$ARRAY`",
          },
          {
            "name": "day_syncs",
            "type": "`$ARRAY`",
          },
        ],
        "name": "retrieve_pipeline",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "name",
                      "orig": "name",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "project_id",
                      "orig": "project_id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/nessie/pipeline/timeline",
                "segments": [
                  {
                    "lit": "nessie",
                  },
                  {
                    "lit": "pipeline",
                  },
                  {
                    "lit": "timeline",
                  },
                ],
                "select": {
                  "exist": [
                    "name",
                    "project_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "nessie",
                  "pipeline",
                  "timeline",
                ],
              },
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "project_id",
                      "orig": "project_id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/nessie/pipeline/jobs",
                "segments": [
                  {
                    "lit": "nessie",
                  },
                  {
                    "lit": "pipeline",
                  },
                  {
                    "lit": "jobs",
                  },
                ],
                "select": {
                  "exist": [
                    "project_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "nessie",
                  "pipeline",
                  "jobs",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
