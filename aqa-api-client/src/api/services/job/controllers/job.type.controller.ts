import * as querystring from 'querystring';

import { JobBaseController } from './job.base.controller';
import {
    IControllerParams,
    INegativeTest,
    IPositiveTest,
    TTestType,
    TGetAllJobTypes,
    TCreateJobType,
    TUpdateJobType,
    TJobTypeResp,
    TAddJobSubType,
    TDeleteJobType,
} from '../../../../types';
import { Response } from '../../../../core/got';
import { JOB_JSON_SCHEMA_PATHS } from '../models/job.swagger.paths';
import { logStep } from '../../../../core/allure/step';

export class JobTypeController extends JobBaseController {
    constructor(params: IControllerParams) {
        super({
            ...params,
            endpoint: '/api/v1/types',
        });
    }

    public getAllJobTypes(params: IPositiveTest<TGetAllJobTypes>): Promise<Response<TJobTypeResp['getAll200']>>;
    public getAllJobTypes(params: INegativeTest): Promise<Response<unknown>>;
    @logStep()
    public getAllJobTypes(params: TTestType<TGetAllJobTypes>): Promise<Response<TJobTypeResp['create200']>> | Promise<Response<unknown>> {
        if (this.isPositive(params)) {
            return this.request()
                .method('get')
                .qs(querystring.stringify(params.positive.query))
                .jsonSchemaJsonPath(JOB_JSON_SCHEMA_PATHS.types.getAll)
                .send<TJobTypeResp['getAll200']>();
        }
        return this.request().method('get').qs(querystring.stringify(params.negative.query)).send();
    }

    public createJobType(params: IPositiveTest<TCreateJobType>): Promise<Response<TJobTypeResp['create200']>>;
    public createJobType(params: INegativeTest): Promise<Response<unknown>>;
    @logStep()
    public createJobType(params: TTestType<TCreateJobType>): Promise<Response<TJobTypeResp['create200']>> | Promise<Response<unknown>> {
        if (this.isPositive(params)) {
            return this.request()
                .method('post')
                .body(params.positive.body)
                .jsonSchemaJsonPath(JOB_JSON_SCHEMA_PATHS.types.create)
                .send<TJobTypeResp['create200']>();
        }
        return this.request().method('post').body(params.negative.body).send();
    }

    public updateJobType(params: IPositiveTest<TUpdateJobType>): Promise<Response<TJobTypeResp['update200']>>;
    public updateJobType(params: INegativeTest): Promise<Response<unknown>>;
    @logStep()
    public updateJobType(params: TTestType<TUpdateJobType>): Promise<Response<TJobTypeResp['update200']>> | Promise<Response<unknown>> {
        if (this.isPositive(params)) {
            return this.request()
                .method('put')
                .body(params.positive.body)
                .jsonSchemaJsonPath(JOB_JSON_SCHEMA_PATHS.types.update)
                .send<TJobTypeResp['update200']>();
        }
        return this.request().method('put').body(params.negative.body).send();
    }

    public addJobSubType(params: IPositiveTest<TAddJobSubType>): Promise<Response<TJobTypeResp['addSubType200']>>;
    public addJobSubType(params: INegativeTest): Promise<Response<unknown>>;
    @logStep()
    public addJobSubType(params: TTestType<TAddJobSubType>): Promise<Response<TJobTypeResp['addSubType200']>> | Promise<Response<unknown>> {
        if (this.isPositive(params)) {
            return this.request()
                .method('post')
                .url(`/${params.positive.path.typeId}/sub-types/`)
                .body(params.positive.body)
                .jsonSchemaJsonPath(JOB_JSON_SCHEMA_PATHS.types.addSubType)
                .send<TJobTypeResp['addSubType200']>();
        }
        return this.request().method('post').url(`/${params.negative.path.typeId}/sub-types/`).body(params.negative.body).send();
    }

    public deleteJobType(params: IPositiveTest<TDeleteJobType>): Promise<Response<TJobTypeResp['delete200']>>;
    public deleteJobType(params: INegativeTest): Promise<Response<unknown>>;
    @logStep()
    public deleteJobType(params: TTestType<TDeleteJobType>): Promise<Response<TJobTypeResp['delete200']>> | Promise<Response<unknown>> {
        if (this.isPositive(params)) {
            return this.request()
                .method('delete')
                .url(`/${params.positive.path.id}`)
                .body(params.positive.path)
                .jsonSchemaJsonPath(JOB_JSON_SCHEMA_PATHS.types.delete)
                .send<TJobTypeResp['delete200']>();
        }
        return this.request().method('delete').url(`/${params.negative.path.id}`).body(params.negative.body).send();
    }
}
