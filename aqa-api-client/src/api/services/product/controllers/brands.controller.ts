import { ProductBaseController } from './product.base.controller';
import {
    IControllerParams,
    INegativeTest,
    IPositiveTest,
    TCreateBrand201Resp,
    TCreateBrandParam,
    TDeleteBrand204Resp,
    TDeleteBrandParam,
    TExistsBrand200Resp,
    TExistsBrandParam,
    TFindAllBrands200Resp,
    TFindAllBrandsParam,
    TGetBrandById200Resp,
    TGetBrandByIdParam,
    TPatchBrand200Resp,
    TPatchBrandParam,
    TTestType,
    TUpdateBrand200Resp,
    TUpdateBrandParam,
} from '../../../../types';
import { PRODUCT_JSON_SCHEMA_PATHS } from '../models/product.swagger.paths';
import { Response } from '../../../../core/got';
import { logStep } from '../../../../core/allure/step';

export class BrandsController extends ProductBaseController {
    constructor(params: IControllerParams) {
        super({
            ...params,
            endpoint: '/brands',
        });
    }

    public findAll(params: IPositiveTest<TFindAllBrandsParam>): Promise<Response<TFindAllBrands200Resp>>;
    public findAll(params: INegativeTest): Promise<Response<unknown>>;

    @logStep()
    public findAll(params: TTestType<TFindAllBrandsParam>): Promise<Response<TFindAllBrands200Resp | unknown>> {
        if (this.isPositive(params)) {
            return this.request()
                .method('get')
                .qs(params.positive.query)
                .jsonSchemaJsonPath(PRODUCT_JSON_SCHEMA_PATHS.brands.findAll)
                .send<TFindAllBrands200Resp>();
        }
        return this.request().method('get').qs(params.negative.query).body(params.negative.body).send();
    }

    public createBrand(params: IPositiveTest<TCreateBrandParam>): Promise<Response<TCreateBrand201Resp>>;
    public createBrand(params: INegativeTest): Promise<Response<unknown>>;

    @logStep()
    public createBrand(params: TTestType<TCreateBrandParam>): Promise<TCreateBrand201Resp | unknown> {
        if (this.isPositive(params)) {
            return this.request()
                .method('post')
                .body(params.positive.body)
                .jsonSchemaJsonPath(PRODUCT_JSON_SCHEMA_PATHS.brands.create)
                .send<TCreateBrand201Resp>();
        }
        return this.request().method('post').body(params.negative.body).qs(params.negative.query).send();
    }

    public deleteBrand(params: IPositiveTest<TDeleteBrandParam>): Promise<Response<TDeleteBrand204Resp>>;
    public deleteBrand(params: INegativeTest): Promise<Response<unknown>>;

    @logStep()
    public deleteBrand(params: TTestType<TDeleteBrandParam>): Promise<Response<TDeleteBrand204Resp | unknown>> {
        if (this.isPositive(params)) {
            return this.request().method('delete').url(`/${params.positive.path.id}`).send<TDeleteBrand204Resp>();
        }
        return this.request()
            .method('delete')
            .body(params.negative.body)
            .url(`/${params.negative.path.id}`)
            .qs(params.negative.query)
            .send();
    }

    public getBrandById(params: IPositiveTest<TGetBrandByIdParam>): Promise<Response<TGetBrandById200Resp>>;
    public getBrandById(params: INegativeTest): Promise<Response<unknown>>;

    @logStep()
    public getBrandById(params: TTestType<TGetBrandByIdParam>): Promise<Response<TGetBrandById200Resp | unknown>> {
        if (this.isPositive(params)) {
            return this.request()
                .method('get')
                .url(`/${params.positive.path.id}`)
                .jsonSchemaJsonPath(PRODUCT_JSON_SCHEMA_PATHS.brands.getById)
                .send<TGetBrandById200Resp>();
        }
        return this.request().method('get').body(params.negative.body).url(`/${params.negative.path.id}`).qs(params.negative.query).send();
    }

    public updateBrand(params: IPositiveTest<TUpdateBrandParam>): Promise<Response<TUpdateBrand200Resp>>;
    public updateBrand(params: INegativeTest): Promise<Response<unknown>>;

    @logStep()
    public updateBrand(params: TTestType<TUpdateBrandParam>): Promise<Response<TUpdateBrand200Resp | unknown>> {
        if (this.isPositive(params)) {
            return this.request()
                .method('put')
                .body(params.positive.body)
                .url(`/${params.positive.path.id}`)
                .jsonSchemaJsonPath(PRODUCT_JSON_SCHEMA_PATHS.brands.update)
                .send<TUpdateBrand200Resp>();
        }
        return this.request().method('put').body(params.negative.body).url(`/${params.negative.path.id}`).qs(params.negative.query).send();
    }

    public patchBrand(params: IPositiveTest<TPatchBrandParam>): Promise<Response<TPatchBrand200Resp>>;
    public patchBrand(params: INegativeTest): Promise<Response<unknown>>;

    @logStep()
    public patchBrand(params: TTestType<TPatchBrandParam>): Promise<Response<TPatchBrand200Resp | unknown>> {
        if (this.isPositive(params)) {
            return this.request()
                .method('patch')
                .body(params.positive.body)
                .url(`/${params.positive.path.id}`)
                .jsonSchemaJsonPath(PRODUCT_JSON_SCHEMA_PATHS.brands.patch)
                .send<TPatchBrand200Resp>();
        }
        return this.request()
            .method('patch')
            .body(params.negative.body)
            .url(`/${params.negative.path.id}`)
            .qs(params.negative.query)
            .send();
    }

    public existsBrand(params: IPositiveTest<TExistsBrandParam>): Promise<Response<TExistsBrand200Resp>>;
    public existsBrand(params: INegativeTest): Promise<Response<unknown>>;

    @logStep()
    public existsBrand(params: TTestType<TExistsBrandParam>): Promise<Response<TExistsBrand200Resp | unknown>> {
        if (this.isPositive(params)) {
            return this.request()
                .method('post')
                .url('/exists')
                .body(params.positive.body)
                .jsonSchemaJsonPath(PRODUCT_JSON_SCHEMA_PATHS.brands.exists)
                .send<TExistsBrand200Resp>();
        }
        return this.request().method('post').url('/exists').body(params.negative.body).send();
    }
}
