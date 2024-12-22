import { readFileSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';
import swaggerToTs, { SwaggerToTSOptions } from 'openapi-typescript';

const OPTIONS: SwaggerToTSOptions = {
    immutableTypes: true,
    prettierConfig: resolve(join('./src/core/docs', './.prettierrc.json')),
};

export const generate = async (inputPath: string, outputPath: string): Promise<void> => {
    const inputData = JSON.parse(readFileSync(resolve(join(process.cwd(), inputPath)), 'utf8'));
    const rawOutput = await swaggerToTs(inputData, OPTIONS);

    const finalOutput = rawOutput
        .replace(/paths/gim, 'IPaths')
        .replace(/definitions/gim, 'IDefinitions')
        .replace(/operations/gim, 'IOperations');

    return writeFileSync(resolve(join(process.cwd(), outputPath)), finalOutput);
};
