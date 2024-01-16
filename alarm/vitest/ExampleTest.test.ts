import { expect, test, describe, it } from 'vitest'

import supertest, { Response } from 'supertest'

import { app } from "../src"

let request = supertest(app)

test('something should return', async (): Promise<void> => {

  //expect(1).toBe(1)
  const response: supertest.Response = await request
    .get('/anomaly/intrusion')
    .expect('Content-Type', /json/)
    .expect('Content-Length', '15')
    .expect(200);
  console.log(response.body);
})

/*
import supertest, { Response } from 'supertest'

import { app } from "../src"

let request = supertest(app)


describe("API Tests", (): void => {
  it('should return a valid response', async (): Promise<void> => {
    const response: supertest.Response = await request.get('/anomaly/intrusion')
      .expect('Content-Type', /json/)
      .expect('Content-Length', '15')
      .expect(200);

    // Add assertions based on your actual response structure
    expect(response.body).toBeDefined();
    console.log(response.body);
    //expect(response.body.someProperty).toBe('expectedValue');
  });
});*/
