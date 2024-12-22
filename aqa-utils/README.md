# @rak-aqa/utils

Available API:

* `setTestEnvConf`
* `getCurrentTestData`
* `getCurrentTestEnv`
* `memory`
* `parse`
* `setEnvVarFromCli`

## Get started:

1. Install the package: `npm i @rak-aqa/utils`
2. How to work:
    1. Environments:

    ```typescript
    import {setTestEnvConf, getCurrentTestData, getCurrentTestEnv} from '@rak-aqa/utils';

    export const envConf = setTestEnvConf([{
        default: true,
        id: 'dev1',
        constants: {
            pageTitle: 'Hello world',
            creationForm: {
                name: 'form name',
            },
        },
        ui: {
            url: '',
            data: [{
                id: 'DB',
                key: '...',
            }],
        },
        services: {
            servicename: {
                url: '',
                main: true,
                data: [{
                    id: 'user',
                    credentials: {
                        username: '',
                        password: '',
                    },
                }],
            },
        },
    }]);

    // getCurrentTestEnv() === envConf

    envConf.ui.url;

    envConf.id; // 'poc01', 'local', 'fb', 'dev', 'qa', 'uat', 'prd'. The value will be the same as in '--test-env' or `TEST_ENV` env var.

    envConf.services['servicename']!.url;

    envConf.constants['pageTitle'];

    envConf.ui.data; // [{id: '...', ...}]

    getCurrentTestData('ui', 'DB'); // -> { id: 'DB', key: '...' }

    getCurrentTestData('servicename', 'user'); // -> { id: 'DB', credentials: {...} }
    ```

   Possible params: 
      * `--testenv` or `TEST_ENV` env var. Values: `'poc01', 'local', 'fb', 'dev1', 'qa1', 'uat', 'prd'`.
      * `--testurl` or `TEST_URL` env var. Type: `string`
        
         > Note: If a URL passed, then `fb` config will be used automatically.
         
         > If two configs passed (`ui` and `services`), the URL will be applied to `ui` and main `service` configurations.

    2. Memory helper:

    ```typescript
    import {memory} from '@rak-aqa/utils';

    memory.config({overwrite: true}); // Optional. Default config: {overwrite: false}
    memory.has(key); // check whether an entity exist in Memory or not
    memory.set(key, value); // set (remember) entity in Memory. key: stringl value: any
    memory.get(key); // get an entity by key
    memory.delete(key); // delete only one entity by key
    memory.clear(); // clear all entityes in Memory;
    ```

    3. Value parser:

    ```typescript
    import {parse} from '@rak-aqa/utils';

    // 1. To get a value from Memory, the key must start with the '#$' character:

    parse('#$myKey'); // -> value from Memory

    // 2. To get a value from 'constants' of 'testEnv', the key must start with the '#$$' characters:

    parse('#$$pageTitle'); // -> value from constants
    
    parse('#$$creationForm.name'); // -> value from constants

    // 3. If there is no '#$' character in the key name, 'valueParser' will return the same value:

    parse('value'); // -> 'value'
    ```
   
   4. Setup env variable from cli parameter

   ```typescript
   import {setEnvVarFromCli} from '@rak-aqa/utils';
   
   setEnvVarFromCli([{
        env: 'MY_ENV_VAR',
        cli: 'myenvvar'
   }]);
   
   console.log('Output: ', process.env['MY_ENV_VAR']);
   ```
   
   ```
   >$ npm run myscript -- --myenvvar="hello world"
   Output: hello world
   ```
