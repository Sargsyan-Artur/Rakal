import * as querystring from 'querystring';

import { MerchantHierarchyBaseController } from './merchant.hierarchy.base.controller';
import {
    IControllerParams,
    INegativeTest,
    IPositiveTest,
    TTestType,
    TGetMerchantsParam,
    TGetMerchants200Resp,
    TGetMerchantParam,
    TGetMerchant200Resp,
    TGetChildrenParam,
    TGetChildren200Resp,
} from '../../../../types';
import { Response } from '../../../../core/got';
import { MERCHANT_JSON_SCHEMA_PATHS } from '../models/merchant.swagger.paths';
import { logStep } from '../../../../core/allure/step';

export class MerchantController extends MerchantHierarchyBaseController {
    constructor(params: IControllerParams) {
        super({
            ...params,
            endpoint: '/api/v1/merchants',
        });
    }

    public getMerchants(params: IPositiveTest<TGetMerchantsParam>): Promise<Response<TGetMerchants200Resp>>;
    public getMerchants(params: INegativeTest): Promise<Response<unknown>>;
    @logStep()
    public getMerchants(params: TTestType<TGetMerchantsParam>): Promise<Response<TGetMerchants200Resp | unknown>> {
        if (this.isPositive(params)) {
            const query = querystring.stringify(params.positive.query);

            return this.request()
                .method('get')
                .qs(query)
                .jsonSchemaJsonPath(MERCHANT_JSON_SCHEMA_PATHS.merchant.all)
                .send<TGetMerchants200Resp>();
        }
        return this.request().method('get').qs(params.negative.query).send();
    }

    public getMerchantById(params: IPositiveTest<TGetMerchantParam>): Promise<Response<TGetMerchant200Resp>>;
    public getMerchantById(params: INegativeTest): Promise<Response<unknown>>;
    @logStep()
    public getMerchantById(params: TTestType<TGetMerchantParam>): Promise<Response<TGetMerchant200Resp | unknown>> {
        if (this.isPositive(params)) {
            return this.request()
                .method('get')
                .url(`/${params.positive.path.merchantId}`)
                .qs(params.positive.query)
                .jsonSchemaJsonPath(MERCHANT_JSON_SCHEMA_PATHS.merchant.byId)
                .send<TGetMerchant200Resp>();
        }

        return this.request().method('get').url(`/${params.negative.path.merchantId}`).qs(params.negative.query).send();
    }

    public getMerchantChildrenById(params: IPositiveTest<TGetChildrenParam>): Promise<Response<TGetChildren200Resp>>;
    public getMerchantChildrenById(params: INegativeTest): Promise<Response<unknown>>;
    @logStep()
    public getMerchantChildrenById(params: TTestType<TGetChildrenParam>): Promise<Response<TGetChildren200Resp | unknown>> {
        if (this.isPositive(params)) {
            const query = querystring.stringify(params.positive.query);

            return this.request()
                .method('get')
                .url(`/${params.positive.path.merchantId}/children`)
                .qs(query)
                .jsonSchemaJsonPath(MERCHANT_JSON_SCHEMA_PATHS.merchant.children)
                .send<TGetChildren200Resp>();
        }

        return this.request().method('get').url(`/${params.negative.path.merchantId}/children`).qs(params.negative.query).send();
    }
}
