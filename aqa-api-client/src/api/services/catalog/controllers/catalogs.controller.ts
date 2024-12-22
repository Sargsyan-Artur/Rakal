import { CatalogBaseController } from './catalog.base.controller';
import {
    IControllerParams,
    INegativeTest,
    IPositiveTest,
    TAddCategoriesCatalog200Resp,
    TAddCategoriesCatalogParam,
    TFindAllCatalog200Resp,
    TFindAllCatalogParam,
    TFindAllDefaultCatalog200Resp,
    TRemoveCategoryCatalog,
    TRemoveCategoryCatalog204Resp,
    TTestType,
} from '../../../../types';
import { logStep } from '../../../../core/allure/step';
import { Response } from '../../../../core/got';
import { CATALOG_JSON_SCHEMA_PATHS } from '../models/catalog.swagger.paths';

export class CatalogsController extends CatalogBaseController {
    constructor(params: IControllerParams) {
        super({
            ...params,
            endpoint: '/catalogs',
        });
    }

    public findAll(params: IPositiveTest<TFindAllCatalogParam>): Promise<Response<TFindAllCatalog200Resp>>;
    public findAll(params: INegativeTest): Promise<Response<unknown>>;
    @logStep()
    public findAll(params: TTestType<TFindAllCatalogParam>): Promise<Response<TFindAllCatalog200Resp | unknown>> {
        if (this.isPositive(params)) {
            return this.request()
                .method('get')
                .url(`/${params.positive.path.merchantId}`)
                .qs(params.positive.query)
                .jsonSchemaJsonPath(CATALOG_JSON_SCHEMA_PATHS.catalogs.findAll)
                .send<TFindAllCatalog200Resp>();
        }
        return this.request().method('get').url(`/${params.negative.path}`).qs(params.negative.query).send();
    }

    public findAllDefault(): Promise<Response<TFindAllDefaultCatalog200Resp>>;
    public findAllDefault(params: INegativeTest): Promise<Response<unknown>>;
    @logStep()
    public findAllDefault(params?: INegativeTest): Promise<Response<TFindAllDefaultCatalog200Resp | unknown>> {
        if (params && this.isNegative(params)) {
            return this.request().method('get').url('/default').qs(params.negative.query).send();
        }
        return this.request()
            .method('get')
            .url('/default')
            .jsonSchemaJsonPath(CATALOG_JSON_SCHEMA_PATHS.catalogs.findAll)
            .send<TFindAllDefaultCatalog200Resp>();
    }

    public addCategories(params: IPositiveTest<TAddCategoriesCatalogParam>): Promise<Response<TAddCategoriesCatalog200Resp>>;
    public addCategories(params: INegativeTest): Promise<Response<unknown>>;
    @logStep()
    public addCategories(params: TTestType<TAddCategoriesCatalogParam>): Promise<Response<TAddCategoriesCatalog200Resp | unknown>> {
        if (this.isPositive(params)) {
            return this.request()
                .method('post')
                .url(`/${params.positive.path.merchantId}`)
                .body(params.positive.body)
                .jsonSchemaJsonPath(CATALOG_JSON_SCHEMA_PATHS.catalogs.addCategories)
                .send<TAddCategoriesCatalog200Resp>();
        }
        return this.request().method('post').url(`/${params.negative.path}`).body(params.negative.body).send();
    }

    public removeCategory(params: IPositiveTest<TRemoveCategoryCatalog>): Promise<Response<TRemoveCategoryCatalog204Resp>>;
    public removeCategory(params: INegativeTest): Promise<Response<unknown>>;
    @logStep()
    public removeCategory(params: TTestType<TRemoveCategoryCatalog>): Promise<Response<TRemoveCategoryCatalog204Resp | unknown>> {
        if (this.isPositive(params)) {
            return this.request()
                .method('delete')
                .url(`/${params.positive.path.merchantId}/category/${params.positive.path.categoryId}`)
                .jsonSchemaJsonPath(CATALOG_JSON_SCHEMA_PATHS.catalogs.removeCategory)
                .send<TRemoveCategoryCatalog204Resp>();
        }
        return this.request().method('delete').url(params.negative.path).send();
    }
}
