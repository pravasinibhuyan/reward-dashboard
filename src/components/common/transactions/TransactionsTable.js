import { useState } from 'react';
import Table from '../table/Table';
import { formatMonthYear } from '@/utils/date';
import { formatCurrency } from '@/utils/currencyFormat';

/**
 * TransactionsTable Component
 *
 * Displays a detailed list of transactions with formatted fields.
 * This table:
 * - Shows transaction-level data (no aggregation)
 * - Formats date into month/year view
 * - Formats amount as currency
 * - Supports sorting on all columns
 * - Uses controlled pagination
 * - Supports search and date filtering (via Table component)
 *
 * Wrapped with React.memo to prevent unnecessary re-renders
 * when props (`data`, `isLoading`) do not change.
 *
 * @component
 *
 * @param {Object} props - Component props
 *
 * @param {Array<Object>} props.data
 * Raw transaction dataset to display.
 *
 * @param {boolean} props.isLoading
 * Loading state for the table.
 *
 * @returns {JSX.Element}
 * Rendered table showing transaction details.
 */
const TransactionsTable = ({ data, isLoading }) => {
  /**
   * Current active page (1-based index).
   *
   * @type {[number, Function]}
   */
  const [page, setPage] = useState(1);

  /**
   * Number of rows displayed per page.
   *
   * @type {[number, Function]}
   */
  const [pageSize, setPageSize] = useState(5);

  /**
   * Column configuration for the table.
   *
   * Includes:
   * - Sorting for all fields
   * - Custom renderers for date and currency formatting
   *
   * @type {Array<Object>}
   */
  const columns = [
    {
      title: 'Transaction Id',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }),
    },
    {
      title: 'Customer',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
      sorter: (a, b) => a.product.localeCompare(b.product),
    },
    {
      title: 'Created Date',
      dataIndex: 'createdDate',
      key: 'createdDate',

      /**
       * Formats raw date into Month-Year format.
       *
       * @param {string|Date} value - Raw date value
       * @returns {string} Formatted date (e.g., "Jan 2026")
       */
      render: (value) => formatMonthYear(value),

      sorter: (a, b) => new Date(a.createdDate) - new Date(b.createdDate),
    },
    {
      title: 'Price',
      dataIndex: 'amount',
      key: 'amount',

      /**
       * Formats numeric value into currency string.
       *
       * @param {number} value - Raw amount
       * @returns {string} Formatted currency (e.g., "$120.00")
       */
      render: (value) => formatCurrency(value),

      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: 'Reward Points',
      dataIndex: 'points',
      key: 'points',
      align: 'right',
      sorter: (a, b) => a.points - b.points,
    },
  ];

  return (
    <Table
      columns={columns}
      isLoading={isLoading}
      page={page}
      setPage={setPage}
      pageSize={pageSize}
      setPageSize={setPageSize}
      data={data}
    />
  );
};

export default TransactionsTable;
