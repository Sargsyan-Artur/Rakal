import { IOperations } from '../../api/services/job/models/job.swagger.types';

export type TTypeControllerKey = 'type';
export type TSubTypeControllerKey = 'subType';
export type TJobControllersKeys = TTypeControllerKey | TSubTypeControllerKey;

export type TJobServiceKey = 'job';

/**
 * Types for controllers' parameters
 */
export type TGetAllJobTypes = IOperations['getAll']['parameters'];
export type TCreateJobType = {
    body: IOperations['createType']['requestBody']['content']['application/json'];
};
export type TUpdateJobType = {
    body: IOperations['update']['requestBody']['content']['application/json'];
};
export type TAddJobSubType = {
    path: IOperations['addSubType']['parameters']['path'];
    body: IOperations['addSubType']['requestBody']['content']['application/json'];
};
export type TDeleteJobType = {
    path: IOperations['delete']['parameters']['path'];
};

export type TUpdateJobSubType = {
    body: IOperations['update_1']['requestBody']['content']['application/json'];
};
export type TDeleteJobSubType = IOperations['delete_1']['parameters'];

/**
 * Returned types of controllers
 */

export type TJobTypeResp = {
    create200: IOperations['createType']['responses']['200']['content']['*/*'];
    getAll200: IOperations['getAll']['responses']['200']['content']['*/*'];
    update200: IOperations['update']['responses']['200']['content']['*/*'];
    addSubType200: IOperations['addSubType']['responses']['200']['content']['*/*'];
    delete200: IOperations['delete']['responses']['200'];
};

export type TJobSubTypeResp = {
    update200: IOperations['update_1']['responses']['200']['content']['*/*'];
    delete200: IOperations['delete_1']['responses']['200'];
};
