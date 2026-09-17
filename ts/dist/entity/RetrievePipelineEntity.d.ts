import { MixpanelDataPipelinesEntityBase } from '../MixpanelDataPipelinesEntityBase';
import type { MixpanelDataPipelinesSDK } from '../MixpanelDataPipelinesSDK';
import type { Control } from '../types';
import type { RetrievePipeline, RetrievePipelineLoadMatch } from '../MixpanelDataPipelinesTypes';
declare class RetrievePipelineEntity extends MixpanelDataPipelinesEntityBase<RetrievePipeline> {
    constructor(client: MixpanelDataPipelinesSDK, entopts: any);
    make(this: RetrievePipelineEntity): RetrievePipelineEntity;
    load(this: any, reqmatch?: RetrievePipelineLoadMatch, ctrl?: Control): Promise<RetrievePipelineEntity>;
}
export { RetrievePipelineEntity };
