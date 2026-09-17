# Typed models for the MixpanelDataPipelines SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Create(TypedDict, total=False):
    bigquery_dataset_name: str
    pipeline_names: list


class CreateCreateData(TypedDict, total=False):
    bigquery_dataset_name: str
    pipeline_names: list


class DeletePipeline(TypedDict):
    pass


class DeletePipelineCreateData(TypedDict):
    pass


class Edit(TypedDict):
    pass


class EditCreateData(TypedDict):
    pass


class Pause(TypedDict):
    pass


class PauseCreateData(TypedDict):
    pass


class PipelineStatus(TypedDict, total=False):
    canceled: list
    retried: list
    succeeded: list


class PipelineStatusListMatchRequired(TypedDict):
    name: str
    project_id: int


class PipelineStatusListMatch(PipelineStatusListMatchRequired, total=False):
    status: list
    summary: str


class Resume(TypedDict):
    pass


class ResumeCreateData(TypedDict):
    pass


class RetrievePipeline(TypedDict, total=False):
    day_syncs: list


class RetrievePipelineLoadMatchRequired(TypedDict):
    project_id: int


class RetrievePipelineLoadMatch(RetrievePipelineLoadMatchRequired, total=False):
    name: str
