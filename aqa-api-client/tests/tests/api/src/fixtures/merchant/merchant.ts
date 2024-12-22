import { v4 as uuidv4 } from 'uuid';

export const merchant4 = {
  name: 'merchant4',
  phoneNumber: 1234567890,
  email: 'green@gmail.com4',
  address: 'address4',
  city: 'city4',
  state: {
    abbreviation: 'null',
    name: 'ST4',
  },
  zipCode: 12345,
  children: [],
};

export const merchant3 = {
  alias: 'M3',
  body: {
    id: '',
    name: `Merchant_3${uuidv4()}`,
    phoneNumber: 1234567893,
    email: 'green@gmail.com3',
    address: 'address3',
    city: 'los3',
    state: {
      abbreviation: 'null',
      name: 'KY3',
    },
    zipCode: 10003,
    isArchived: true,
  },
};

export const merchant2 = {
  alias: 'M2',
  body: {
    id: '',
    name: `Merchant_2${uuidv4()}`,
    phoneNumber: 1234567892,
    email: 'green@gmail.com2',
    address: 'address2',
    city: 'los2',
    state: {
      abbreviation: 'null',
      name: 'AL2',
    },
    zipCode: 10002,
    isArchived: false,
  },
};

export const merchant1 = {
  alias: 'M1',
  body: {
    id: '',
    name: `Merchant_1${uuidv4()}`,
    phoneNumber: 1234567891,
    email: 'green@gmail.com1',
    address: 'address1',
    city: 'los1',
    state: {
      abbreviation: 'null',
      name: 'LA1',
    },
    zipCode: 10001,
    isArchived: true,
  },
};

export const merchantCreationReq = [
  {
    merchantAlias: merchant1.alias,
    request: {
      positive: {
        body: merchant1.body,
      },
    },
  },
  {
    merchantAlias: merchant2.alias,
    request: {
      positive: {
        body: merchant2.body,
      },
    },
  },
  {
    merchantAlias: merchant3.alias,
    request: {
      positive: {
        body: merchant3.body,
      },
    },
  },
];

export const merchantGetRequestData = {
  getAll: {
    request: {
      positive: {
        query: {
          size: 100,
          isArchived: true,
        },
      },
    },
  },
  getById: {
    request: {
      positive: {
        query: {},
        path: {
          merchantId: merchant1.alias,
        },
      },
    },
  },
};
