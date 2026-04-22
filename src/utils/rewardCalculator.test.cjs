let calculateRewardPoints;

beforeAll(async () => {
  ({ calculateRewardPoints } = await import('./rewardCalculator.js'));
});

describe('calculateRewardPoints', () => {
  it('returns 0 for invalid or empty amounts', () => {
    expect(calculateRewardPoints(null)).toBe(0);
    expect(calculateRewardPoints(undefined)).toBe(0);
    expect(calculateRewardPoints('abc')).toBe(0);
    expect(calculateRewardPoints(0)).toBe(0);
  });

  it('throws a custom error for negative values', () => {
    expect(() => calculateRewardPoints(-10)).toThrow(
      'Negative amounts are not allowed for reward calculation.'
    );
  });

  it('calculates reward points correctly for amounts between 50 and 100', () => {
    expect(calculateRewardPoints(50)).toBe(0);
    expect(calculateRewardPoints(51)).toBe(1);
    expect(calculateRewardPoints(75)).toBe(25);
    expect(calculateRewardPoints(100)).toBe(50);
  });

  it('calculates reward points correctly for amounts above 100', () => {
    expect(calculateRewardPoints(101)).toBe(52);
    expect(calculateRewardPoints(120)).toBe(90);
    expect(calculateRewardPoints(150)).toBe(150);
  });

  it('floors decimal amounts before calculating points', () => {
    expect(calculateRewardPoints(99.9)).toBe(49);
    expect(calculateRewardPoints(120.4)).toBe(90);
  });
});
