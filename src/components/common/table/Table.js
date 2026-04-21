import { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import TableToolbar from './TableToolbar';

/**
 * CustomTable Component
 *
 * A reusable wrapper around Ant Design Table that provides:
 * - Global search with debounce
 * - Optional date range filtering
 * - Controlled pagination
 * - Integrated toolbar (search + date picker)
 *
 * @component
 *
 * @template TRow
 *
 * @param {Object} props - Component props
 * @param {Array<Object>} props.columns Column configuration for Ant Design Table
 * @param {Array<TRow>} props.data Dataset to display
 * @param {number} props.page Current page (1-based index)
 * @param {(page: number) => void} props.setPage Page change handler
 * @param {number} props.pageSize Number of rows per page
 * @param {(pageSize: number) => void} props.setPageSize Page size change handler
 * @param {boolean} props.isLoading Loading state of table
 * @param {boolean} [props.showDatePicker=true] Toggle date filter visibility
 *
 * @returns {JSX.Element} Rendered table with filtering and pagination
 */
const CustomTable = ({
  columns = [],
  data = [],
  page,
  setPage,
  pageSize,
  setPageSize,
  isLoading,
  showDatePicker = true,
}) => {
  /**
   * Search input state
   * @type {[string, Function]}
   */
  const [searchText, setSearchText] = useState('');

  /**
   * Debounced search value (250ms delay)
   * @type {[string, Function]}
   */
  const [debouncedSearchText, setDebouncedSearchText] = useState('');

  /**
   * Date range filter state
   * @type {[{ from: Date|null, to: Date|null }, Function]}
   */
  const [dateRange, setDateRange] = useState({ from: null, to: null });

  /**
   * Debounce effect for search input
   */
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchText(searchText.trim());
    }, 250);

    return () => clearTimeout(timeoutId);
  }, [searchText]);

  /**
   * Filtered dataset based on search and date range
   * @type {Array<TRow>}
   */
  const filteredData = useMemo(() => {
    let result = data;

    const searchTerm = debouncedSearchText.toLowerCase();

    // Search filter
    if (searchTerm) {
      const searchableKeys = ['name', 'product', 'id', 'amount', 'points'];

      result = result.filter((row) =>
        searchableKeys.some((key) =>
          String(row[key] ?? '')
            .toLowerCase()
            .includes(searchTerm)
        )
      );
    }

    // Date filter
    if (showDatePicker && (dateRange.from || dateRange.to)) {
      result = result.filter((row) => {
        const dateValue = row.createdDate || row.date || row.month;
        const rowDate = new Date(dateValue);

        if (isNaN(rowDate.getTime())) return false;

        if (dateRange.from) {
          const from = new Date(dateRange.from);
          from.setHours(0, 0, 0, 0);
          if (rowDate < from) return false;
        }

        if (dateRange.to) {
          const to = new Date(dateRange.to);
          to.setHours(23, 59, 59, 999);
          if (rowDate > to) return false;
        }

        return true;
      });
    }

    return result;
  }, [data, debouncedSearchText, dateRange.from, dateRange.to, showDatePicker]);

  /**
   * Reset page when filters change
   */
  useEffect(() => {
    setPage(1);
  }, [debouncedSearchText, dateRange.from, dateRange.to, showDatePicker]);

  /**
   * Reset page when filters are cleared
   */
  useEffect(() => {
    const isSearchEmpty = !debouncedSearchText;
    const isDateEmpty = !showDatePicker || (!dateRange.from && !dateRange.to);

    if (isSearchEmpty && isDateEmpty) {
      setPage(1);
    }
  }, [debouncedSearchText, dateRange.from, dateRange.to, showDatePicker]);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-2">
      <TableToolbar
        search={searchText}
        setSearch={setSearchText}
        dateRange={dateRange}
        setDateRange={setDateRange}
        showDatePicker={showDatePicker}
      />

      <Table
        columns={columns}
        loading={isLoading}
        dataSource={filteredData}
        rowKey="id"
        scroll={{ y: 400 }}
        size="middle"
        pagination={{
          current: page,
          pageSize: pageSize,
          total: filteredData.length,
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '25', '50'],
        }}
        onChange={(pagination) => {
          setPage(pagination.current);
          setPageSize(pagination.pageSize);
        }}
      />
    </div>
  );
};

/**
 * PropTypes validation
 */
CustomTable.propTypes = {
  /** Column configuration */
  columns: PropTypes.array.isRequired,

  /** Dataset */
  data: PropTypes.array.isRequired,

  /** Current page */
  page: PropTypes.number.isRequired,

  /** Page change handler */
  setPage: PropTypes.func.isRequired,

  /** Rows per page */
  pageSize: PropTypes.number.isRequired,

  /** Page size change handler */
  setPageSize: PropTypes.func.isRequired,

  /** Show/hide date filter */
  showDatePicker: PropTypes.bool,

  /** Loading state */
  isLoading: PropTypes.bool,
};

export default CustomTable;
