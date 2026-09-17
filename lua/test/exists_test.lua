-- MixpanelDataPipelines SDK exists test

local sdk = require("mixpanel-data-pipelines_sdk")

describe("MixpanelDataPipelinesSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
