<?php
declare(strict_types=1);

// MixpanelDataPipelines SDK utility: result_headers

class MixpanelDataPipelinesResultHeaders
{
    public static function call(MixpanelDataPipelinesContext $ctx): ?MixpanelDataPipelinesResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
