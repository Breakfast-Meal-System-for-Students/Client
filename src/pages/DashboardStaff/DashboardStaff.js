import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, CircularProgress, Paper } from "@mui/material";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import "chart.js/auto";

const StatsCard = ({ title, value, gradient }) => (
  <Paper
    sx={{
      padding: 3,
      borderRadius: 4,
      boxShadow: 3,
      background: gradient,
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: 140,
      transition: "transform 0.2s",
      "&:hover": {
        transform: "scale(1.05)",
      },
    }}
  >
    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
      {title}
    </Typography>
    <Typography variant="h3" fontWeight="bold">
      {value}
    </Typography>
  </Paper>
);

const DashboardStaff = () => {
  const [newUsersData, setNewUsersData] = useState(Array(12).fill(0)); // Initialize with zeroes
  const [totalSales, setTotalSales] = useState(0); // State for Total Sales
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");
        const year = 2024;

        // Fetch monthly new users data for each month in parallel
        const monthlyRequests = Array.from({ length: 12 }, (_, i) => {
          return axios.get(
            `https://bms-fs-api.azurewebsites.net/api/User/CountNewUser?day=1&month=${
              i + 1
            }&year=${year}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        });

        const monthlyResponses = await Promise.all(monthlyRequests);
        const monthlyData = monthlyResponses.map((response, index) => {
          if (response.data.isSuccess) {
            return response.data.data; // Count of new users for each month
          } else {
            console.warn(`Failed to fetch data for month ${index + 1}`);
            return 0;
          }
        });
        setNewUsersData(monthlyData);

        // Fetch total sales data
        const totalSalesResponse = await axios.get(
          "https://bms-fs-api.azurewebsites.net/api/User/GetTotalUser",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (totalSalesResponse.data.isSuccess) {
          setTotalSales(totalSalesResponse.data.data); // Set total sales value
        } else {
          throw new Error("Failed to fetch total sales");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  const barChartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "New Users",
        data: newUsersData,
        backgroundColor: "#3f51b5",
        borderColor: "#3f51b5",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: "#555" },
        grid: { color: "#e0e0e0" },
      },
      x: {
        ticks: { color: "#555" },
        grid: { color: "#e0e0e0" },
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
        User Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Total Sales"
            value={`${totalSales.toLocaleString()}`} // Format the sales value
            gradient="linear-gradient(135deg, #2196F3 0%, #21CBF3 100%)"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Total Impressions"
            value="47,403"
            gradient="linear-gradient(135deg, #3f51b5 0%, #5c6bc0 100%)"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="New Users"
            value={newUsersData.reduce((acc, val) => acc + val, 0)}
            gradient="linear-gradient(135deg, #66BB6A 0%, #43A047 100%)"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Total Orders"
            value="55,093"
            gradient="linear-gradient(135deg, #FF7043 0%, #FF5722 100%)"
          />
        </Grid>

        <Grid item xs={12}>
          <Box
            sx={{
              padding: 3,
              borderRadius: 4,
              boxShadow: 3,
              backgroundColor: "#fff",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Monthly New Users for 2024
            </Typography>
            <Box sx={{ height: 400 }}>
              <Bar data={barChartData} options={chartOptions} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardStaff;
