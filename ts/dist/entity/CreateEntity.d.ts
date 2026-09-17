import { MixpanelDataPipelinesEntityBase } from '../MixpanelDataPipelinesEntityBase';
import type { MixpanelDataPipelinesSDK } from '../MixpanelDataPipelinesSDK';
import type { Control } from '../types';
import type { Create, CreateCreateData } from '../MixpanelDataPipelinesTypes';
declare class CreateEntity extends MixpanelDataPipelinesEntityBase<Create> {
    constructor(client: MixpanelDataPipelinesSDK, entopts: any);
    make(this: CreateEntity): CreateEntity;
    create(this: any, reqdata?: CreateCreateData, ctrl?: Control): Promise<CreateEntity>;
}
export { CreateEntity };
