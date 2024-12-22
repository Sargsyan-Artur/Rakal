import { registerAllureReporter } from 'jest-allure2-adapter';

registerAllureReporter({
  resultsDir: 'artifacts/allure/source',
  autoHistoryId: true,
  stepTimestamp: true,
  addStepStatusDetailsAttachment: true,
});
