import React from 'react';
import StatsCard from '../../components/StatsCard/index';
import TransactionsTable from '../../components/TransactionTable/index';
import UsersChart from '../../components/UsersChart/index';
import { StyledCard, StyledDashBoardContainer } from './DashBoardPage.style';
import { Box, Typography } from '@mui/material';

const Dashboard = () => {
  return (
    <StyledDashBoardContainer>
      <StyledCard>
        <StatsCard title="Total Orders" value="1,234" />
        <StatsCard title="Revenue" value="$12,345" />
        <StatsCard title="New Users" value="56" />
      </StyledCard>

      <Box sx={{ mt: '20px' }}>
        <Typography variant='h2'>Recent Transactions</Typography>
        <TransactionsTable />
      </Box>

      <Box sx={{ mt: '20px' }}>
        <Typography variant='h2'>User Growth</Typography>
        <UsersChart />
      </Box>
    </StyledDashBoardContainer>
  );
};

export default Dashboard;
