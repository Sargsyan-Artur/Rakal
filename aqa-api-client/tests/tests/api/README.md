# Service autotests

## Get started

1. Execute `npm ci` command
2. Specify test environment: `--testenv=<string>` OR `TEST_ENV <string>`
3. Run tests: `npm test -- [--testenv=<string>]`
4. Report generation: `npm run allure:report`
5. All artifacts are located in the folder: `./artifacts/junit/junit.xml` AND `./artifacts/allure/report/index.html`
6. Swagger doc:
   1. JSON: http://<serviceurl>/v3/api-docs/
   2. UI: http://<serviceurl>/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config

## Test Coverage

- Added auto-tests for Regression suite

  - Merchant Controller: `GetAllMerchants`
  - Merchant Controller: `GetMerchantById`
  - Merchant Controller: `GetMerchantChildrenById`

- Test coverage report: https://confluence.greensky.net/display/rak/Merchant+Controller
