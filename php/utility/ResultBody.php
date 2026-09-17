<?php
declare(strict_types=1);

// MixpanelDataPipelines SDK utility: result_body

class MixpanelDataPipelinesResultBody
{
    public static function call(MixpanelDataPipelinesContext $ctx): ?MixpanelDataPipelinesResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
