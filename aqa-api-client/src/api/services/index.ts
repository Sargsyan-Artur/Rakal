import * as log4js from 'log4js';

import {
    IServiceParams,
    IServicesParams,
    TAuthServiceKey,
    TCatalogServiceKey,
    TCommerceAdapterServiceKey,
    TJobServiceKey,
    TMerchantHierarchyServiceKey,
    TProductServiceKey,
    TServicesKeys,
    TToken,
    TUserServiceKey,
} from '../../types';

import { Logger } from '../../configs/log4js.conf';
import { BaseService } from '../common';
import { ProductService } from './product';
import { AuthService } from './auth';
import { MerchantHierarchyService } from './merchant';
import { UserService } from './user';
import { JobService } from './job';
import { CommerceAdapterService } from './commerce-adapter';
import { CatalogService } from './catalog';

export * from './auth';
export * from './catalog';
export * from './commerce-adapter';
export * from './job';
export * from './merchant';
export * from './product';
export * from './user';

export class Services {
    public readonly logger: log4js.Logger;

    constructor(private readonly params: IServicesParams, private readonly token?: TToken) {
        this.logger = Logger(this.constructor.name);
    }

    public service(service: TCatalogServiceKey): CatalogService;
    public service(service: TCommerceAdapterServiceKey): CommerceAdapterService;
    public service(service: TUserServiceKey): UserService;
    public service(service: TAuthServiceKey): AuthService;
    public service(service: TMerchantHierarchyServiceKey): MerchantHierarchyService;
    public service(service: TProductServiceKey): ProductService;
    public service(service: TJobServiceKey): JobService;
    public service(service: TServicesKeys): BaseService {
        switch (service) {
            case 'product':
                return this.initService(ProductService, this.params.product, this.token);
            case 'merchant-hierarchy':
                return this.initService(MerchantHierarchyService, this.params.merchant, this.token);
            case 'auth':
                return this.initService(AuthService, this.params.auth, this.token);
            case 'user':
                return this.initService(UserService, this.params.user, this.token);
            case 'job':
                return this.initService(JobService, this.params.job, this.token);
            case 'commerce-adaptor':
                return this.initService(CommerceAdapterService, this.params.commerceAdaptor, this.token);
            case 'catalog':
                return this.initService(CatalogService, this.params.catalog, this.token);
            default:
                throw new Error(`There is no match for passed name of service. Passed: ${service}`);
        }
    }

    protected initService<T extends BaseService>(
        Service: new (params: IServiceParams, token?: TToken) => T,
        params?: IServiceParams,
        token?: TToken,
    ): T {
        if (!params) {
            throw new Error(`Please setup 'IServiceParams' for '${Service.name}' service`);
        }

        return new Service(params, token);
    }
}
