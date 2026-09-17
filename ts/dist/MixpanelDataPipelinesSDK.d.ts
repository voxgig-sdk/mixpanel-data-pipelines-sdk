import { CreateEntity } from './entity/CreateEntity';
import { DeletePipelineEntity } from './entity/DeletePipelineEntity';
import { EditEntity } from './entity/EditEntity';
import { PauseEntity } from './entity/PauseEntity';
import { PipelineStatusEntity } from './entity/PipelineStatusEntity';
import { ResumeEntity } from './entity/ResumeEntity';
import { RetrievePipelineEntity } from './entity/RetrievePipelineEntity';
export type * from './MixpanelDataPipelinesTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { MixpanelDataPipelinesEntityBase } from './MixpanelDataPipelinesEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class MixpanelDataPipelinesSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Create(entopts?: Record<string, any>): CreateEntity;
    DeletePipeline(entopts?: Record<string, any>): DeletePipelineEntity;
    Edit(entopts?: Record<string, any>): EditEntity;
    Pause(entopts?: Record<string, any>): PauseEntity;
    PipelineStatus(entopts?: Record<string, any>): PipelineStatusEntity;
    Resume(entopts?: Record<string, any>): ResumeEntity;
    RetrievePipeline(entopts?: Record<string, any>): RetrievePipelineEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): MixpanelDataPipelinesSDK;
    tester(testopts?: any, sdkopts?: any): MixpanelDataPipelinesSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof MixpanelDataPipelinesSDK;
export { stdutil, config, BaseFeature, MixpanelDataPipelinesEntityBase, MixpanelDataPipelinesSDK, SDK, };
