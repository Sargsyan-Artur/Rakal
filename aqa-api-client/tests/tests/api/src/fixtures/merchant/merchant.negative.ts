import {
  HTTP_ERRORS,
  TCreateMerchantParam,
  TGetChildrenParam,
  TGetMerchantParam,
  TGetMerchantsParam,
  TTestCase,
} from '@rak-aqa/api-client';
import { v4 as uuidv4 } from 'uuid';
import { generateAlphabeticString } from '@rak-aqa/utils';

import { merchant1 } from '@fixtures/merchant/merchant';

export const MERCH_HIERARCHY_NEGATIVE_GET_BY_ID: TTestCase<TGetMerchantParam, 'negative'>[] = [
  {
    tcId: 1,
    tcDesc: 'Merchant ID is wrong and includeChildren is false',
    request: {
      negative: {
        query: {
          includeChildren: false,
        },
        path: {
          merchantId: uuidv4(),
        },
      },
    },
    response: {
      message: HTTP_ERRORS['404'],
    },
  },
  {
    tcId: 2,
    tcDesc: 'Merchant ID is null and includeChildren is true',
    request: {
      negative: {
        query: {
          includeChildren: true,
        },
        path: {
          merchantId: null,
        },
      },
    },
    response: {
      message: HTTP_ERRORS['400'],
    },
  },
  {
    tcId: 3,
    tcDesc: 'Merchant ID is undefined and includeChildren is undefined',
    request: {
      negative: {
        query: {},
        path: {
          merchantId: undefined,
        },
      },
    },
    response: {
      message: HTTP_ERRORS['400'],
    },
  },
  {
    tcId: 4,
    tcDesc: 'Merchant ID is number includeChildren is true',
    request: {
      negative: {
        query: {
          includeChildren: true,
        },
        path: {
          merchantId: 123,
        },
      },
    },
    response: {
      message: HTTP_ERRORS['400'],
    },
  },
  {
    tcId: 5,
    tcDesc: 'Merchant ID is object includeChildren is true',
    request: {
      negative: {
        query: {
          includeChildren: true,
        },
        path: {
          merchantId: {},
        },
      },
    },
    response: {
      message: HTTP_ERRORS['400'],
    },
  },
];

export const MERCH_HIERARCHY_NEGATIVE_QUERY_ARCHIVED: TTestCase<TGetMerchantsParam, 'negative'>[] = [
  {
    tcId: 1,
    tcDesc: 'isArchived = number',
    request: {
      negative: {
        query: {
          isArchived: 123,
        },
      },
    },
    response: {
      message: HTTP_ERRORS['400'],
    },
  },
  {
    tcId: 2,
    tcDesc: 'isArchived = string',
    request: {
      negative: {
        query: {
          isArchived: 'string',
        },
      },
    },
    response: {
      message: HTTP_ERRORS['400'],
    },
  },
];

export const MERCH_HIERARCHY_GET_CHILDREN_NEGATIVE: TTestCase<TGetChildrenParam, 'negative'>[] = [
  {
    tcId: 1,
    tcDesc: 'Merchant ID is null',
    request: {
      negative: {
        path: {
          merchantId: null,
        },
        query: {
          'include-children': true,
          size: 100,
        },
      },
    },
    response: {
      message: HTTP_ERRORS['400'],
    },
  },
  {
    tcId: 2,
    tcDesc: 'Merchant ID is undefined',
    request: {
      negative: {
        path: {
          merchantId: undefined,
        },
        query: {
          'include-children': true,
          size: 100,
        },
      },
    },
    response: {
      message: HTTP_ERRORS['400'],
    },
  },
  {
    tcId: 3,
    tcDesc: 'Merchant ID is number',
    request: {
      negative: {
        path: {
          merchantId: 123,
        },
        query: {
          'include-children': true,
          size: 100,
        },
      },
    },
    response: {
      message: HTTP_ERRORS['400'],
    },
  },
  {
    tcId: 4,
    tcDesc: 'Merchant ID is object',
    request: {
      negative: {
        path: {
          merchantId: {},
        },
        query: {
          'include-children': true,
          size: 100,
        },
      },
    },
    response: {
      message: HTTP_ERRORS['400'],
    },
  },
  {
    tcId: 5,
    tcDesc: 'Merchant ID is correct and include-children is string',
    request: {
      negative: {
        path: {
          merchantId: merchant1.alias,
        },
        query: {
          'include-children': 'string',
          size: 100,
        },
      },
    },
    response: {
      message: HTTP_ERRORS['400'],
    },
  },
  {
    tcId: 6,
    tcDesc: 'Merchant ID is correct and include-children is number',
    request: {
      negative: {
        path: {
          merchantId: merchant1.alias,
        },
        query: {
          'include-children': 12,
          size: 100,
        },
      },
    },
    response: {
      message: HTTP_ERRORS['400'],
    },
  },
];

