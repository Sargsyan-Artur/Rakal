import '../../../../../src/steps';
import { TStepUsage, testMatchings } from '../helper';

jest.mock('log4js');
jest.mock('@wdio/cucumber-framework');

describe('Steps > memory > page', () => {
    beforeEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });

    describe(`I remember the page URL as '(.+)'`, () => {
        const usages: TStepUsage = ["I remember the page URL as 'pageUrl'"];

        testMatchings('When', usages);
    });
});
