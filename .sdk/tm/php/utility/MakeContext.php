<?php
declare(strict_types=1);

// MixpanelDataPipelines SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class MixpanelDataPipelinesMakeContext
{
    public static function call(array $ctxmap, ?MixpanelDataPipelinesContext $basectx): MixpanelDataPipelinesContext
    {
        return new MixpanelDataPipelinesContext($ctxmap, $basectx);
    }
}
