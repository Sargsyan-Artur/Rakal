import { IOperations } from '../../api/services/catalog/models/catalog.swagger.types';

export type TCatalogsControllerKey = 'catalogs';
export type TCatalogControllersKeys = TCatalogsControllerKey;

export type TCatalogServiceKey = 'catalog';

/**
 * Types for controllers' parameters
 */

export type TFindAllCatalogParam = IOperations['findAll']['parameters'];
export type TAddCategoriesCatalogParam = {
    body: IOperations['addCategories']['requestBody']['content']['application/json'];
    path: IOperations['addCategories']['parameters']['path'];
};
export type TRemoveCategoryCatalog = IOperations['removeCategory']['parameters'];

/**
 * Returned types of controllers
 */

export type TFindAllCatalog200Resp = IOperations['findAll']['responses']['200']['content']['application/json'];
export type TFindAllDefaultCatalog200Resp = IOperations['findAllDefault']['responses']['200']['content']['application/json'];
export type TAddCategoriesCatalog200Resp = IOperations['addCategories']['responses']['201']['content']['application/json'];
export type TRemoveCategoryCatalog204Resp = IOperations['removeCategory']['responses']['204'];
