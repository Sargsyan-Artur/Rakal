import got from 'got';
import * as querystring from 'querystring';

import { JobService, JobTypeController } from '../../../../../../../src/api/services';
import { SERVICES_PARAMS_SAMPLE } from '../../../../../fixtures/services/services.fixture';
import {
    ALL_TYPES_POSITIVE,
    CREATE_TYPE_POSITIVE,
    DELETE_TYPE_WITH_ID_POSITIVE,
    TYPE_WITH_ID_POSITIVE,
} from '../../../../../fixtures/services/job/type.fixture';

jest.mock('log4js');
jest.mock('got');

describe('api > services > job > type.controller', () => {
    let jobTypeController: JobTypeController;

    beforeEach(() => {
        jest.clearAllMocks();

        const jobService = new JobService(SERVICES_PARAMS_SAMPLE.services?.job!);
        jobTypeController = jobService.controller('type');
    });

    describe('getAllTypes', () => {
        test('With positive params', async () => {
            expect.assertions(1);

            await jobTypeController.getAllJobTypes(ALL_TYPES_POSITIVE);

            const query = querystring.stringify(ALL_TYPES_POSITIVE.positive.query);

            expect(got).toHaveBeenCalledWith(`${SERVICES_PARAMS_SAMPLE.services?.job?.serviceUrl}/api/v1/types`, {
                method: 'get',
                responseType: 'json',
                hooks: {
                    afterResponse: [expect.any(Function)],
                },
                searchParams: query,
            });
        });
    });

    describe('createType', () => {
        test('With positive params', async () => {
            expect.assertions(1);

            await jobTypeController.createJobType(CREATE_TYPE_POSITIVE);

            expect(got).toHaveBeenCalledWith(`${SERVICES_PARAMS_SAMPLE.services?.job?.serviceUrl}/api/v1/types`, {
                method: 'post',
                responseType: 'json',
                hooks: {
                    afterResponse: [expect.any(Function)],
                },
                json: CREATE_TYPE_POSITIVE.positive.body,
            });
        });
    });

    describe('updateType', () => {
        test('With positive params', async () => {
            expect.assertions(1);

            await jobTypeController.updateJobType(CREATE_TYPE_POSITIVE);

            expect(got).toHaveBeenCalledWith(`${SERVICES_PARAMS_SAMPLE.services?.job?.serviceUrl}/api/v1/types`, {
                method: 'put',
                responseType: 'json',
                hooks: {
                    afterResponse: [expect.any(Function)],
                },
                json: CREATE_TYPE_POSITIVE.positive.body,
            });
        });
    });

    describe('addSubType', () => {
        test('With positive params', async () => {
            expect.assertions(1);

            await jobTypeController.addJobSubType(TYPE_WITH_ID_POSITIVE);

            expect(got).toHaveBeenCalledWith(
                `${SERVICES_PARAMS_SAMPLE.services?.job?.serviceUrl}/api/v1/types/${TYPE_WITH_ID_POSITIVE.positive.path.typeId}/sub-types/`,
                {
                    method: 'post',
                    responseType: 'json',
                    hooks: {
                        afterResponse: [expect.any(Function)],
                    },
                    json: TYPE_WITH_ID_POSITIVE.positive.body,
                },
            );
        });
    });

    describe('deleteType', () => {
        test('With positive params', async () => {
            expect.assertions(1);

            await jobTypeController.deleteJobType(DELETE_TYPE_WITH_ID_POSITIVE);

            expect(got).toHaveBeenCalledWith(
                `${SERVICES_PARAMS_SAMPLE.services?.job?.serviceUrl}/api/v1/types/${DELETE_TYPE_WITH_ID_POSITIVE.positive.path.id}`,
                {
                    method: 'delete',
                    responseType: 'json',
                    hooks: {
                        afterResponse: [expect.any(Function)],
                    },
                    json: DELETE_TYPE_WITH_ID_POSITIVE.positive.path,
                },
            );
        });
    });
});
