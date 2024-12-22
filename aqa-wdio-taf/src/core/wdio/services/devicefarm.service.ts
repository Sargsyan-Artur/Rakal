import { SevereServiceError } from 'webdriverio';
import Logger from '@wdio/logger';
import { Capabilities, Options, Services } from '@wdio/types';
import { DeviceFarm } from 'aws-sdk';

const logger = Logger('@wdio/devicefarm-service');

interface DeviceFarmConfig extends Services.ServiceOption {
    readonly expiresInSeconds: number;
}

// https://docs.aws.amazon.com/devicefarm/latest/testgrid/testing-frameworks-nodejs.html
// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DeviceFarm.html#createTestGridUrl-property
export default class DeviceFarmLauncher implements Services.ServiceInstance {
    private readonly deviceFarm: DeviceFarm;
    private readonly projectArn = process.env['DF_BROWSER_ARN']!;

    constructor(private readonly _options: DeviceFarmConfig) {
        if (!process.env['DF_BROWSER_ARN']) {
            throw new Error(
                `Please setup 'DF_BROWSER_ARN' env (or use .env file) for 'DeviceFarmLauncher' service. 'DF_AWS_REGION' is optional (Default: 'us-west-2')`,
            );
        }

        // DeviceFarm is only available in us-west-2
        // https://docs.aws.amazon.com/general/latest/gr/devicefarm.html
        this.deviceFarm = new DeviceFarm({
            region: process.env['DF_AWS_REGION'] ?? 'us-west-2',
        });
    }

    public async onPrepare(_config: Options.Testrunner, capabilities: Capabilities.RemoteCapabilities): Promise<void> {
        if (Array.isArray(capabilities)) {
            for (const cap of capabilities) {
                const testGridUrlResult = await this.createSession();
                const url = new URL(testGridUrlResult.url!);

                logger.info('Created device farm test grid:', testGridUrlResult);

                Object.assign(cap, {
                    protocol: 'https',
                    port: 443,
                    hostname: url.hostname,
                    path: url.pathname,
                    connectionRetryTimeout: 60000,
                });
            }
        }
    }

    private async createSession(): Promise<DeviceFarm.Types.CreateTestGridUrlResult> {
        try {
            return await this.deviceFarm
                .createTestGridUrl({
                    projectArn: this.projectArn,
                    expiresInSeconds: this._options.expiresInSeconds,
                })
                .promise();
        } catch (err) {
            logger.error(err);
            throw new SevereServiceError((err as Error).message);
        }
    }
}
