// import { MERCH_HIERARCHY_GET_CHILDREN, MERCH_HIERARCHY_GET_CHILDREN_NEGATIVE, merchantCreationReq } from '@fixtures/merchant/index';
// import { merchantAdminController, merchantController } from '@configs/api.client.config';
//
// describe.skip('Get Merchant Children by merchant Id data', () => {
//   let merchantsMap = new Map<string, string>();
//
//   beforeAll(async () => {
//     for (let merchant of merchantCreationReq) {
//       const { id } = (await merchantAdminController.createMerchant(merchant.request)).body;
//
//       if (!id) {
//         throw new Error('No merchant was created');
//       }
//
//       merchantsMap.set(`${merchant.merchantAlias}`, id);
//     }
//   });
//
//   describe.each(MERCH_HIERARCHY_GET_CHILDREN)('Get merchant children by merchant id', ({ request, tcId, tcDesc, response }) => {
//     test(`${tcId}: Validate getMerchantChildrenById when - ${tcDesc}`, async () => {
//       expect.assertions(2);
//
//       const getMerchantIdByAlias = merchantsMap.get(request.positive.path.merchantId);
//       Object.assign(request.positive.path, { merchantId: getMerchantIdByAlias });
//
//       const resp = await merchantController.getMerchantChildrenById(request);
//
//       expect(resp.status.statusCode).toBe(200);
//       expect(resp.body.content).toEqual(response.body.content);
//     });
//   });
//
//   describe.each(MERCH_HIERARCHY_GET_CHILDREN_NEGATIVE)(
//     'Get merchant children by merchant id with negative data',
//     ({ request, tcId, tcDesc, response }) => {
//       test(`${tcId}: Validate getMerchantChildrenById when - ${tcDesc}`, async () => {
//         expect.assertions(1);
//
//         await expect(merchantController.getMerchantChildrenById(request)).rejects.toThrow(response.message);
//       });
//     }
//   );
//
//   afterAll(async () => {
//     // TODO all created merchants should be de deleted after delete is ready
//   });
// });
