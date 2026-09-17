-- Typed models for the MixpanelDataPipelines SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Create
---@field bigquery_dataset_name? string
---@field pipeline_names? table

---@class CreateCreateData
---@field bigquery_dataset_name? string
---@field pipeline_names? table

---@class DeletePipeline

---@class DeletePipelineCreateData

---@class Edit

---@class EditCreateData

---@class Pause

---@class PauseCreateData

---@class PipelineStatus
---@field canceled? table
---@field retried? table
---@field succeeded? table

---@class PipelineStatusListMatch
---@field name string
---@field project_id number
---@field status? table
---@field summary? string

---@class Resume

---@class ResumeCreateData

---@class RetrievePipeline
---@field ["9876543210"]? table
---@field day_syncs? table

---@class RetrievePipelineLoadMatch
---@field name? string
---@field project_id number

local M = {}

return M
