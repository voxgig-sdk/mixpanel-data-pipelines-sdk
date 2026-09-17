import { MixpanelDataPipelinesEntityBase } from '../MixpanelDataPipelinesEntityBase';
import type { MixpanelDataPipelinesSDK } from '../MixpanelDataPipelinesSDK';
import type { Control } from '../types';
import type { Edit, EditCreateData } from '../MixpanelDataPipelinesTypes';
declare class EditEntity extends MixpanelDataPipelinesEntityBase<Edit> {
    constructor(client: MixpanelDataPipelinesSDK, entopts: any);
    make(this: EditEntity): EditEntity;
    create(this: any, reqdata?: EditCreateData, ctrl?: Control): Promise<EditEntity>;
}
export { EditEntity };
