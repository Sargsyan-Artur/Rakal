import { setTestEnvConf } from '@rak-aqa/utils';

export const envConf = setTestEnvConf([
  {
    default: true,
    id: 'local',
    services: {
      merchant: {
        url: 'http://localhost:8080',
      },
    },
  },
  {
    id: 'dev1',
    services: {
      merchant: {
        url: 'https://merchant-service.gsky-mecp.projects.epam.com:8008',
      },
    },
  },
]);
