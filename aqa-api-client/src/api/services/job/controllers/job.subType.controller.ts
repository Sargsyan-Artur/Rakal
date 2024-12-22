import { JobBaseController } from './job.base.controller';
import {
    IControllerParams,
    INegativeTest,
    IPositiveTest,
    TDeleteJobSubType,
    TJobSubTypeResp,
    TTestType,
    TUpdateJobSubType,
} from '../../../../types';
import { Response } from '../../../../core/got';
import { JOB_JSON_SCHEMA_PATHS } from '../models/job.swagger.paths';
import { logStep } from '../../../../core/allure/step';

export class JobSubTypeController extends JobBaseController {
    constructor(params: IControllerParams) {
        super({
            ...params,
            endpoint: '/api/v1/sub-types',
        });
    }

    public updateJobSubType(params: IPositiveTest<TUpdateJobSubType>): Promise<Response<TJobSubTypeResp['update200']>>;
    public updateJobSubType(params: INegativeTest): Promise<Response<unknown>>;
    @logStep()
    public updateJobSubType(params: TTestType<TUpdateJobSubType>): Promise<Response<TJobSubTypeResp['update200'] | unknown>> {
        if (this.isPositive(params)) {
            return this.request()
                .method('put')
                .body(params.positive.body)
                .jsonSchemaJsonPath(JOB_JSON_SCHEMA_PATHS.subTypes.update)
                .send<TJobSubTypeResp['update200']>();
        }
        return this.request().method('put').body(params.negative.body).send();
    }

    public deleteJobSubType(params: IPositiveTest<TDeleteJobSubType>): Promise<Response<TJobSubTypeResp['delete200']>>;
    public deleteJobSubType(params: INegativeTest): Promise<Response<unknown>>;
    @logStep()
    public deleteJobSubType(params: TTestType<TDeleteJobSubType>): Promise<Response<TJobSubTypeResp['delete200'] | unknown>> {
        if (this.isPositive(params)) {
            return this.request()
                .method('delete')
                .url(`/${params.positive.path.subTypeId}`)
                .body(params.positive.path)
                .jsonSchemaJsonPath(JOB_JSON_SCHEMA_PATHS.subTypes.delete)
                .send<TJobSubTypeResp['delete200']>();
        }
        return this.request().method('delete').url(`/${params.negative.path.subTypeId}`).body(params.negative.body).send();
    }
}
