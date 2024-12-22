import * as path from 'path';

import { SERVICES_PARAMS_SAMPLE } from '../../../../fixtures/services/services.fixture';
import { JobService, JobTypeController, JobSubTypeController } from '../../../../../../src/api/services';

jest.mock('log4js');
jest.mock('../../../../../../src/api/services/job/controllers/job.subType.controller.ts');
jest.mock('../../../../../../src/api/services/job/controllers/job.type.controller.ts');

const JobTypeControllerMock = JobTypeController as jest.MockedClass<typeof JobTypeController>;
const JobSubTypeControllerMock = JobSubTypeController as jest.MockedClass<typeof JobSubTypeController>;

describe('api > services > job', () => {
    test('factory', () => {
        expect.assertions(6);

        const jobService = new JobService(SERVICES_PARAMS_SAMPLE.services?.job!);

        expect(jobService.controller('type')).toBeInstanceOf(JobTypeController);
        expect(jobService.controller('subType')).toBeInstanceOf(JobSubTypeController);

        expect(JobTypeControllerMock.mock.calls[0]![0].modelsLocation).toContain(
            path.resolve('src/api/services/job/models/job.swagger.json'),
        );

        expect(JobSubTypeControllerMock.mock.calls[0]![0].modelsLocation).toContain(
            path.resolve('src/api/services/job/models/job.swagger.json'),
        );

        expect(JobTypeController).toHaveBeenNthCalledWith(1, {
            controllerUrl: SERVICES_PARAMS_SAMPLE.services?.job?.serviceUrl,
            modelsLocation: JobTypeControllerMock.mock.calls[0]![0].modelsLocation,
        });

        expect(JobSubTypeController).toHaveBeenNthCalledWith(1, {
            controllerUrl: SERVICES_PARAMS_SAMPLE.services?.job?.serviceUrl,
            modelsLocation: JobSubTypeControllerMock.mock.calls[0]![0].modelsLocation,
        });
    });
});
