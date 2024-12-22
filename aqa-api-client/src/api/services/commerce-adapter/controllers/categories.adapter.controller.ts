import { CommerceAdapterBaseController } from './commerce.adapter.base.controller';
import {
    IControllerParams,
    INegativeTest,
    IPositiveTest,
    TAddCategories200AdapterResp,
    TAddCategoriesAdapterParam,
    TDeleteCategory200AdapterResp,
    TDeleteCategoryAdapterParam,
    TFindCategories200AdapterResp,
    TFindCategoriesAdapterParam,
    TTestType,
} from '../../../../types';
import { logStep } from '../../../../core/allure/step';
import { Response } from '../../../../core/got';
import { COMMERCE_ADAPTER_JSON_SCHEMA_PATHS } from '../models/commerce.adapter.swagger.paths';

export class CategoriesAdapterController extends CommerceAdapterBaseController {
    constructor(params: IControllerParams) {
        super({
            ...params,
            endpoint: '/categories',
        });
    }

    public findCategories(params: IPositiveTest<TFindCategoriesAdapterParam>): Promise<Response<TFindCategories200AdapterResp>>;
    public findCategories(params: INegativeTest): Promise<Response<unknown>>;

    @logStep()
    public findCategories(params: TTestType<TFindCategoriesAdapterParam>): Promise<Response<TFindCategories200AdapterResp | unknown>> {
        if (this.isPositive(params)) {
            return this.request()
                .method('get')
                .url(`/${params.positive.path.merchantId}`)
                .qs(params.positive.query)
                .jsonSchemaJsonPath(COMMERCE_ADAPTER_JSON_SCHEMA_PATHS.categories.find)
                .send<TFindCategories200AdapterResp>();
        }
        return this.request().method('get').qs(params.negative.query).url(`/${params.negative.path}`).send();
    }

    public addCategories(params: IPositiveTest<TAddCategoriesAdapterParam>): Promise<Response<TAddCategories200AdapterResp>>;
    public addCategories(params: INegativeTest): Promise<Response<unknown>>;

    @logStep()
    public addCategories(params: TTestType<TAddCategoriesAdapterParam>): Promise<Response<TAddCategories200AdapterResp | unknown>> {
        if (this.isPositive(params)) {
            return this.request()
                .method('post')
                .url(`/${params.positive.path.merchantId}`)
                .body(params.positive.body)
                .jsonSchemaJsonPath(COMMERCE_ADAPTER_JSON_SCHEMA_PATHS.categories.add)
                .send<TAddCategories200AdapterResp>();
        }
        return this.request().method('post').url(`/${params.negative.path}`).body(params.negative.body).send();
    }

    public deleteCategory(params: IPositiveTest<TDeleteCategoryAdapterParam>): Promise<Response<TDeleteCategory200AdapterResp>>;
    public deleteCategory(params: INegativeTest): Promise<Response<unknown>>;

    @logStep()
    public deleteCategory(params: TTestType<TDeleteCategoryAdapterParam>): Promise<Response<TDeleteCategory200AdapterResp | unknown>> {
        if (this.isPositive(params)) {
            return this.request()
                .method('delete')
                .url(`/${params.positive.path.merchantId}/${params.positive.path.categoryId}`)
                .jsonSchemaJsonPath(COMMERCE_ADAPTER_JSON_SCHEMA_PATHS.categories.delete)
                .send<TDeleteCategory200AdapterResp>();
        }
        return this.request().method('delete').url(`/${params.negative.path.merchantId}/${params.negative.path.categoryId}`).send();
    }
}
