import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import $RefParser from '@apidevtools/json-schema-ref-parser';

import { extractJsonSchema } from './utils';
import { IJsonSchemaData } from '../../types';

export async function jsonSchemaValidator<IBody>(jsonSchemaData: IJsonSchemaData, body: IBody): Promise<void> {
    if (jsonSchemaData.path.length === 0) {
        throw new Error(`The contract cannot be verified without json-schema path.`);
    }

    const ajv = new Ajv({
        strict: true,
        allowUnionTypes: true,
        allErrors: true,
        verbose: true,
    });

    addFormats(ajv);

    // eslint-disable-next-line import/no-dynamic-require, global-require, @typescript-eslint/no-var-requires
    const referencedSwagger = await new $RefParser().dereference(require(jsonSchemaData.location));

    const schema = extractJsonSchema(referencedSwagger, jsonSchemaData.path);

    const compile = ajv.compile(schema);
    const valid = compile(body);

    if (!valid) {
        throw new Error(`JSON Schema validation error: ${JSON.stringify({ validationErrors: compile.errors }, null, 2)}`);
    }
}
