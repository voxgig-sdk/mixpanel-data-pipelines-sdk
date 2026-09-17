import { MixpanelDataPipelinesEntityBase } from '../MixpanelDataPipelinesEntityBase';
import type { MixpanelDataPipelinesSDK } from '../MixpanelDataPipelinesSDK';
import type { Control } from '../types';
import type { Resume, ResumeCreateData } from '../MixpanelDataPipelinesTypes';
declare class ResumeEntity extends MixpanelDataPipelinesEntityBase<Resume> {
    constructor(client: MixpanelDataPipelinesSDK, entopts: any);
    make(this: ResumeEntity): ResumeEntity;
    create(this: any, reqdata?: ResumeCreateData, ctrl?: Control): Promise<ResumeEntity>;
}
export { ResumeEntity };
