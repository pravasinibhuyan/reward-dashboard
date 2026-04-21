import { calculateRewardPoints } from '@/utils/rewardCalculator';

/**
 * Fetch Transactions API
 *
 * Retrieves transaction data from a local JSON file and enriches each record
 * with calculated reward points.
 *
 * Flow:
 * - Fetches raw transaction data from `/transactions.json`
 * - Validates response status
 * - Parses JSON response
 * - Computes reward points for each transaction using `calculateRewardPoints`
 * - Returns updated dataset
 *
 * @async
 * @function fetchTransactions
 *
 * @returns {Promise<Array<Object>>}
 * A promise that resolves to an array of transaction objects with reward points.
 *
 * Each transaction object structure:
 * @property {string} id - Transaction ID
 * @property {string} name - Customer name
 * @property {string} product - Product name
 * @property {number} amount - Transaction amount
 * @property {string|Date} createdDate - Transaction date
 * @property {number} points - Calculated reward points
 *
 * @throws {Error}
 * Throws an error if the network response is not OK.
 */
export const fetchTransactions = async () => {
  /**
   * Fetch raw transaction data from local JSON file
   * @type {Response}
   */
  const response = await fetch('/transactions.json');

  /**
   * Validate response status
   */
  if (!response.ok) {
    throw new Error('Failed to fetch transactions');
  }

  /**
   * Parsed JSON data
   * @type {Array<Object>}
   */
  const raw = await response.json();

  /**
   * Enrich transactions with reward points
   * @type {Array<Object>}
   */
  return raw.map((transaction) => {
    const points = calculateRewardPoints(transaction.amount);

    return {
      ...transaction,
      points,
    };
  });
};
