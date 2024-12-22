import { Response } from '../core/got';
import { BaseAsserts } from './base.asserts';
import { IJsonSchemaData } from '../types';
import { jsonSchemaValidator } from '../core/docs/schema.validator';

export class ResponseAsserts<IBody> extends BaseAsserts {
    constructor(protected readonly data: Response<IBody>, private readonly jsonSchemaData: IJsonSchemaData) {
        super();
    }

    public async contract(): Promise<void> {
        return jsonSchemaValidator(this.jsonSchemaData, this.data.body);
    }
}
