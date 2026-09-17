# MixpanelDataPipelines SDK utility: make_context

from projectname_sdk.core.context import MixpanelDataPipelinesContext


def make_context_util(ctxmap, basectx):
    return MixpanelDataPipelinesContext(ctxmap, basectx)
