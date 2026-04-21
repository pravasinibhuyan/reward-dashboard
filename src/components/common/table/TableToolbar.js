import { Search } from 'lucide-react';
import { Input, DatePicker } from 'antd';

const { RangePicker } = DatePicker;

const TableToolbar = ({ search, setSearch, dateRange, setDateRange, showDatePicker = true }) => {
  return (
    <div className="my-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* SEARCH INPUT */}
        <Input
          placeholder="Search..."
          prefix={<Search className="text-gray-600" size={18} />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          allowClear
          className="search-input"
        />

        {/* DATE RANGE PICKER */}
        {showDatePicker && (
          <RangePicker
            className="date-input"
            onChange={(dates) => {
              setDateRange({
                from: dates?.[0] ? new Date(dates[0].$d || dates[0]) : null,
                to: dates?.[1] ? new Date(dates[1].$d || dates[1]) : null,
              });
            }}
            format="DD/MM/YYYY"
            allowClear
          />
        )}
      </div>
    </div>
  );
};

export default TableToolbar;
