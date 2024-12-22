import { ContentType, Status } from 'allure-js-commons';

import { Logger } from '../../configs/log4js.conf';

import('jest-allure2-adapter');

const logger = Logger('Step');

export function logStep() {
    return (target: unknown, property: string, descriptor: PropertyDescriptor) => {
        const originalFunction = descriptor.value;
        const targetName =
            target && typeof target === 'object' ? target.constructor.name : 'Please call the step decorator only on class methods';

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        descriptor.value = async function _step(...args: any) {
            const stepMsg = `${targetName} > ${property}`;
            logger.info(stepMsg);

            // @ts-ignore
            if (!global.reporter) {
                return originalFunction.apply(this, args);
            }

            // @ts-ignore
            if (!reporter.runningTest) {
                return originalFunction.apply(this, args);
            }

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (args.some((arg: any) => 'negative' in arg)) {
                reporter.logStep(stepMsg, Status.PASSED); // because of an issue in allure
                reporter.attachment('Arguments', JSON.stringify(args, null, 2), ContentType.JSON);
                return originalFunction.apply(this, args);
            }

            return reporter.step(stepMsg, async () => {
                reporter.attachment('Arguments', JSON.stringify(args, null, 2), ContentType.JSON);
                return originalFunction.apply(this, args);
            });
        };

        return descriptor;
    };
}