export const MERCH_HIERARCHY_CREATE_NEGATIVE: TTestCase<TCreateMerchantParam, 'negative'>[] = [
  {
    tcId: 1,
    tcDesc: 'Merchant Name is undefined',
    request: {
      negative: {
        body: {
          name: undefined,
        },
      },
    },
    response: {
      message: HTTP_ERRORS['400'],
    },
  },
  {
    tcId: 2,
    tcDesc: 'Merchant Name is null',
    request: {
      negative: {
        body: {
          name: null,
        },
      },
    },
    response: {
      message: HTTP_ERRORS['400'],
    },
  },
  {
    tcId: 3,
    tcDesc: 'Merchant Name length is more than 150',
    request: {
      negative: {
        body: {
          name: generateAlphabeticString(151),
        },
      },
    },
    response: {
      message: HTTP_ERRORS['400'],
    },
  },
  {
    tcId: 4,
    tcDesc: 'Merchant Name is object',
    request: {
      negative: {
        body: {
          name: {},
        },
      },
    },
    response: {
      message: HTTP_ERRORS['400'],
    },
  },
  {
    tcId: 5,
    tcDesc: 'Merchant Phone Number length is less than 10 digits',
    request: {
      negative: {
        body: {
          name: generateAlphabeticString(5),
          phoneNumber: 123456789,
        },
      },
    },
    response: {
      message: HTTP_ERRORS['400'],
    },
  },
  {
    tcId: 6,
    tcDesc: 'Merchant Phone Number length is more than 10 digits',
    request: {
      negative: {
        body: {
          name: generateAlphabeticString(5),
          phoneNumber: 12345678901,
        },
      },
    },
    response: {
      message: HTTP_ERRORS['400'],
    },
  },
  {
    tcId: 7,
    tcDesc: 'Merchant Phone Number is string',
    request: {
      negative: {
        body: {
          name: generateAlphabeticString(5),
          phoneNumber: '12345678901',
        },
      },
    },
    response: {
      message: HTTP_ERRORS['400'],
    },
  },
  {
    tcId: 8,
    tcDesc: 'Merchant Email without @',
    request: {
      negative: {
        body: {
          name: generateAlphabeticString(5),
          email: 'merchantdomain.com',
        },
      },
    },
    response: {
      message: HTTP_ERRORS['400'],
    },
  },
  {
    tcId: 9,
    tcDesc: 'Merchant Address length is more than 250',
    request: {
      negative: {
        body: {
          name: generateAlphabeticString(5),
          address: generateAlphabeticString(251),
        },
      },
    },
    response: {
      message: HTTP_ERRORS['400'],
    },
  },
  {
    tcId: 10,
    tcDesc: 'Merchant City length is more than 150',
    request: {
      negative: {
        body: {
          name: generateAlphabeticString(5),
          city: generateAlphabeticString(151),
        },
      },
    },
    response: {
      message: HTTP_ERRORS['400'],
    },
  },
  {
    tcId: 11,
    tcDesc: 'Merchant Zip Code length is less than 5',
    request: {
      negative: {
        body: {
          name: generateAlphabeticString(5),
          zipCode: generateAlphabeticString(4),
        },
      },
    },
    response: {
      message: HTTP_ERRORS['400'],
    },
  },
  {
    tcId: 12,
    tcDesc: 'Merchant Zip Code length is more than 5',
    request: {
      negative: {
        body: {
          name: generateAlphabeticString(5),
          zipCode: generateAlphabeticString(6),
        },
      },
    },
    response: {
      message: HTTP_ERRORS['400'],
    },
  },
];

export const MERCH_HIERARCHY_CREATE_DUPLICATE_NEGATIVE: TTestCase<TCreateMerchantParam, 'negative'> = {
  tcId: 1,
  tcDesc: 'Merchant Name already exists',
  request: {
    negative: {
      body: {
        name: generateAlphabeticString(5),
      },
    },
  },
  response: {
    message: HTTP_ERRORS['400'],
  },
};
