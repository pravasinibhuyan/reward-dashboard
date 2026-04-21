const MONTH_NAME_TO_INDEX = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11,
};

const isValidDate = (date) => !Number.isNaN(date.getTime());

// Parse "DD/MM/YYYY"
const parseFromSlash = (value) => {
  const parts = value.split('/');
  if (parts.length !== 3) return null;

  const [day, month, year] = parts.map(Number);
  if (!day || !month || !year) return null;

  const date = new Date(year, month - 1, day);
  return isValidDate(date) ? date : null;
};

// Parse "Month YYYY" (e.g., "Jan 2026", "January 2026")
const parseFromMonthYear = (value) => {
  const parts = value.split(' ');
  if (parts.length !== 2) return null;

  let [monthName, year] = parts;

  const monthKey = monthName.toLowerCase().slice(0, 3);
  const monthIndex = MONTH_NAME_TO_INDEX[monthKey];

  if (monthIndex == null || !year) return null;

  const date = new Date(Number(year), monthIndex, 1);
  return isValidDate(date) ? date : null;
};

export const parseDateValue = (value) => {
  if (!value) return null;

  // Already a Date
  if (value instanceof Date) {
    return isValidDate(value) ? value : null;
  }

  if (typeof value !== 'string') return null;

  // Try native parsing first (ISO, etc.)
  const native = new Date(value);
  if (isValidDate(native)) return native;

  // Try simple formats
  return parseFromSlash(value) || parseFromMonthYear(value);
};

const formatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
});

export const formatMonthYear = (date) => {
  const parsed = parseDateValue(date);
  return parsed ? formatter.format(parsed) : '';
};

export const formatMonthKey = (date) => {
  const parsed = parseDateValue(date);
  if (!parsed) return '';

  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, '0');

  return `${year}-${month}`;
};
