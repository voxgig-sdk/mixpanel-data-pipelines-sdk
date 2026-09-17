package voxgigmixpaneldatapipelinessdk

import (
	"github.com/voxgig-sdk/mixpanel-data-pipelines-sdk/go/core"
	"github.com/voxgig-sdk/mixpanel-data-pipelines-sdk/go/entity"
	"github.com/voxgig-sdk/mixpanel-data-pipelines-sdk/go/feature"
	_ "github.com/voxgig-sdk/mixpanel-data-pipelines-sdk/go/utility"
)

// Type aliases preserve external API.
type MixpanelDataPipelinesSDK = core.MixpanelDataPipelinesSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type MixpanelDataPipelinesEntity = core.MixpanelDataPipelinesEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type MixpanelDataPipelinesError = core.MixpanelDataPipelinesError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewDebugFeatureFunc = func() core.Feature {
		return feature.NewDebugFeature()
	}
	core.NewIdempotencyFeatureFunc = func() core.Feature {
		return feature.NewIdempotencyFeature()
	}
	core.NewMetricsFeatureFunc = func() core.Feature {
		return feature.NewMetricsFeature()
	}
	core.NewPagingFeatureFunc = func() core.Feature {
		return feature.NewPagingFeature()
	}
	core.NewRatelimitFeatureFunc = func() core.Feature {
		return feature.NewRatelimitFeature()
	}
	core.NewRetryFeatureFunc = func() core.Feature {
		return feature.NewRetryFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewTimeoutFeatureFunc = func() core.Feature {
		return feature.NewTimeoutFeature()
	}
	core.NewCreateEntityFunc = func(client *core.MixpanelDataPipelinesSDK, entopts map[string]any) core.MixpanelDataPipelinesEntity {
		return entity.NewCreateEntity(client, entopts)
	}
	core.NewDeletePipelineEntityFunc = func(client *core.MixpanelDataPipelinesSDK, entopts map[string]any) core.MixpanelDataPipelinesEntity {
		return entity.NewDeletePipelineEntity(client, entopts)
	}
	core.NewEditEntityFunc = func(client *core.MixpanelDataPipelinesSDK, entopts map[string]any) core.MixpanelDataPipelinesEntity {
		return entity.NewEditEntity(client, entopts)
	}
	core.NewPauseEntityFunc = func(client *core.MixpanelDataPipelinesSDK, entopts map[string]any) core.MixpanelDataPipelinesEntity {
		return entity.NewPauseEntity(client, entopts)
	}
	core.NewPipelineStatusEntityFunc = func(client *core.MixpanelDataPipelinesSDK, entopts map[string]any) core.MixpanelDataPipelinesEntity {
		return entity.NewPipelineStatusEntity(client, entopts)
	}
	core.NewResumeEntityFunc = func(client *core.MixpanelDataPipelinesSDK, entopts map[string]any) core.MixpanelDataPipelinesEntity {
		return entity.NewResumeEntity(client, entopts)
	}
	core.NewRetrievePipelineEntityFunc = func(client *core.MixpanelDataPipelinesSDK, entopts map[string]any) core.MixpanelDataPipelinesEntity {
		return entity.NewRetrievePipelineEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewMixpanelDataPipelinesSDK = core.NewMixpanelDataPipelinesSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewMixpanelDataPipelinesSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *MixpanelDataPipelinesSDK  { return NewMixpanelDataPipelinesSDK(nil) }
func Test() *MixpanelDataPipelinesSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewDebugFeature = feature.NewDebugFeature
var NewIdempotencyFeature = feature.NewIdempotencyFeature
var NewMetricsFeature = feature.NewMetricsFeature
var NewPagingFeature = feature.NewPagingFeature
var NewRatelimitFeature = feature.NewRatelimitFeature
var NewRetryFeature = feature.NewRetryFeature
var NewTestFeature = feature.NewTestFeature
var NewTimeoutFeature = feature.NewTimeoutFeature
