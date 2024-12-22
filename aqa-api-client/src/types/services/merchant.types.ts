import { IOperations } from '../../api/services/merchant/models/merchant.swagger.types';

export type TMerchantControllerKey = 'merchant';
export type TMerchantAdminControllerKey = 'merchantAdmin';
export type TMerchantHierarchyControllersKeys = TMerchantControllerKey | TMerchantAdminControllerKey;

export type TMerchantHierarchyServiceKey = 'merchant-hierarchy';

export type TGetMerchantsParam = IOperations['getMerchants']['parameters'];
export type TGetMerchantParam = IOperations['getMerchant']['parameters'];
export type TGetChildrenParam = IOperations['getChildren']['parameters'];

export type TCreateMerchantParam = {
    body: IOperations['createMerchant']['requestBody']['content']['application/json'];
};

export type TUpdateMerchantParam = {
    path: IOperations['updateMerchant']['parameters']['path'];
    body: IOperations['updateMerchant']['requestBody']['content']['application/json'];
};

export type TGetMerchants200Resp = IOperations['getMerchants']['responses']['200']['content']['*/*'];
export type TGetMerchant200Resp = IOperations['getMerchant']['responses']['200']['content']['application/json'];
export type TGetChildren200Resp = IOperations['getChildren']['responses']['200']['content']['*/*'];

export type TCreateMerchant201Resp = IOperations['createMerchant']['responses']['201']['content']['application/json'];

export type TUpdateMerchant204Resp = IOperations['updateMerchant']['responses']['204'];
