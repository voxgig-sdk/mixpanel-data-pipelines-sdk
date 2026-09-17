# MixpanelDataPipelines SDK feature factory

from mixpaneldatapipelines_sdk.feature.base_feature import MixpanelDataPipelinesBaseFeature
from mixpaneldatapipelines_sdk.feature.debug_feature import MixpanelDataPipelinesDebugFeature
from mixpaneldatapipelines_sdk.feature.idempotency_feature import MixpanelDataPipelinesIdempotencyFeature
from mixpaneldatapipelines_sdk.feature.metrics_feature import MixpanelDataPipelinesMetricsFeature
from mixpaneldatapipelines_sdk.feature.paging_feature import MixpanelDataPipelinesPagingFeature
from mixpaneldatapipelines_sdk.feature.ratelimit_feature import MixpanelDataPipelinesRatelimitFeature
from mixpaneldatapipelines_sdk.feature.retry_feature import MixpanelDataPipelinesRetryFeature
from mixpaneldatapipelines_sdk.feature.test_feature import MixpanelDataPipelinesTestFeature
from mixpaneldatapipelines_sdk.feature.timeout_feature import MixpanelDataPipelinesTimeoutFeature


_FEATURES = {
    "base": lambda: MixpanelDataPipelinesBaseFeature(),
    "debug": lambda: MixpanelDataPipelinesDebugFeature(),
    "idempotency": lambda: MixpanelDataPipelinesIdempotencyFeature(),
    "metrics": lambda: MixpanelDataPipelinesMetricsFeature(),
    "paging": lambda: MixpanelDataPipelinesPagingFeature(),
    "ratelimit": lambda: MixpanelDataPipelinesRatelimitFeature(),
    "retry": lambda: MixpanelDataPipelinesRetryFeature(),
    "test": lambda: MixpanelDataPipelinesTestFeature(),
    "timeout": lambda: MixpanelDataPipelinesTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
