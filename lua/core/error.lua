-- MixpanelDataPipelines SDK error

local MixpanelDataPipelinesError = {}
MixpanelDataPipelinesError.__index = MixpanelDataPipelinesError


function MixpanelDataPipelinesError.new(code, msg, ctx)
  local self = setmetatable({}, MixpanelDataPipelinesError)
  self.is_sdk_error = true
  self.sdk = "MixpanelDataPipelines"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function MixpanelDataPipelinesError:error()
  return self.msg
end


function MixpanelDataPipelinesError:__tostring()
  return self.msg
end


return MixpanelDataPipelinesError
