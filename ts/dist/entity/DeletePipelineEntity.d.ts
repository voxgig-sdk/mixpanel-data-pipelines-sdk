import { MixpanelDataPipelinesEntityBase } from '../MixpanelDataPipelinesEntityBase';
import type { MixpanelDataPipelinesSDK } from '../MixpanelDataPipelinesSDK';
import type { Control } from '../types';
import type { DeletePipeline, DeletePipelineCreateData } from '../MixpanelDataPipelinesTypes';
declare class DeletePipelineEntity extends MixpanelDataPipelinesEntityBase<DeletePipeline> {
    constructor(client: MixpanelDataPipelinesSDK, entopts: any);
    make(this: DeletePipelineEntity): DeletePipelineEntity;
    create(this: any, reqdata?: DeletePipelineCreateData, ctrl?: Control): Promise<DeletePipelineEntity>;
}
export { DeletePipelineEntity };
