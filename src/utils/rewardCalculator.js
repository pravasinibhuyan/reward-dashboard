import { REWARD_RULES } from './constants';

export const calculateRewardPoints = (amount) => {
  if (amount === null || amount === undefined || isNaN(amount)) return 0;

  const numericAmount = Number(amount);

  if (numericAmount < 0) {
    throw new Error('Negative amounts are not allowed for reward calculation.');
  }

  const validAmount = Math.floor(numericAmount);

  if (validAmount <= 0) return 0;

  const over100 = Math.max(validAmount - REWARD_RULES.MAX_THRESHOLD, 0);
  const between = Math.max(
    Math.min(validAmount, REWARD_RULES.MAX_THRESHOLD) - REWARD_RULES.MIN_THRESHOLD,
    0
  );

  return over100 * REWARD_RULES.MULTIPLIER_HIGH + between * REWARD_RULES.MULTIPLIER_LOW;
};
