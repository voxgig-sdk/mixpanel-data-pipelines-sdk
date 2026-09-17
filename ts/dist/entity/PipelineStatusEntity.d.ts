import { MixpanelDataPipelinesEntityBase } from '../MixpanelDataPipelinesEntityBase';
import type { MixpanelDataPipelinesSDK } from '../MixpanelDataPipelinesSDK';
import type { Control } from '../types';
import type { PipelineStatus, PipelineStatusListMatch } from '../MixpanelDataPipelinesTypes';
declare class PipelineStatusEntity extends MixpanelDataPipelinesEntityBase<PipelineStatus> {
    constructor(client: MixpanelDataPipelinesSDK, entopts: any);
    make(this: PipelineStatusEntity): PipelineStatusEntity;
    list(this: any, reqmatch?: PipelineStatusListMatch, ctrl?: Control): Promise<PipelineStatusEntity[]>;
}
export { PipelineStatusEntity };
