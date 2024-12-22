import { TCreateMerchantParam, TGetChildrenParam, TGetMerchantParam, TGetMerchantsParam, TTestCase } from '@rak-aqa/api-client';
import { merchant1, merchant2, merchant3, merchant4 } from '@fixtures/merchant/merchant';
import { generateAlphabeticString, generateNumericString } from '@rak-aqa/utils';

export const MERCH_HIERARCHY_GET_All_QUERY_ARCHIVED: TTestCase<TGetMerchantsParam, 'positive'>[] = [
  {
    tcId: 1,
    tcDesc: 'isArchived = undefined',
    request: {
      positive: {
        query: {
          isArchived: undefined,
          size: 100,
        },
      },
    },
    response: {
      body: {
        isArchived: [true, false],
      },
      statusCode: 200,
    },
  },
  {
    tcId: 2,
    tcDesc: 'isArchived = false',
    request: {
      positive: {
        query: {
          isArchived: false,
          size: 100,
        },
      },
    },
    response: {
      body: {
        isArchived: false,
      },
      statusCode: 200,
    },
  },
  {
    tcId: 3,
    tcDesc: 'isArchived = true',
    request: {
      positive: {
        query: {
          isArchived: true,
          size: 100,
        },
      },
    },
    response: {
      body: {
        isArchived: true,
      },
      statusCode: 200,
    },
  },
];

export const MERCH_HIERARCHY_GET_ALL_QUERY_PAGINATION: TTestCase<TGetMerchantsParam, 'positive'>[] = [
  {
    tcId: 1,
    tcDesc: '1st page with the size = 0',
    request: {
      positive: {
        query: {},
      },
    },
    response: {
      body: {
        pageable: {
          pageNumber: 0,
          pageSize: 20,
        },
        first: true,
        size: 20,
        number: 0,
      },
      statusCode: 200,
    },
  },
  {
    tcId: 2,
    tcDesc: '1st page with the size = 1',
    request: {
      positive: {
        query: {
          page: 0,
          size: 1,
        },
      },
    },
    response: {
      body: {
        pageable: {
          pageNumber: 0,
          pageSize: 1,
        },
        first: true,
        size: 1,
        number: 0,
      },
      statusCode: 200,
    },
  },
  {
    tcId: 3,
    tcDesc: '2nd page with the size = 1',
    request: {
      positive: {
        query: {
          page: 2,
          size: 1,
        },
      },
    },
    response: {
      body: {
        pageable: {
          pageNumber: 2,
          pageSize: 1,
        },
        first: false,
        size: 1,
        number: 2,
      },
      statusCode: 200,
    },
  },
  {
    tcId: 4,
    tcDesc: '1st page with the size = undefined',
    request: {
      positive: {
        query: {
          page: 0,
        },
      },
    },
    response: {
      body: {
        pageable: {
          pageNumber: 0,
          pageSize: 20,
        },
        first: true,
        size: 20,
        number: 0,
      },
      statusCode: 200,
    },
  },
];

export const MERCH_HIERARCHY_GET_ALL_SORTING: TTestCase<TGetMerchantsParam, 'positive'>[] = [
  {
    tcId: 1,
    tcDesc: '1st page with the size = 5 sorted by name',
    request: {
      positive: {
        query: {
          page: 0,
          size: 100,
          sort: ['name,asc'],
        },
      },
    },
    response: {
      body: {
        sortOption: 'asc',
        sortBy: 'name',
      },
    },
  },
  {
    tcId: 2,
    tcDesc: '1st page with the size = 5 sorted by descending name',
    request: {
      positive: {
        query: {
          page: 0,
          size: 100,
          sort: ['name,desc'],
        },
      },
    },
    response: {
      body: {
        sortOption: 'desc',
        sortBy: 'name',
      },
    },
  },
  {
    tcId: 3,
    tcDesc: '1st page with the size = 5 sorted by email',
    request: {
      positive: {
        query: {
          page: 0,
          size: 5,
          sort: ['email,asc'],
        },
      },
    },
    response: {
      body: {
        sortOption: 'asc',
        sortBy: 'email',
      },
    },
  },
  {
    tcId: 4,
    tcDesc: '1st page with the size = 5 sorted by descending email',
    request: {
      positive: {
        query: {
          page: 0,
          size: 5,
          sort: ['email,desc'],
        },
      },
    },
    response: {
      body: {
        sortOption: 'desc',
        sortBy: 'email',
      },
    },
  },
  {
    tcId: 5,
    tcDesc: '1st page with the size = 5 sorted by address',
    request: {
      positive: {
        query: {
          page: 0,
          size: 5,
          sort: ['address,asc'],
        },
      },
    },
    response: {
      body: {
        sortOption: 'asc',
        sortBy: 'address',
      },
    },
  },
  {
    tcId: 6,
    tcDesc: '1st page with the size = 5 sorted by descending address',
    request: {
      positive: {
        query: {
          page: 0,
          size: 5,
          sort: ['address,desc'],
        },
      },
    },
    response: {
      body: {
        sortOption: 'desc',
        sortBy: 'address',
      },
    },
  },
  {
    tcId: 7,
    tcDesc: '1st page with the size = 5 sorted by city',
    request: {
      positive: {
        query: {
          page: 0,
          size: 5,
          sort: ['city,asc'],
        },
      },
    },
    response: {
      body: {
        sortOption: 'asc',
        sortBy: 'city',
      },
    },
  },
  {
    tcId: 8,
    tcDesc: '1st page with the size = 5 sorted by descending city',
    request: {
      positive: {
        query: {
          page: 0,
          size: 5,
          sort: ['city,desc'],
        },
      },
    },
    response: {
      body: {
        sortOption: 'desc',
        sortBy: 'city',
      },
    },
  },
  {
    tcId: 9,
    tcDesc: '1st page with the size = 5 sorted by zipCode',
    request: {
      positive: {
        query: {
          page: 0,
          size: 5,
          sort: ['zipCode,asc'],
        },
      },
    },
    response: {
      body: {
        sortOption: 'asc',
        sortBy: 'zipCode',
      },
    },
  },
  {
    tcId: 10,
    tcDesc: '1st page with the size = 5 sorted by descending zipCode',
    request: {
      positive: {
        query: {
          page: 0,
          size: 5,
          sort: ['zipCode,desc'],
        },
      },
    },
    response: {
      body: {
        sortOption: 'desc',
        sortBy: 'zipCode',
      },
    },
  },
];

