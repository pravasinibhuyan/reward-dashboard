import { fetchTransactions } from '@/services/transactionService';
import logger from '@/utils/logger';
import { useEffect, useState } from 'react';

/**
 * useTransactions Hook
 *
 * Custom React hook for fetching and managing transaction data.
 *
 * Responsibilities:
 * - Fetch transaction data from API (`fetchTransactions`)
 * - Manage loading state
 * - Handle and store errors
 * - Log errors using a logger utility
 *
 * This hook runs once on component mount.
 *
 * @function useTransactions
 *
 * @returns {Object} Hook state
 * @returns {Array<Object>} returns.data
 * List of transactions enriched with reward points.
 *
 * @returns {boolean} returns.isLoading
 * Indicates whether the data is currently being fetched.
 *
 * @returns {Error|null} returns.error
 * Error object if the request fails, otherwise null.
 */
export const useTransactions = () => {
  /**
   * Transaction dataset
   * @type {[Array<Object>, Function]}
   */
  const [data, setData] = useState([]);

  /**
   * Loading state indicator
   * @type {[boolean, Function]}
   */
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Error state
   * @type {[Error|null, Function]}
   */
  const [error, setError] = useState(null);

  /**
   * Fetch transactions on mount
   */
  useEffect(() => {
    setIsLoading(true);

    fetchTransactions()
      .then(setData)
      .catch((err) => {
        /**
         * Log error using logger utility
         */
        logger.error(err);

        setError(err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return { data, isLoading, error };
};
