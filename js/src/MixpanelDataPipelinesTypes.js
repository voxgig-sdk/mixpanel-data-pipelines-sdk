// Typed models for the MixpanelDataPipelines SDK (JSDoc typedefs).
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
// edit by hand.

/**
 * @typedef {Object} Create
 * @property {string} [bigquery_dataset_name]
 * @property {Array} [pipeline_names]
 */

/**
 * @typedef {Object} CreateCreateData
 * @property {string} [bigquery_dataset_name]
 * @property {Array} [pipeline_names]
 */

/**
 * @typedef {Object} DeletePipeline
 */

/**
 * @typedef {Object} DeletePipelineCreateData
 */

/**
 * @typedef {Object} Edit
 */

/**
 * @typedef {Object} EditCreateData
 */

/**
 * @typedef {Object} Pause
 */

/**
 * @typedef {Object} PauseCreateData
 */

/**
 * @typedef {Object} PipelineStatus
 * @property {Array} [canceled]
 * @property {Array} [retried]
 * @property {Array} [succeeded]
 */

/**
 * @typedef {Object} PipelineStatusListMatch
 * @property {string} name
 * @property {number} project_id
 * @property {Array} [status]
 * @property {string} [summary]
 */

/**
 * @typedef {Object} Resume
 */

/**
 * @typedef {Object} ResumeCreateData
 */

/**
 * @typedef {Object} RetrievePipeline
 * @property {Array} ["9876543210"]
 * @property {Array} [day_syncs]
 */

/**
 * @typedef {Object} RetrievePipelineLoadMatch
 * @property {string} [name]
 * @property {number} project_id
 */

