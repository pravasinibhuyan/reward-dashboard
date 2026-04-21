import { useState } from 'react';
import Table from '../table/Table';
import { aggregateTotal } from '@/utils/aggregation';
/**
 * TotalRewardsTable Component
 *
 * Displays aggregated reward points per customer using a reusable Table component.
 * This table:
 * - Aggregates total reward points from raw transaction data
 * - Supports sorting on all columns
 * - Uses controlled pagination
 * - Disables date filtering (not required for aggregated view)
 *
 * Wrapped with React.memo to prevent unnecessary re-renders
 * when props (`data`, `isLoading`) do not change.
 *
 * @component
 *
 * @param {Object} props - Component props
 *
 * @param {Array<Object>} props.data
 * Raw transaction dataset used to compute total rewards per customer.
 *
 * @param {boolean} props.isLoading
 * Loading state for the table.
 *
 * @returns {JSX.Element}
 * Rendered table showing total reward points grouped by customer.
 */
const TotalRewardsTable = ({ data, isLoading }) => {
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
      title: 'Reward Points',
      dataIndex: 'totalPoints',
      key: 'totalPoints',
      align: 'right',
      sorter: (a, b) => a.totalPoints - b.totalPoints,
    },
  ];

  /**
   * Aggregated dataset containing total reward points per customer.
   *
   * Uses `aggregateTotal` utility to transform raw transaction data.
   *
   * @type {Array<Object>}
   */
  const aggregatedData = aggregateTotal(data);

  return (
    <Table
      columns={columns}
      isLoading={isLoading}
      page={page}
      setPage={setPage}
      pageSize={pageSize}
      setPageSize={setPageSize}
      data={aggregatedData}
      showDatePicker={false}
    />
  );
};

export default TotalRewardsTable;