export const MERCH_HIERARCHY_GET_BY_ID: TTestCase<TGetMerchantParam, 'positive'>[] = [
  {
    tcId: 1,
    tcDesc: 'merchant ID = Merchant_1 ID, Merchant_1 has Merchant_2 children, and includeChildren is false',
    request: {
      positive: {
        query: {
          includeChildren: false,
        },
        path: {
          merchantId: merchant1.alias,
        },
      },
    },
    response: {
      body: {
        ...merchant1.body,
        children: [],
      },
    },
  },
  {
    tcId: 2,
    tcDesc: 'merchant ID = Merchant_2 ID, Merchant_2 has Merchant_3 children, and includeChildren is undefined',
    request: {
      positive: {
        query: {
          includeChildren: undefined,
        },
        path: {
          merchantId: merchant2.alias,
        },
      },
    },
    response: {
      body: {
        ...merchant2.body,
        children: [],
      },
    },
  },
  {
    tcId: 3,
    tcDesc: "merchant ID = Merchant_3 ID, Merchant_3 doesn't have its children and includeChildren is true",
    request: {
      positive: {
        query: {
          includeChildren: true,
        },
        path: {
          merchantId: merchant3.alias,
        },
      },
    },
    response: {
      body: {
        ...merchant3.body,
        children: [],
      },
    },
  },
  {
    tcId: 4,
    tcDesc:
      'merchant ID = Merchant_1 ID, Merchant_1 has Merchant_2 children, Merchant_2 has children Merchant_3 and includeChildren = true',
    request: {
      positive: {
        query: {
          includeChildren: true,
        },
        path: {
          merchantId: merchant1.alias,
        },
      },
    },
    response: {
      body: {
        ...merchant1.body,
        children: [],
      },
    },
  },
  {
    tcId: 5,
    tcDesc: 'merchant ID = Merchant_2 ID, Merchant_2 is children Merchant_1 and has children Merchant_3, (includeChildren: true)',
    request: {
      positive: {
        query: {
          includeChildren: true,
        },
        path: {
          merchantId: merchant2.alias,
        },
      },
    },
    response: {
      body: {
        ...merchant2.body,
        children: [],
      },
    },
  },
];

export const MERCH_HIERARCHY_GET_CHILDREN: TTestCase<TGetChildrenParam, 'positive'>[] = [
  {
    tcId: 1,
    tcDesc: 'Merchant ID = Merchant_1 ID, Merchant_1 has children Merchant_2 and Merchant_2 has children Merchant_3',
    request: {
      positive: {
        path: {
          merchantId: merchant1.alias,
        },
        query: {
          'include-children': true,
          size: 100,
        },
      },
    },
    response: {
      body: {
        content: [merchant2.body],
      },
      statusCode: 200,
    },
  },
  {
    tcId: 2,
    tcDesc: 'Merchant ID = Merchant_2 ID, Merchant_2 has children Merchant_3 and parent is Merchant_1',
    request: {
      positive: {
        path: {
          merchantId: merchant2.alias,
        },
        query: {
          'include-children': true,
          size: 100,
        },
      },
    },
    response: {
      body: {
        content: [merchant3.body],
      },
    },
  },
  {
    tcId: 3,
    tcDesc: "Merchant ID = Merchant_3 ID, Merchant_3 doesn't  have children",
    request: {
      positive: {
        path: {
          merchantId: merchant3.alias,
        },
        query: {
          'include-children': true,
          size: 100,
        },
      },
    },
    response: {
      body: {
        content: [],
      },
    },
  },
  {
    tcId: 4,
    tcDesc: "Merchant ID = Merchant_3 ID, Merchant_3 doesn't  have children and include-children'= true",
    request: {
      positive: {
        path: {
          merchantId: merchant3.alias,
        },
        query: {
          'include-children': true,
          size: 100,
        },
      },
    },
    response: {
      body: {
        content: [],
      },
    },
  },
  {
    tcId: 5,
    tcDesc: 'Merchant ID = Merchant_1 ID, include-children = false',
    request: {
      positive: {
        path: {
          merchantId: merchant1.alias,
        },
        query: {
          'include-children': false,
          size: 100,
        },
      },
    },
    response: {
      body: {
        content: [
          {
            name: merchant2.body.name,
            phoneNumber: merchant2.body.phoneNumber,
            email: merchant2.body.email,
            address: merchant2.body.address,
            city: merchant2.body.city,
            state: merchant2.body.state,
            zipCode: merchant2.body.zipCode,
            isArchived: merchant2.body.isArchived,
            children: [],
          },
        ],
      },
    },
  },
];

