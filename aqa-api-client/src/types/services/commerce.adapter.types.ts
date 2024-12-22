import { IOperations } from '../../api/services/commerce-adapter/models/commerce.adapter.swagger.types';

export type TCategoriesAdapterKey = 'categories';
export type TCommerceAdapterControllersKey = TCategoriesAdapterKey;

export type TCommerceAdapterServiceKey = 'commerce-adaptor';

/**
 * Types for controllers' parameters
 */
export type TFindCategoriesAdapterParam = IOperations['findCategories']['parameters'];
export type TAddCategoriesAdapterParam = {
    path: IOperations['addCategories']['parameters']['path'];
    body: IOperations['addCategories']['requestBody']['content']['application/json'];
};

export type TDeleteCategoryAdapterParam = IOperations['deleteCategory']['parameters'];

/**
 * Returned types of controllers
 */

export type TFindCategories200AdapterResp = IOperations['findCategories']['responses']['200']['content']['application/json'];
export type TAddCategories200AdapterResp = IOperations['addCategories']['responses']['200']['content']['application/json'];
export type TDeleteCategory200AdapterResp = IOperations['deleteCategory']['responses']['200']['content']['application/json'];
