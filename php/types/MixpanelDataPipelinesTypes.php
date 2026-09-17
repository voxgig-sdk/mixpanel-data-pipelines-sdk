<?php
declare(strict_types=1);

// Typed models for the MixpanelDataPipelines SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Create entity data model. */
class Create
{
    public ?string $bigquery_dataset_name = null;
    public ?array $pipeline_names = null;
}

/** Request payload for Create#create. */
class CreateCreateData
{
    public ?string $bigquery_dataset_name = null;
    public ?array $pipeline_names = null;
}

/** DeletePipeline entity data model. */
class DeletePipeline
{
}

/** Request payload for DeletePipeline#create. */
class DeletePipelineCreateData
{
}

/** Edit entity data model. */
class Edit
{
}

/** Request payload for Edit#create. */
class EditCreateData
{
}

/** Pause entity data model. */
class Pause
{
}

/** Request payload for Pause#create. */
class PauseCreateData
{
}

/** PipelineStatus entity data model. */
class PipelineStatus
{
    public ?array $canceled = null;
    public ?array $retried = null;
    public ?array $succeeded = null;
}

/** Request payload for PipelineStatus#list. */
class PipelineStatusListMatch
{
    public string $name;
    public int $project_id;
    public ?array $status = null;
    public ?string $summary = null;
}

/** Resume entity data model. */
class Resume
{
}

/** Request payload for Resume#create. */
class ResumeCreateData
{
}

/** RetrievePipeline entity data model. */
class RetrievePipeline
{
    public ?array $day_syncs = null;
}

/** Request payload for RetrievePipeline#load. */
class RetrievePipelineLoadMatch
{
    public ?string $name = null;
    public int $project_id;
}