export const MERCH_HIERARCHY_CREATE: TTestCase<TCreateMerchantParam, 'positive'>[] = [
  {
    tcId: 1,
    tcDesc: 'Merchant Name length is 150',
    request: {
      positive: {
        body: {
          ...merchant4,
          name: generateAlphabeticString(150),
        },
      },
    },
    response: {
      statusCode: 201,
    },
  },
  {
    tcId: 2,
    tcDesc: 'Merchant Name length is 149',
    request: {
      positive: {
        body: {
          ...merchant4,
          name: generateAlphabeticString(149),
        },
      },
    },
    response: {
      statusCode: 201,
    },
  },
  {
    tcId: 3,
    tcDesc: 'Merchant Name with special character',
    request: {
      positive: {
        body: {
          ...merchant4,
          name: `${generateAlphabeticString(10)}#$%^`,
        },
      },
    },
    response: {
      statusCode: 201,
    },
  },
  {
    tcId: 4,
    tcDesc: 'Merchant Name with space in the front',
    request: {
      positive: {
        body: {
          ...merchant4,
          name: ` ${generateAlphabeticString(5)}`,
        },
      },
    },
    response: {
      statusCode: 201,
    },
  },
  {
    tcId: 5,
    tcDesc: 'Merchant Name with space in the middle',
    request: {
      positive: {
        body: {
          ...merchant4,
          name: `${generateAlphabeticString(5)} ${generateNumericString(5)}`,
        },
      },
    },
    response: {
      statusCode: 201,
    },
  },
  {
    tcId: 6,
    tcDesc: 'Merchant Name with space in the end',
    request: {
      positive: {
        body: {
          ...merchant4,
          name: `${generateAlphabeticString(5)} `,
        },
      },
    },
    response: {
      statusCode: 201,
    },
  },
  {
    tcId: 7,
    tcDesc: 'Merchant Name is empty string',
    request: {
      positive: {
        body: {
          ...merchant4,
          name: '',
        },
      },
    },
    response: {
      statusCode: 201,
    },
  },
  {
    tcId: 8,
    tcDesc: 'Merchant Email is valid',
    request: {
      positive: {
        body: {
          ...merchant4,
          name: generateAlphabeticString(5),
          email: 'g@gmail.com3',
        },
      },
    },
    response: {
      statusCode: 201,
    },
  },
  {
    tcId: 9,
    tcDesc: 'Merchant Address length is 250',
    request: {
      positive: {
        body: {
          ...merchant4,
          name: generateAlphabeticString(5),
          address: generateAlphabeticString(250),
        },
      },
    },
    response: {
      statusCode: 201,
    },
  },
  {
    tcId: 10,
    tcDesc: 'Merchant Address length is 249',
    request: {
      positive: {
        body: {
          ...merchant4,
          name: generateAlphabeticString(5),
          address: generateAlphabeticString(249),
        },
      },
    },
    response: {
      statusCode: 201,
    },
  },
  {
    tcId: 11,
    tcDesc: 'Merchant Address length is 1',
    request: {
      positive: {
        body: {
          ...merchant4,
          name: generateAlphabeticString(5),
          address: 'a',
        },
      },
    },
    response: {
      statusCode: 201,
    },
  },
  {
    tcId: 12,
    tcDesc: 'Merchant City length is 150',
    request: {
      positive: {
        body: {
          ...merchant4,
          name: generateAlphabeticString(5),
          city: generateAlphabeticString(150),
        },
      },
    },
    response: {
      statusCode: 201,
    },
  },
  {
    tcId: 13,
    tcDesc: 'Merchant City length is 149',
    request: {
      positive: {
        body: {
          ...merchant4,
          name: generateAlphabeticString(5),
          city: generateAlphabeticString(149),
        },
      },
    },
    response: {
      statusCode: 201,
    },
  },
  {
    tcId: 14,
    tcDesc: 'Merchant City length is 1',
    request: {
      positive: {
        body: {
          ...merchant4,
          name: generateAlphabeticString(5),
          city: 'a',
        },
      },
    },
    response: {
      statusCode: 201,
    },
  },
];
