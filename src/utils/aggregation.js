import { formatMonthYear, formatMonthKey } from './date';

export const aggregateMonthly = (transactions = []) => {
  const availableMonths = Array.from(
    new Set(
      transactions.map((transaction) => formatMonthKey(transaction.createdDate)).filter(Boolean)
    )
  ).sort((a, b) => b.localeCompare(a));

  const recentMonths = availableMonths.slice(0, 3);

  const monthlyMap = transactions.reduce((accumulator, transaction) => {
    const monthKey = formatMonthKey(transaction.createdDate);

    if (!recentMonths.includes(monthKey)) {
      return accumulator;
    }

    const aggregateKey = `${transaction.id}-${monthKey}`;

    if (!accumulator[aggregateKey]) {
      accumulator[aggregateKey] = {
        id: transaction.id,
        name: transaction.name,
        month: formatMonthYear(transaction.createdDate),
        monthKey,
        totalPoints: 0,
      };
    }

    accumulator[aggregateKey].totalPoints += transaction.points || 0;

    return accumulator;
  }, {});

  return Object.values(monthlyMap)
    .sort((a, b) => b.monthKey.localeCompare(a.monthKey))
    .map(({ monthKey, ...rest }) => rest);
};

export const aggregateTotal = (transactions = []) => {
  const totalMap = transactions.reduce((accumulator, transaction) => {
    if (!accumulator[transaction.id]) {
      accumulator[transaction.id] = {
        id: transaction.id,
        name: transaction.name,
        totalPoints: 0,
      };
    }

    accumulator[transaction.id].totalPoints += transaction.points || 0;

    return accumulator;
  }, {});

  return Object.values(totalMap).sort((a, b) => b.totalPoints - a.totalPoints);
};
