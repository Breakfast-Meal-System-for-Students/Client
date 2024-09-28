import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import FeedbackCard from '../../components/FeedbackCard/FeedbackCard';

const feedbackData = [
  {
    name: 'Nina Holloway',
    date: '29 Aug 2017',
    rating: 4,
    comment: 'A wonderful way to spend an afternoon. The tour was well-organized and enjoyable.',
    comments: 7,
  },
  {
    name: 'Steve Fletcher',
    date: '30 Aug 2017',
    rating: 5,
    comment: 'A memorable experience with great food and service. Highly recommend!',
    comments: 6,
  },
  {
    name: 'Oscar Rogers',
    date: '29 Aug 2017',
    rating: 3,
    comment: 'Good experience but could have been better in terms of service.',
    comments: 2,
  },
];

const FeedbackPage = () => {
  return (
    <Container>
      <Paper sx={{ p: 4, mb: 4, borderRadius: 3, boxShadow: 3 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Feedback of Customers
        </Typography>

        <Box>
          {feedbackData.map((feedback, index) => (
            <FeedbackCard key={index} feedback={feedback} />
          ))}
        </Box>
      </Paper>
    </Container>
  );
};

export default FeedbackPage;
