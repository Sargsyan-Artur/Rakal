import { ApiClient } from '@rak-aqa/api-client';

import { envConf } from '@configs/env.conf';

export const apiClient = new ApiClient({
  services: {
    merchant: {
      serviceUrl: envConf.services['merchant']!.url,
    },
  },
});

export const merchantController = apiClient.services.service('merchant-hierarchy').controller('merchant');
export const merchantAdminController = apiClient.services.service('merchant-hierarchy').controller('merchantAdmin');
