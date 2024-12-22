import { join, resolve } from 'path';

import { IJsonSchemaData } from '../../../../../src/types';

export const JSON_SCHEMA_DATA_SAMPLE_1: IJsonSchemaData = {
    location: resolve(join(__dirname, '/jsonschema.fixture.json')),
    path: ['json', 'schema', 'mock', 'path'],
};

export const JSON_SCHEMA_DATA_SAMPLE_2: IJsonSchemaData = {
    location: '',
    path: [],
};

export const RESPONSE_BODY_SAMPLE_1 = {
    valid: true,
};

export const RESPONSE_BODY_SAMPLE_2 = {
    valid: false,
};
