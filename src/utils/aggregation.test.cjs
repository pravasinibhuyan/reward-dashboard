let aggregateMonthly;

beforeAll(async () => {
  ({ aggregateMonthly } = await import('./aggregation.js'));
});

describe('aggregateMonthly', () => {
  it('returns only the most recent three months of data in descending order', () => {
    const transactions = [
      { id: '0001', name: 'A', createdDate: '2024-07-15', points: 10 },
      { id: '0002', name: 'B', createdDate: '2024-07-23', points: 20 },
      { id: '0003', name: 'C', createdDate: '2024-06-05', points: 15 },
      { id: '0004', name: 'D', createdDate: '2024-05-10', points: 25 },
      { id: '0005', name: 'E', createdDate: '2024-04-03', points: 30 },
    ];

    const aggregated = aggregateMonthly(transactions);

    expect(aggregated).toHaveLength(4);
    expect(aggregated[0].month).toBe('Jul 2024');
    expect(aggregated[1].month).toBe('Jul 2024');
    expect(aggregated[2].month).toBe('Jun 2024');
    expect(aggregated[3].month).toBe('May 2024');
  });
});
