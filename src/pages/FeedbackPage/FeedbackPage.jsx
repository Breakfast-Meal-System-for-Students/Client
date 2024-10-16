import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FeedbackPageUI from './FeedBackPageUI';

const FeedbackPage = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('All');
  const [averageRating, setAverageRating] = useState(0);

  // Function to calculate average rating
  const calculateAverageRating = (data) => {
    if (!data.length) return 0;
    const totalRating = data.reduce((sum, feedback) => sum + feedback.rate, 0);
    return (totalRating / data.length).toFixed(1);
  };

  // Function to fetch feedback based on the selected filter
  const fetchFeedback = async (filter) => {
    setLoading(true);
    try {
      let url = 'https://bms-fs-api.azurewebsites.net/api/Feedback?search=q&isDesc=true&pageIndex=1&pageSize=10'; // Adjusted URL

      // Adjust the query params based on the selected filter
      if (filter === '5') {
        url += '&minRate=5&maxRate=5'; // Only 5-star feedback
      } else if (filter === '4') {
        url += '&minRate=4&maxRate=5'; // 4-star feedback
      } else if (filter === '3') {
        url += '&minRate=3&maxRate=4'; // 3-star feedback
      } else if (filter === '2') {
        url += '&minRate=2&maxRate=3'; // 2-star feedback (between 2 and 3)
      } else if (filter === '1') {
        url += '&minRate=1&maxRate=2'; // 1-star feedback (between 1 and 2)
      }

      const response = await axios.get(url);
      const feedback = response.data.data.data || [];
      setFeedbackData(feedback);
      setAverageRating(calculateAverageRating(feedback));
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  // Fetch feedback data when the component mounts or the filter changes
  useEffect(() => {
    fetchFeedback(filter);
  }, [filter]);

  // Handle filter change
  const handleFilterChange = (filterType) => {
    setFilter(filterType);
  };

  return (
    <FeedbackPageUI 
      feedbackData={feedbackData}
      loading={loading}
      error={error}
      filter={filter}
      handleFilterChange={handleFilterChange}
      averageRating={averageRating}
    />
  );
};

export default FeedbackPage;
