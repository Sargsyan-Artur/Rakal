import { UsersBaseController } from './users.base.controller';
import { IControllerParams, INegativeTest, IPositiveTest, TCreateUserParam, TCreateUserResponse201, TTestType } from '../../../../types';
import { Response } from '../../../../core/got';
import { logStep } from '../../../../core/allure/step';

export class UsersController extends UsersBaseController {
    constructor(params: IControllerParams) {
        super({
            ...params,
            endpoint: '/api/v1/users',
        });
    }

    public createUser(params: IPositiveTest<TCreateUserParam>): Promise<Response<TCreateUserResponse201>>;
    public createUser(params: INegativeTest): Promise<Response<unknown>>;
    @logStep()
    public createUser(params: TTestType<TCreateUserParam>): Promise<Response<TCreateUserParam | unknown>> {
        if (this.isPositive(params)) {
            const { body, headerOptions } = params.positive;
            return this.request()
                .method('POST')
                .body(body)
                .headers(headerOptions?.headers ?? {}, headerOptions?.isNew)
                .send<TCreateUserResponse201>();
        }
        const { body, headerOptions } = params.negative;
        return this.request()
            .method('POST')
            .body(body)
            .headers(headerOptions?.headers ?? {}, headerOptions?.isNew)
            .send<unknown>();
    }
}
