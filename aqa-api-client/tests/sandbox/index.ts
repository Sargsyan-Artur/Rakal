import { ApiClient } from '../../src/api/client';

// here can be verified any api or feature

new ApiClient({
    services: {
        auth: {
            serviceUrl: 'http://localhost:8080/auth-service',
        },
        product: {
            serviceUrl: 'http://localhost:8080/product',
        },
        merchant: {
            serviceUrl: 'http://localhost:8080',
        },
        job: {
            serviceUrl: 'http://localhost:8080',
        },
        user: {
            serviceUrl: 'http://localhost:8080/user-service',
        },
    },
})
    .login({
        username: '',
        password: '',
    })
    .then((apiClient: ApiClient) =>
        apiClient.services
            .service('product')
            .controller('brand')
            .findAll({
                positive: {
                    query: {
                        divisionId: '',
                    },
                },
            }),
    )
    .catch(e => e);
