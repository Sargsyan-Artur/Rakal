import { TMerchantHierarchyServiceKey } from './merchant.types';
import { TProductServiceKey } from './product.types';
import { TAuthServiceKey } from './auth.types';
import { TUserServiceKey } from './user.types';
import { TJobServiceKey } from './job.types';
import { TCommerceAdapterServiceKey } from './commerce.adapter.types';
import { TCatalogServiceKey } from './catalog.types';

export * from './auth.types';
export * from './catalog.types';
export * from './commerce.adapter.types';
export * from './product.types';
export * from './merchant.types';
export * from './job.types';
export * from './user.types';

export interface IServiceParams {
    readonly serviceUrl: string;
}

export interface IServicesParams {
    readonly product?: IServiceParams;
    readonly merchant?: IServiceParams;
    readonly auth?: IServiceParams;
    readonly user?: IServiceParams;
    readonly job?: IServiceParams;
    readonly commerceAdaptor?: IServiceParams;
    readonly catalog?: IServiceParams;
}

export type TServicesKeys =
    | TProductServiceKey
    | TMerchantHierarchyServiceKey
    | TAuthServiceKey
    | TUserServiceKey
    | TJobServiceKey
    | TCommerceAdapterServiceKey
    | TCatalogServiceKey;
