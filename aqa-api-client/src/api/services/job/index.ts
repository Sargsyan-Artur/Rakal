import { join, resolve } from 'path';

import { BaseService } from '../../common';
import { IServiceParams, TJobControllersKeys, TSubTypeControllerKey, TToken, TTypeControllerKey } from '../../../types';
import { JobBaseController } from './controllers/job.base.controller';
import { JobTypeController } from './controllers/job.type.controller';
import { JobSubTypeController } from './controllers/job.subType.controller';

export { JobTypeController, JobSubTypeController };

export class JobService extends BaseService {
    constructor(params: IServiceParams, token?: TToken) {
        super(
            {
                ...params,
                modelsLocation: resolve(join(__dirname, '/models/job.swagger.json')),
            },
            token,
        );
    }

    public controller(controller: TTypeControllerKey): JobTypeController;
    public controller(controller: TSubTypeControllerKey): JobSubTypeController;
    public controller(controller: TJobControllersKeys): JobBaseController {
        switch (controller) {
            case 'type':
                return this.initController(JobTypeController);
            case 'subType':
                return this.initController(JobSubTypeController);
            default:
                throw new Error(`There is no match for passed name of controller. Passed: ${controller}`);
        }
    }
}
