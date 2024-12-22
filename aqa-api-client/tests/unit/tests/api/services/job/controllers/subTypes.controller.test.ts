import got from 'got';

import { JobService, JobSubTypeController } from '../../../../../../../src/api/services';
import { SERVICES_PARAMS_SAMPLE } from '../../../../../fixtures/services/services.fixture';
import { DELETE_SUBTYPE_WITH_ID_POSITIVE, UPDATE_SUBTYPE_WITH_ID_POSITIVE } from '../../../../../fixtures/services/job/type.fixture';

jest.mock('log4js');
jest.mock('got');

describe('api > services > job > type.controller', () => {
    let jobSubTypeController: JobSubTypeController;

    beforeEach(() => {
        jest.clearAllMocks();

        const jobService = new JobService(SERVICES_PARAMS_SAMPLE.services?.job!);
        jobSubTypeController = jobService.controller('subType');
    });

    describe('updateSubType', () => {
        test('With positive params', async () => {
            expect.assertions(1);

            await jobSubTypeController.updateJobSubType(UPDATE_SUBTYPE_WITH_ID_POSITIVE);

            expect(got).toHaveBeenCalledWith(`${SERVICES_PARAMS_SAMPLE.services?.job?.serviceUrl}/api/v1/sub-types`, {
                method: 'put',
                responseType: 'json',
                hooks: {
                    afterResponse: [expect.any(Function)],
                },
                json: UPDATE_SUBTYPE_WITH_ID_POSITIVE.positive.body,
            });
        });
    });

    describe('deleteSubType', () => {
        test('With positive params', async () => {
            expect.assertions(1);

            await jobSubTypeController.deleteJobSubType(DELETE_SUBTYPE_WITH_ID_POSITIVE);

            expect(got).toHaveBeenCalledWith(
                `${SERVICES_PARAMS_SAMPLE.services?.job?.serviceUrl}/api/v1/sub-types/${DELETE_SUBTYPE_WITH_ID_POSITIVE.positive.path.subTypeId}`,
                {
                    method: 'delete',
                    responseType: 'json',
                    hooks: {
                        afterResponse: [expect.any(Function)],
                    },
                    json: DELETE_SUBTYPE_WITH_ID_POSITIVE.positive.path,
                },
            );
        });
    });
});
