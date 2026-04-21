import { useState } from 'react';
import Table from '../table/Table';
import { aggregateMonthly } from '@/utils/aggregation';

/**
 * MonthlyRewardsTable Component
 *
 * Displays reward points aggregated per customer on a monthly basis.
 * This table:
 * - Groups transactions by customer and month
 * - Calculates total reward points per month
 * - Supports sorting on all columns
 * - Uses controlled pagination
 * - Enables date filtering (via Table component by default)
 *
 * Wrapped with React.memo to avoid unnecessary re-renders
 * when props (`data`, `isLoading`) remain unchanged.
 *
 * @component
 *
 * @param {Object} props - Component props
 *
 * @param {Array<Object>} props.data
 * Raw transaction dataset used to compute monthly reward summaries.
 *
 * @param {boolean} props.isLoading
 * Loading state for the table.
 *
 * @returns {JSX.Element}
 * Rendered table showing monthly reward points grouped by customer.
 */
const MonthlyRewardsTable = ({ data, isLoading }) => {
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
   * Includes sorting for:
   * - Transaction ID (numeric string comparison)
   * - Customer name (alphabetical)
   * - Month/Date (string comparison)
   * - Total reward points (numeric)
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
      title: 'Date',
      dataIndex: 'month',
      key: 'month',
      sorter: (a, b) => a.month.localeCompare(b.month),
    },
    {
      title: 'Reward Points',
      dataIndex: 'totalPoints',
      key: 'totalPoints',
      align: 'right',
      sorter: (a, b) => a.totalPoints - b.totalPoints,
    },
  ];

  /**
   * Aggregated dataset containing monthly reward points per customer.
   *
   * Uses `aggregateMonthly` utility to transform raw transaction data.
   *
   * @type {Array<Object>}
   */
  const monthlyData = aggregateMonthly(data);

  return (
    <Table
      columns={columns}
      isLoading={isLoading}
      page={page}
      setPage={setPage}
      pageSize={pageSize}
      setPageSize={setPageSize}
      data={monthlyData}
    />
  );
};

export default MonthlyRewardsTable;
