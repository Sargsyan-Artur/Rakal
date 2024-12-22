export type TEnvName = 'poc01' | 'local' | 'fb' | 'dev1' | 'qa1' | 'uat' | 'prd';

export interface ITestDataItem {
    readonly id: string;
    // tslint:disable-next-line:no-any
    readonly [key: string]: any;
}

interface IBaseTesEnvData {
    url: string;
    readonly data?: ITestDataItem[];
}

// tslint:disable-next-line:no-empty-interface
export interface IUiTestEnvData extends IBaseTesEnvData {
}

export interface IServiceTestEnvData extends IBaseTesEnvData {
    readonly main?: boolean;
}

export interface ITestConstants {
    readonly [key: string]: string | number | boolean | ITestConstants;
}

export type TUiTestEnv = {
    readonly default?: boolean;
    readonly id: TEnvName;
    readonly ui: IUiTestEnvData,
    readonly services?: {
        readonly [serviceName in string]: IServiceTestEnvData;
    };
    readonly constants?: ITestConstants;
};

export type TServicesTestEnv = {
    readonly default?: boolean;
    readonly id: TEnvName;
    readonly ui?: IUiTestEnvData,
    readonly services: {
        readonly [serviceName in string]: IServiceTestEnvData;
    };
    readonly constants?: ITestConstants;
};

export type TUiAndServiceTestEnv = {
    readonly default?: boolean;
    readonly id: TEnvName;
    readonly ui: IUiTestEnvData,
    readonly services: {
        readonly [serviceName in string]: IServiceTestEnvData;
    };
    readonly constants?: ITestConstants;
};
