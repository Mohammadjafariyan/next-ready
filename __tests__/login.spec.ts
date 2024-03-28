// api.test.js

import directus from '@/lib/directus';
import { AuthenticationData, readMe, withToken } from '@directus/sdk';
import { expect } from '@jest/globals';

interface Schema {}

describe('Remote API Tests', () => {
  test('GET /api/data', async () => {
    let email = 'admin@example.com',
      password = 'd1r3ctu5';
    // login using the authentication composable
    let result: void | AuthenticationData = await directus.login(
      email,
      password,
    );

    console.log('-------------------->result------------>', result);

    // directusRest.setToken(result.access_token);

    expect(result.access_token).toBeTruthy();

    // directusGraphql.setToken(result.access_token)

    var resp = await directus.query(`
    query Bank {
        bank {
            title
            code
            id
        }
    }

    `);

    console.log(resp);
    expect(resp).toBeTruthy();

    // login http request
    //const result = await directusRest.request(login(email, password));

    //expect(response.status).toBe(200);
    // expect(response.body).toHaveProperty('data');
  });

  // Add more test cases for other endpoints as needed
});
