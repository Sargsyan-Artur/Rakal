import { merchant1,
// merchantCreationReq,
    merchantGetRequestData } from '@fixtures/merchant/index';
import {
    // merchantAdminController,
    merchantController } from '@configs/api.client.config';

describe.only('Get all merchants -> Schema Validation', () => {
  let id: string;

  // beforeAll(async () => {
  //   id = (await merchantAdminController.createMerchant(merchantCreationReq[0]!.request)).body.id!;
  // });

  test.only('Get all merchants When isArchived is true -> Schema Validation for getMerchants', async () => {
    expect.assertions(1);

    const response = await merchantController.getMerchants(merchantGetRequestData.getAll.request);
    const merchants = await response.body.content;
    const merchant = merchants!.find(merchant => merchant.name === merchant1.body.name);

    expect(merchant).toBeDefined();
  });

  test('Get Merchant_1 by id -> Schema Validation for getMerchantById', async () => {
    expect.assertions(1);

    merchantGetRequestData.getById.request.positive.path.merchantId = id;

    const response = await merchantController.getMerchantById(merchantGetRequestData.getById.request);
    const merchant = await response.body;

    expect(merchant.name).toEqual(merchant1.body.name);
  });

  afterAll(async () => {
    // TODO all created merchants should be de deleted after delete is ready
  });
});
