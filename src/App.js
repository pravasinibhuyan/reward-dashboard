import MainLayout from '@/layout/MainLayout';
import { useTransactions } from '@/hooks/useTransactions';
import Card from '@/components/common/card/Card';
import TransactionsTable from '@/components/common/transactions/TransactionsTable';
import TotalRewardsTable from '@/components/common/rewards/TotalRewardsTable';
import MonthlyRewardsTable from '@/components/common/rewards/MonthlyRewardsTable';

function App() {
  const { data, isLoading, error } = useTransactions();

  if (isLoading) return <div className="loader">Loading...</div>;
  if (error) return <h2 className="loader">{error.message}</h2>;
  if (!data.length) return <h2 className="loader">No data found</h2>;

  return (
    <MainLayout>
      <Card title="Transactions">
        <TransactionsTable data={data} isLoading={isLoading} />
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 items-stretch">
        <Card title="Monthly Rewards">
          <MonthlyRewardsTable data={data} isLoading={isLoading} />
        </Card>
        <Card title="Total Rewards">
          <TotalRewardsTable data={data} isLoading={isLoading} />
        </Card>
      </div>
    </MainLayout>
  );
}

export default App;
