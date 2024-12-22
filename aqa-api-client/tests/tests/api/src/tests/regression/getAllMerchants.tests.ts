import _ from 'lodash';

import { TGetMerchants200Resp } from '@rak-aqa/api-client';
import {
  MERCH_HIERARCHY_GET_All_QUERY_ARCHIVED,
  MERCH_HIERARCHY_GET_ALL_QUERY_PAGINATION,
  MERCH_HIERARCHY_GET_ALL_SORTING,
  MERCH_HIERARCHY_NEGATIVE_QUERY_ARCHIVED,
  merchantCreationReq,
} from '@fixtures/merchant/index';
import { merchantAdminController, merchantController } from '@configs/api.client.config';

// Test coverage report: https://confluence.greensky.net/display/rak/Merchant+Controller
describe('Merchant Controller Get All Merchant', () => {
  beforeAll(async () => {
    for (let merchant of merchantCreationReq) {
      await merchantAdminController.createMerchant(merchant.request);
    }
  });

  describe.each(MERCH_HIERARCHY_GET_All_QUERY_ARCHIVED)(
    `Get All Merchant -> Test Archived/Active state`,
    ({ tcId, tcDesc, request, response }) => {
      test(`${tcId}: Get all merchants, when ${tcDesc}`, async () => {
        expect.assertions(1);

        const merchants = (await merchantController.getMerchants(request)).body.content;
        const actualMerchants = merchants!.map(merchant => merchant.isArchived);

        if (typeof request.positive.query.isArchived === typeof undefined) {
          expect(actualMerchants).toEqual(expect.arrayContaining(response.body.isArchived));
        } else {
          expect(actualMerchants).not.toContain(!response.body.isArchived);
        }
      });
    }
  );

  describe.each(MERCH_HIERARCHY_GET_ALL_QUERY_PAGINATION)(`Get All Merchant -> Test Pagination`, ({ tcId, tcDesc, response, request }) => {
    let body: TGetMerchants200Resp;

    beforeAll(async () => {
      body = (await merchantController.getMerchants(request)).body;
    });

    test(`${tcId}: Get all merchants when - ${tcDesc}`, () => {
      expect.assertions(6);

      expect(body.pageable!.pageSize).toBe(response.body.pageable.pageSize);
      expect(body.pageable!.pageNumber).toBe(response.body.pageable.pageNumber);
      expect(body.number).toBe(response.body.number);
      expect(body.size).toBe(response.body.size);
      expect(body.first).toBe(response.body.first);

      if (body.totalPages! - 1 === response.body.number) {
        expect(body.last).toBeTruthy();
      } else {
        expect(body.last).toBeFalsy();
      }
    });

    test(`${tcId}: Check merchants count in - ${tcDesc}`, () => {
      expect.assertions(1);

      const expectedMerchantCount = body.totalElements! - (body.totalPages! - 1) * response.body.size;
      const actualMerchantCount = body.content!.length;

      if (body.last) {
        expect(actualMerchantCount === expectedMerchantCount || actualMerchantCount === response.body.size).toBeTruthy();
      } else {
        expect(actualMerchantCount === response.body.size).toBeTruthy();
      }
    });
  });

  describe.each(MERCH_HIERARCHY_GET_ALL_SORTING)(`Get All Merchant -> Test sorting`, ({ request, tcId, tcDesc, response }) => {
    test(`${tcId}: Get all merchants when - ${tcDesc}`, async () => {
      expect.assertions(1);

      const merchants = (await merchantController.getMerchants(request)).body.content;

      // @ts-ignore
      const expectedMerchants = _.orderBy(
        merchants,
        [
          merchants =>
            // @ts-ignore
            typeof merchants[response.body.sortBy] === 'string'
              ? // @ts-ignore
                merchants[response.body.sortBy].toLowerCase().trim()
              : // @ts-ignore
                merchants[response.body.sortBy],
        ],
        [response.body.sortOption]
      );
      expect(merchants).toEqual(expectedMerchants);
    });
  });

  describe.each(MERCH_HIERARCHY_NEGATIVE_QUERY_ARCHIVED)(
    `Get All Merchants -> Test Archived/ with negative data`,
    ({ tcId, tcDesc, request, response }) => {
      test(`${tcId}: Get all merchants, when ${tcDesc}`, async () => {
        expect.assertions(1);

        await expect(merchantController.getMerchants(request)).rejects.toThrow(response.message);
      });
    }
  );

  afterAll(async () => {
    // TODO all created merchants should be de deleted after delete is ready
  });
});
