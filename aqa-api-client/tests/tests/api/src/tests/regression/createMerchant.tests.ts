import { MERCH_HIERARCHY_CREATE, MERCH_HIERARCHY_CREATE_NEGATIVE, MERCH_HIERARCHY_CREATE_DUPLICATE_NEGATIVE } from '@fixtures/merchant';
import { merchantAdminController } from '@configs/api.client.config';

describe('Merchant Controller Create Merchant', () => {
  describe.each(MERCH_HIERARCHY_CREATE)(`merchant Admin Controller -> create merchant`, ({ tcId, tcDesc, request }) => {
    test(`${tcId}: Create merchant, when ${tcDesc}`, async () => {
      expect.assertions(7);

      const { body } = await merchantAdminController.createMerchant(request);

      expect(body.name).toEqual(request.positive.body.name);
      expect(body.phoneNumber).toBe(request.positive.body.phoneNumber);
      expect(body.email).toBe(request.positive.body.email);
      expect(body.address).toBe(request.positive.body.address);
      expect(body.city).toBe(request.positive.body.city);
      expect(body.state).toEqual(request.positive.body.state);
      expect(body.zipCode).toBe(request.positive.body.zipCode);
    });
  });

  describe.each(MERCH_HIERARCHY_CREATE_NEGATIVE)(`merchant Admin Controller -> create merchant`, ({ tcId, tcDesc, request, response }) => {
    test(`${tcId}: Create merchant, when ${tcDesc}`, async () => {
      expect.assertions(1);

      await expect(merchantAdminController.createMerchant(request)).rejects.toThrow(response.message);
    });
  });

  describe(`Create Merchant`, () => {
    const { tcId, tcDesc, request, response } = MERCH_HIERARCHY_CREATE_DUPLICATE_NEGATIVE;

    test(`${tcId}: Create merchant, when ${tcDesc}`, async () => {
      expect.assertions(1);
      await merchantAdminController.createMerchant(request);

      await expect(merchantAdminController.createMerchant(request)).rejects.toThrow(response.message);
    });
  });
});
