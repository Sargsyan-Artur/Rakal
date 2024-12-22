import { IOperations } from '../../api/services/product/models/product.swagger.types';

export type TBrandsControllerKey = 'brand';
export type TProductControllersKeys = TBrandsControllerKey;

export type TProductServiceKey = 'product';

/**
 * Types for controllers' parameters
 */

export type TFindAllBrandsParam = IOperations['findAll']['parameters'];

export type TCreateBrandParam = {
    body: IOperations['create']['requestBody']['content']['application/json'];
};
export type TGetBrandByIdParam = IOperations['getById']['parameters'];
export type TDeleteBrandParam = IOperations['delete']['parameters'];
export type TExistsBrandParam = {
    body: IOperations['existsUsingPost']['requestBody']['content']['application/json'];
};

export type TUpdateBrandParam = {
    path: IOperations['update']['parameters']['path'];
    body: IOperations['update']['requestBody']['content']['application/json'];
};

export type TPatchBrandParam = {
    path: IOperations['patch']['parameters']['path'];
    body: IOperations['patch']['requestBody']['content']['application/json'];
};

/**
 * Returned types of controllers
 */

export type TFindAllBrands200Resp = IOperations['findAll']['responses']['200']['content']['application/json'];

export type TCreateBrand201Resp = IOperations['create']['responses']['201']['content']['application/json'];
export type TGetBrandById200Resp = IOperations['getById']['responses']['200']['content']['application/json'];
export type TDeleteBrand204Resp = IOperations['delete']['responses']['204'];
export type TExistsBrand200Resp = IOperations['existsUsingPost']['responses']['200']['content']['application/json'];
export type TUpdateBrand200Resp = IOperations['update']['responses']['200']['content']['application/json'];
export type TPatchBrand200Resp = IOperations['patch']['responses']['200']['content']['application/json'];
