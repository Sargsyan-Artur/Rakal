import Ajv from 'ajv';
import $RefParser from '@apidevtools/json-schema-ref-parser';

import { jsonSchemaValidator } from '../../../../../src/core/docs/schema.validator';
import {
    JSON_SCHEMA_DATA_SAMPLE_1,
    JSON_SCHEMA_DATA_SAMPLE_2,
    RESPONSE_BODY_SAMPLE_1,
    RESPONSE_BODY_SAMPLE_2,
} from '../../../fixtures/core/docs/schema.fixture';
import JSON_SCHEMA_SAMPLE from '../../../fixtures/core/docs/jsonschema.fixture.json';
import { extractJsonSchema } from '../../../../../src/core/docs/utils';

jest.mock('ajv');
jest.mock('ajv-formats');
jest.mock('@apidevtools/json-schema-ref-parser');
jest.mock('../../../../../src/core/docs/utils.ts', () => {
    return {
        extractJsonSchema: jest.fn().mockReturnValue({ jsonSchema: 'mock result' }),
    };
});

const AjvMock = Ajv as jest.MockedClass<typeof Ajv>;
const $RefParserMock = $RefParser as jest.MockedClass<typeof $RefParser>;

describe('core > docs', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('jsonSchemaValidator. Positive test', async () => {
        expect.assertions(4);

        await jsonSchemaValidator(JSON_SCHEMA_DATA_SAMPLE_1, RESPONSE_BODY_SAMPLE_1);

        expect($RefParserMock.mock.results[0]!.value.dereference).toHaveBeenCalledWith(JSON_SCHEMA_SAMPLE);
        expect(extractJsonSchema).toHaveBeenCalledWith(JSON_SCHEMA_SAMPLE, JSON_SCHEMA_DATA_SAMPLE_1.path);

        expect(AjvMock.mock.results[0]!.value.compile).toHaveBeenCalledWith({ jsonSchema: 'mock result' });
        expect(AjvMock.mock.results[0]!.value.compile).toHaveReturnedWith(expect.any(Function));
    });

    test('jsonSchemaValidator. Negative test', async () => {
        expect.assertions(2);

        await expect(jsonSchemaValidator(JSON_SCHEMA_DATA_SAMPLE_2, RESPONSE_BODY_SAMPLE_2)).rejects.toThrow(
            'The contract cannot be verified without json-schema path.',
        );

        await expect(jsonSchemaValidator(JSON_SCHEMA_DATA_SAMPLE_1, RESPONSE_BODY_SAMPLE_2)).rejects.toThrow(
            'JSON Schema validation error: {}',
        );
    });
});
