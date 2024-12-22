import { MERCH_HIERARCHY_GET_BY_ID, MERCH_HIERARCHY_NEGATIVE_GET_BY_ID,
    // merchantCreationReq
} from '@fixtures/merchant/index';
import {
    // merchantAdminController,
    merchantController } from '@configs/api.client.config';

describe('Get Merchant by Id -> Test Filtering By mId', () => {
  const merchantsMap = new Map<string, string>();

  // beforeAll(async () => {
  //   for (const merchant of merchantCreationReq) {
  //     const { id } = (await merchantAdminController.createMerchant(merchant.request)).body;
  //
  //     if (!id) {
  //       throw new Error('No merchant was created');
  //     }
  //
  //     merchantsMap.set(`${merchant.merchantAlias}`, id);
  //   }
  // });

  describe.each(MERCH_HIERARCHY_GET_BY_ID)(`Get Merchant by positive data`, ({ request, response, tcId, tcDesc }) => {
    test(`${tcId}: Validate getMerchantById when - ${tcDesc}`, async () => {
      expect.assertions(9);

      const getMerchantIdByAlias = merchantsMap.get(request.positive.path.merchantId);
      Object.assign(request.positive.path, { merchantId: getMerchantIdByAlias });

      const resp = await merchantController.getMerchantById(request);

      expect(resp.status.statusCode).toBe(200);
      expect(resp.body.id).toBeDefined();
      expect(resp.body.name).toBe(response.body.name);
      expect(resp.body.address).toBe(response.body.address);
      expect(resp.body.phoneNumber).toBe(response.body.phoneNumber);
      expect(resp.body.city).toBe(response.body.city);
      expect(resp.body.email).toBe(response.body.email);
      expect(resp.body.state).toEqual(response.body.state.abbreviation);
      expect(resp.body.zipCode).toBe(response.body.zipCode);
    });
  });

  describe.each(MERCH_HIERARCHY_NEGATIVE_GET_BY_ID)(`Get Merchant by id negative data`, ({ request, tcId, tcDesc, response }) => {
    test(`${tcId}: Validate getMerchantById when - ${tcDesc}`, async () => {
      expect.assertions(1);

      await expect(merchantController.getMerchantById(request)).rejects.toThrow(response.message);
    });
  });

  afterAll(async () => {
    // TODO all created merchants should be de deleted after delete is ready
  });
});
