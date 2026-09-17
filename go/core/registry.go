package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewDebugFeatureFunc func() Feature

var NewIdempotencyFeatureFunc func() Feature

var NewMetricsFeatureFunc func() Feature

var NewPagingFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewCreateEntityFunc func(client *MixpanelDataPipelinesSDK, entopts map[string]any) MixpanelDataPipelinesEntity

var NewDeletePipelineEntityFunc func(client *MixpanelDataPipelinesSDK, entopts map[string]any) MixpanelDataPipelinesEntity

var NewEditEntityFunc func(client *MixpanelDataPipelinesSDK, entopts map[string]any) MixpanelDataPipelinesEntity

var NewPauseEntityFunc func(client *MixpanelDataPipelinesSDK, entopts map[string]any) MixpanelDataPipelinesEntity

var NewPipelineStatusEntityFunc func(client *MixpanelDataPipelinesSDK, entopts map[string]any) MixpanelDataPipelinesEntity

var NewResumeEntityFunc func(client *MixpanelDataPipelinesSDK, entopts map[string]any) MixpanelDataPipelinesEntity

var NewRetrievePipelineEntityFunc func(client *MixpanelDataPipelinesSDK, entopts map[string]any) MixpanelDataPipelinesEntity

