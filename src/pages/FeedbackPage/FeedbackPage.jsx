import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import FeedbackCard from '../../components/FeedbackCard/FeedbackCard';

const feedbackData = [
  {
    name: 'Nguyễn Quốc Huy',
    date: '29 Aug 2024',
    rating: 4,
    comment: 'Đồ ăn vẫn còn nóng , không cần mất thời gian chờ',
 
  },
  {
    name: 'Đặng Đình Huy',
    date: '30 Aug 2024',
    rating: 5,
    comment: 'Tiết kiệm thời gian khá nhiều ',
    
  },
  {
    name: 'Nguyễn Gia Khiêm',
    date: '29 Aug 2024',
    rating: 3,
    comment: 'Phần hướng dẫn đường đi còn hơi phức tạp , nhưng không cần chờ đợi lấy đồ ăn như mọi khi',
  
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
