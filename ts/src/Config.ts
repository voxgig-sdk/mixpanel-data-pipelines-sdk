
import { BaseFeature } from './feature/base/BaseFeature'
import { DebugFeature } from './feature/debug/DebugFeature'
import { IdempotencyFeature } from './feature/idempotency/IdempotencyFeature'
import { MetricsFeature } from './feature/metrics/MetricsFeature'
import { PagingFeature } from './feature/paging/PagingFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   debug: DebugFeature,
 idempotency: IdempotencyFeature,
 metrics: MetricsFeature,
 paging: PagingFeature,
 ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'MixpanelDataPipelines',
        slug: "mixpanel-data-pipelines",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     debug:     {
      "options": {
        "active": false,
        "max": 100,
        "redact": [
          "authorization",
          "cookie",
          "set-cookie",
          "api-key",
          "apikey",
          "x-api-key",
          "idempotency-key"
        ]
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "onEntry": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "none"
    },
 idempotency:     {
      "options": {
        "active": false,
        "header": "Idempotency-Key",
        "methods": [
          "POST",
          "PUT",
          "PATCH",
          "DELETE"
        ],
        "ops": [
          "create",
          "update",
          "remove"
        ]
      },
      "optspec": {
        "keygen": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "none"
    },
 metrics:     {
      "options": {
        "active": false
      },
      "optspec": {
        "now": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "none"
    },
 paging:     {
      "options": {
        "active": false,
        "afterVar": "after",
        "cursorParam": "cursor",
        "firstVar": "first",
        "limitParam": "limit",
        "pageParam": "page",
        "startPage": 1
      },
      "optspec": {
        "limit": "`$NUMBER`",
        "ops": "`$LIST`"
      },
      "strict": false,
      "transport": "none"
    },
 ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
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
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://{server}.mixpanel.com/api/2.0",

    server: {
      "server": "data",
    },

    auth: {
      prefix: 'Basic',
      basic: true,
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        create: {
        },
  
        delete_pipeline: {
        },
  
        edit: {
        },
  
        pause: {
        },
  
        pipeline_status: {
        },
  
        resume: {
        },
  
        retrieve_pipeline: {
        },
  
    }
  }


  entity = {
    "create": {
      "fields": [
        {
          "name": "bigquery_dataset_name",
          "type": "`$STRING`"
        },
        {
          "name": "pipeline_names",
          "type": "`$ARRAY`"
        }
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
                  "lit": "nessie"
                },
                {
                  "lit": "pipeline"
                },
                {
                  "lit": "create"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "nessie",
                "pipeline",
                "create"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
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
                  "lit": "nessie"
                },
                {
                  "lit": "pipeline"
                },
                {
                  "lit": "cancel"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "nessie",
                "pipeline",
                "cancel"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
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
                  "lit": "nessie"
                },
                {
                  "lit": "pipeline"
                },
                {
                  "lit": "edit"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "nessie",
                "pipeline",
                "edit"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
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
                  "lit": "nessie"
                },
                {
                  "lit": "pipeline"
                },
                {
                  "lit": "pause"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "nessie",
                "pipeline",
                "pause"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "pipeline_status": {
      "fields": [
        {
          "name": "canceled",
          "type": "`$ARRAY`"
        },
        {
          "name": "retried",
          "type": "`$ARRAY`"
        },
        {
          "name": "succeeded",
          "type": "`$ARRAY`"
        }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "project_id",
                    "orig": "project_id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "status",
                    "orig": "status",
                    "type": "`$ARRAY`"
                  },
                  {
                    "kind": "query",
                    "name": "summary",
                    "orig": "summary",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/nessie/pipeline/status",
              "segments": [
                {
                  "lit": "nessie"
                },
                {
                  "lit": "pipeline"
                },
                {
                  "lit": "status"
                }
              ],
              "select": {
                "exist": [
                  "name",
                  "project_id",
                  "status",
                  "summary"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "nessie",
                "pipeline",
                "status"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
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
                  "lit": "nessie"
                },
                {
                  "lit": "pipeline"
                },
                {
                  "lit": "resume"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "nessie",
                "pipeline",
                "resume"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "retrieve_pipeline": {
      "fields": [
        {
          "name": "9876543210",
          "type": "`$ARRAY`"
        },
        {
          "name": "day_syncs",
          "type": "`$ARRAY`"
        }
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
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "project_id",
                    "orig": "project_id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/nessie/pipeline/timeline",
              "segments": [
                {
                  "lit": "nessie"
                },
                {
                  "lit": "pipeline"
                },
                {
                  "lit": "timeline"
                }
              ],
              "select": {
                "exist": [
                  "name",
                  "project_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "nessie",
                "pipeline",
                "timeline"
              ]
            },
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "project_id",
                    "orig": "project_id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/nessie/pipeline/jobs",
              "segments": [
                {
                  "lit": "nessie"
                },
                {
                  "lit": "pipeline"
                },
                {
                  "lit": "jobs"
                }
              ],
              "select": {
                "exist": [
                  "project_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "nessie",
                "pipeline",
                "jobs"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

