export interface Create {
    bigquery_dataset_name?: string;
    pipeline_names?: any[];
}
export interface CreateCreateData {
    bigquery_dataset_name?: string;
    pipeline_names?: any[];
}
export interface DeletePipeline {
}
export interface DeletePipelineCreateData {
}
export interface Edit {
}
export interface EditCreateData {
}
export interface Pause {
}
export interface PauseCreateData {
}
export interface PipelineStatus {
    canceled?: any[];
    retried?: any[];
    succeeded?: any[];
}
export interface PipelineStatusListMatch {
    name: string;
    project_id: number;
    status?: any[];
    summary?: string;
}
export interface Resume {
}
export interface ResumeCreateData {
}
export interface RetrievePipeline {
    "9876543210"?: any[];
    day_syncs?: any[];
}
export interface RetrievePipelineLoadMatch {
    name?: string;
    project_id: number;
}
