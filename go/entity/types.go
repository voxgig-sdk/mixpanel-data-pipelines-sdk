// Typed models for the MixpanelDataPipelines SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/mixpanel-data-pipelines-sdk/go/core"
)

// Create is the typed data model for the create entity.
type Create struct {
	BigqueryDatasetName *string `json:"bigquery_dataset_name,omitempty"`
	PipelineNames *[]any `json:"pipeline_names,omitempty"`
}

// CreateCreateData is the typed request payload for Create.CreateTyped.
type CreateCreateData struct {
	BigqueryDatasetName *string `json:"bigquery_dataset_name,omitempty"`
	PipelineNames *[]any `json:"pipeline_names,omitempty"`
}

// DeletePipeline is the typed data model for the delete_pipeline entity.
type DeletePipeline struct {
}

// DeletePipelineCreateData is the typed request payload for DeletePipeline.CreateTyped.
type DeletePipelineCreateData struct {
}

// Edit is the typed data model for the edit entity.
type Edit struct {
}

// EditCreateData is the typed request payload for Edit.CreateTyped.
type EditCreateData struct {
}

// Pause is the typed data model for the pause entity.
type Pause struct {
}

// PauseCreateData is the typed request payload for Pause.CreateTyped.
type PauseCreateData struct {
}

// PipelineStatus is the typed data model for the pipeline_status entity.
type PipelineStatus struct {
	Canceled *[]any `json:"canceled,omitempty"`
	Retried *[]any `json:"retried,omitempty"`
	Succeeded *[]any `json:"succeeded,omitempty"`
}

// PipelineStatusListMatch is the typed request payload for PipelineStatus.ListTyped.
type PipelineStatusListMatch struct {
	Name string `json:"name"`
	ProjectId int `json:"project_id"`
	Status *[]any `json:"status,omitempty"`
	Summary *string `json:"summary,omitempty"`
}

// Resume is the typed data model for the resume entity.
type Resume struct {
}

// ResumeCreateData is the typed request payload for Resume.CreateTyped.
type ResumeCreateData struct {
}

// RetrievePipeline is the typed data model for the retrieve_pipeline entity.
type RetrievePipeline struct {
	F9876543210 *[]any `json:"9876543210,omitempty"`
	DaySyncs *[]any `json:"day_syncs,omitempty"`
}

// RetrievePipelineLoadMatch is the typed request payload for RetrievePipeline.LoadTyped.
type RetrievePipelineLoadMatch struct {
	Name *string `json:"name,omitempty"`
	ProjectId int `json:"project_id"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
