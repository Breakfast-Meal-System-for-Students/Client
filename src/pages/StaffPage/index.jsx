import React, { useState, useEffect } from 'react';
import StaffPageContainer from './StaffPageContainer.styles.jsx'; // Importing the styled component
import axios from 'axios';

const StaffPageContainer = () => {
  const [staff, setStaff] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [newStaff, setNewStaff] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [confirmOpen, setConfirmOpen] = useState(false); // State for confirmation dialog
  const [staffToDelete, setStaffToDelete] = useState(null); // State to hold the staff ID to delete

  // Fetch staff data from API
  const fetchStaff = async () => {
    try {
      const response = await axios.get(`/api/staff?searchTerm=${searchTerm}&page=${pageIndex}&pageSize=${pageSize}`);
      setStaff(response.data.data); // Assuming response has staff list in 'data'
      setTotalCount(response.data.totalCount);
    } catch (error) {
      console.error('Error fetching staff:', error);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, [searchTerm, pageIndex]);

  // Add new staff member
  const handleAddStaff = async () => {
    try {
      const formData = new FormData();
      formData.append('firstName', newStaff.firstName);
      formData.append('lastName', newStaff.lastName);
      formData.append('email', newStaff.email);

      await axios.post('https://bms-fs-api.azurewebsites.net/api/Staff', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer <your_token_here>`, // Replace with your actual token
        },
      });

      setOpen(false);
      setNewStaff({ firstName: '', lastName: '', email: '' });
      fetchStaff(); // Refetch updated staff list
    } catch (error) {
      console.error("Error adding staff:", error);
    }
  };

  // Delete a staff member
  const handleDeleteStaff = async (id) => {
    try {
      await axios.delete(`https://bms-fs-api.azurewebsites.net/api/Staff?id=${id}`, {
        headers: {
          Authorization: `Bearer <your_token_here>`, // Replace with your actual token
        },
      });

      fetchStaff(); // Refetch the updated staff list after deletion
      setStaffToDelete(null); // Resetting staffToDelete after deletion
    } catch (error) {
      console.error("Error deleting staff:", error);
    }
  };

  // Open confirmation dialog
  const handleConfirmDelete = (id) => {
    setStaffToDelete(id); // Set the staff ID to delete
    setConfirmOpen(true); // Open confirmation dialog
  };

  // Confirm deletion
  const confirmDelete = () => {
    if (staffToDelete) {
      handleDeleteStaff(staffToDelete); // Delete the staff member
      setConfirmOpen(false); // Close confirmation dialog
    }
  };

  return (
    <StaffPageContainer
      staff={staff}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      open={open}
      handleClickOpen={() => setOpen(true)}
      handleClose={() => setOpen(false)}
      handleAddStaff={handleAddStaff}
      handleConfirmDelete={handleConfirmDelete} // Pass the confirm function
      confirmOpen={confirmOpen} // Pass confirmation dialog state
      confirmDelete={confirmDelete} // Pass confirm deletion function
      setConfirmOpen={setConfirmOpen} // Pass function to set confirm dialog state
      pageIndex={pageIndex}
      pageSize={pageSize}
      totalCount={totalCount}
      newStaff={newStaff}
      setNewStaff={setNewStaff}
    />
  );
};

export default StaffPageContainer;
