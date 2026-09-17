# MixpanelDataPipelines SDK exists test

import pytest
from mixpaneldatapipelines_sdk import MixpanelDataPipelinesSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = MixpanelDataPipelinesSDK.test(None, None)
        assert testsdk is not None
