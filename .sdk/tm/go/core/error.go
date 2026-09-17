package core

type MixpanelDataPipelinesError struct {
	IsMixpanelDataPipelinesError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewMixpanelDataPipelinesError(code string, msg string, ctx *Context) *MixpanelDataPipelinesError {
	return &MixpanelDataPipelinesError{
		IsMixpanelDataPipelinesError: true,
		Sdk:              "MixpanelDataPipelines",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *MixpanelDataPipelinesError) Error() string {
	return e.Msg
}
