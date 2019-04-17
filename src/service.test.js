import service from './service';

describe('Pricing service', () => {
  test('can compute prices correctly', async () => {
    const result = await new Promise((resolve) => {
      service( // node-fetch is mocked and will return mock data. see /__mocks__/node-fetch.js
        { params: { from: 'earth', to: 'moon', weight: 1000 } },
        { setHeader: () => {}, send: v => resolve(v) },
      );
    });
    expect(JSON.parse(result).price).toBe(1);
  });
});
