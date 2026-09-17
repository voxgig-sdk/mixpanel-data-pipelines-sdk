import { MixpanelDataPipelinesEntityBase } from '../MixpanelDataPipelinesEntityBase';
import type { MixpanelDataPipelinesSDK } from '../MixpanelDataPipelinesSDK';
import type { Control } from '../types';
import type { Pause, PauseCreateData } from '../MixpanelDataPipelinesTypes';
declare class PauseEntity extends MixpanelDataPipelinesEntityBase<Pause> {
    constructor(client: MixpanelDataPipelinesSDK, entopts: any);
    make(this: PauseEntity): PauseEntity;
    create(this: any, reqdata?: PauseCreateData, ctrl?: Control): Promise<PauseEntity>;
}
export { PauseEntity };
