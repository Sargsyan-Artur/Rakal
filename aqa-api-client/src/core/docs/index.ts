import { generate } from './types.generator';
import { Logger } from '../../configs/log4js.conf';

const logger = Logger('Core-Docs');

type TDocPaths = {
    readonly input: string;
    readonly output: string;
    readonly skip?: boolean;
}[];

const paths: TDocPaths = [
    {
        input: '/src/api/services/product/models/product.swagger.json',
        output: '/src/api/services/product/models/product.swagger.types.ts',
    },
    {
        input: '/src/api/services/merchant/models/merchant.swagger.json',
        output: '/src/api/services/merchant/models/merchant.swagger.types.ts',
    },
    {
        input: '/src/api/services/user/models/user.swagger.json',
        output: '/src/api/services/user/models/user.swagger.types.ts',
    },
    {
        input: '/src/api/services/job/models/job.swagger.json',
        output: '/src/api/services/job/models/job.swagger.types.ts',
    },
    {
        input: '/src/api/services/commerce-adapter/models/commerce.adapter.swagger.json',
        output: '/src/api/services/commerce-adapter/models/commerce.adapter.swagger.types.ts',
    },
    {
        input: '/src/api/services/catalog/models/catalog.swagger.json',
        output: '/src/api/services/catalog/models/catalog.swagger.types.ts',
    },
    {
        input: '/src/api/services/auth/models/auth.swagger.json',
        output: '/src/api/services/auth/models/auth.swagger.types.ts',
    },
];

// npm run generate:models
// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async () => {
    for (const path of paths) {
        if (path.skip) {
            continue;
        }
        try {
            await generate(path.input, path.output);
            logger.info(`Types were generated. Input: '${path.input}'. Output: '${path.output}'.`);
        } catch (e) {
            logger.error(`Error during generation types. Input: '${path.input}'. Output: '${path.output}'.`);
            logger.error(e);
        }
    }
})();
