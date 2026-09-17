# mixpanel-data-pipelines-mcp

[MCP](https://modelcontextprotocol.io) server exposing the MixpanelDataPipelines SDK as
two agent tools — `mixpanel-data-pipelines_list` and `mixpanel-data-pipelines_load` — built on the
[official Go MCP SDK](https://github.com/modelcontextprotocol/go-sdk) and the
sibling Go SDK at `../go`. Runs over **stdio** (default, for spawnable installs)
or **streamable HTTP** (one shared server for several agents).

## Examples

```sh
# 1. Build a native binary (-> dist/<os>-<arch>/mixpanel-data-pipelines-mcp)
make build

# 2. Provide credentials via the environment
export MIXPANEL_DATA_PIPELINES_APIKEY=sk_live_xxx

# 3a. Install into Claude Code over stdio (most common)
claude mcp add --scope user mixpanel-data-pipelines \
  -- /absolute/path/to/mixpanel-data-pipelines-mcp -transport stdio

# 3b. …or run a shared HTTP server instead
./mixpanel-data-pipelines-mcp -transport http -addr :8080
```

Tool-call arguments (what an agent sends):

```jsonc
// mixpanel-data-pipelines_list: first page of records
{ "entity": "pipeline_status" }
{ "entity": "pipeline_status", "query": { } }

// mixpanel-data-pipelines_load: one record by id
{ "entity": "retrieve_pipeline", "query": { "id": 1 } }
```

> The rest of this guide follows the [Diátaxis](https://diataxis.fr) framework:
> a hands-on **Tutorial**, task-focused **How-to guides**, a factual
> **Reference**, and background **Explanation**.

## Tutorial: install and call a tool

1. **Build** the server from this `go-mcp/` directory:

   ```sh
   make build          # -> dist/<os>-<arch>/mixpanel-data-pipelines-mcp
   ```

2. **Set your API key:**

   ```sh
   export MIXPANEL_DATA_PIPELINES_APIKEY=sk_live_xxx
   ```

3. **Install it into Claude Code** (stdio transport):

   ```sh
   claude mcp add --scope user mixpanel-data-pipelines \
     -- "$PWD"/dist/*/mixpanel-data-pipelines-mcp -transport stdio
   ```

4. **Restart Claude Code.** The `mixpanel-data-pipelines_list` and `mixpanel-data-pipelines_load` tools now appear
   in new sessions. Ask the agent to *"list pipeline_status using mixpanel-data-pipelines"*
   and it calls `mixpanel-data-pipelines_list` with `{"entity":"pipeline_status"}`.

## How-to guides

### Authenticate and choose an environment

Configuration is read from the environment — nothing is written to disk:

```sh
export MIXPANEL_DATA_PIPELINES_APIKEY=sk_live_xxx            # API key
export MIXPANEL_DATA_PIPELINES_BASE=https://api.example.com  # optional: override the API base URL
```

Set these in the shell that launches the server (or in the `claude mcp add`
environment) so every tool call is authenticated.

### Run as a shared HTTP server

```sh
./mixpanel-data-pipelines-mcp -transport http -addr :8080
```

Streamable HTTP lets several agents share one running process; stdio (the
default) spawns a fresh process per client.

### Call the `mixpanel-data-pipelines_list` tool

Args: `entity` (required), `query` (optional filter map). Returns the first
page of records as JSON:

```jsonc
{ "entity": "pipeline_status" }
```

### Call the `mixpanel-data-pipelines_load` tool

Args: `entity` (required), `query` = `{"id":N}` (required). Returns the single
record as JSON:

```jsonc
{ "entity": "retrieve_pipeline", "query": { "id": 1 } }
```

### Cross-compile release binaries

```sh
make build       # native binary for this machine
make build-all   # linux/darwin/windows x amd64/arm64, under dist/<os>-<arch>/
```

## Reference

### Tools

| Tool | Args | Returns |
|------|------|---------|
| `mixpanel-data-pipelines_list` | `entity` (required), `query` (optional map) | First page of records as JSON |
| `mixpanel-data-pipelines_load` | `entity` (required), `query` = `{id:N}` | Single record as JSON |

On error, a tool returns an MCP error result (`isError: true`) whose text is the
failure message (e.g. unknown entity, or an API error).

### `Args` schema

Both tools take the same argument object:

| Field | Type | Notes |
|-------|------|-------|
| `entity` | string | One of the 7 supported entities (see below). |
| `query` | object | Optional match map. `{"id":N}` for load; omit or `{}` for list. |

JSON schemas are emitted by the SDK from the `Args` struct's `json` /
`jsonschema` tags — no schema is hand-written.

### Transports & flags

| Flag | Default | Purpose |
|------|---------|---------|
| `-transport` | `stdio` | `stdio` (spawnable) or `http` (streamable HTTP). |
| `-addr` | `:8080` | Listen address for the `http` transport. |

### Environment variables

| Variable | Purpose |
|----------|---------|
| `MIXPANEL_DATA_PIPELINES_APIKEY` | API key sent with every request. |
| `MIXPANEL_DATA_PIPELINES_BASE` | Optional override of the API base URL. |

### Entities

The 7 entities valid as the `entity` argument:

create | delete_pipeline | edit | pause | pipeline_status | resume | retrieve_pipeline

### Smoke test via HTTP (raw JSON-RPC)

```sh
./mixpanel-data-pipelines-mcp -transport http -addr :18080 &

# initialize, grab the session id
curl -sN -X POST http://localhost:18080 \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json, text/event-stream' \
  -D headers \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-06-18","capabilities":{},"clientInfo":{"name":"smoke","version":"0"}}}'

SESSION=$(awk '/Mcp-Session-Id/ {print $2}' headers | tr -d '\r')

curl -sN -X POST http://localhost:18080 \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json, text/event-stream' \
  -H "Mcp-Session-Id: $SESSION" \
  -d '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"mixpanel-data-pipelines_load","arguments":{"entity":"retrieve_pipeline","query":{"id":1}}}}'
```

## Explanation

### How tools map to the SDK

`main.go` builds the SDK client (configured from the environment) and registers
two tools. Each dispatches on the `entity` argument to the matching entity in
the sibling Go SDK at `../go`, calls `List` or `Load`, unwraps the `Entity`
wrappers to plain data, and returns it as pretty-printed JSON.

### Why two transports

**stdio** is the standard for agent hosts that spawn a server per client
(Claude Code's `claude mcp add`). **streamable HTTP** keeps one process running
that many agents can share — handy for a long-lived deployment.

### Schema generation

The input schema is derived from the `Args` Go struct's `json` / `jsonschema`
tags at registration time, so the advertised tool schema can never drift from
the code that consumes it.

## Generated by

sdkgen `go-mcp` target. See the target source under `.sdk/src/cmp/go-mcp/` in
this repo, or upstream at
`github.com/voxgig/sdkgen/project/.sdk/src/cmp/go-mcp/`.
