import React, { useEffect, useState } from 'react';
import StaffPage from './StaffPage.styles'; // Import the styled component

const ManageStaffPage = () => {
  const [staff, setStaff] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [newStaff, setNewStaff] = useState({ email: '', firstName: '', lastName: '', phone: '', avatar: '', position: '' });
  const [editStaffId, setEditStaffId] = useState(null);
  const [editStaff, setEditStaff] = useState({ email: '', firstName: '', lastName: '', phone: '', avatar: '', position: '' });
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [totalCount, setTotalCount] = useState(0);
  const token = localStorage.getItem('token');

  // Fetch staff data from API
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await fetch(`https://bms-fs-api.azurewebsites.net/api/Staff/GetListStaff?search=${searchTerm}&isDesc=true&pageIndex=${pageIndex}&pageSize=${pageSize}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.isSuccess && Array.isArray(data.data.data)) {
          setStaff(data.data.data);
          setTotalCount(data.data.total);
        } else {
          console.error("Invalid data format:", data);
        }
      } catch (error) {
        console.error("Failed to fetch staff data:", error);
      }
    };

    fetchStaff();
  }, [token, pageIndex, pageSize, searchTerm]);

  // Open add staff dialog
  const handleClickOpen = () => setOpen(true);

  // Close add staff dialog
  const handleClose = () => {
    setOpen(false);
    setNewStaff({ email: '', firstName: '', lastName: '', phone: '', avatar: '', position: '' });
  };

  // Add new staff
  const handleAddStaff = () => {
    const staffToAdd = { ...newStaff, id: staff.length + 1 };
    setStaff([...staff, staffToAdd]);
    handleClose();
  };

  // Open edit staff dialog
  const handleEditOpen = (staffMember) => {
    setEditStaffId(staffMember.id);
    setEditStaff({ ...staffMember });
    setEditOpen(true);
  };

  // Close edit staff dialog
  const handleEditClose = () => setEditOpen(false);

  // Update staff information
  const handleUpdateStaff = () => {
    setStaff(staff.map((s) => (s.id === editStaffId ? { ...s, ...editStaff } : s)));
    handleEditClose();
  };

  // Delete staff
  const handleDeleteStaff = (id) => {
    setStaff(staff.filter((s) => s.id !== id));
  };

  // Handle page change
  const handlePageChange = (event, value) => setPageIndex(value);

  return (
    <StaffPage
      staff={staff}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      open={open}
      handleClickOpen={handleClickOpen}
      handleClose={handleClose}
      handleAddStaff={handleAddStaff}
      editOpen={editOpen}
      handleEditOpen={handleEditOpen}
      handleEditClose={handleEditClose}
      handleUpdateStaff={handleUpdateStaff}
      handleDeleteStaff={handleDeleteStaff}
      pageIndex={pageIndex}
      pageSize={pageSize}
      totalCount={totalCount}
      handlePageChange={handlePageChange}
      newStaff={newStaff}
      setNewStaff={setNewStaff}
      editStaff={editStaff}
      setEditStaff={setEditStaff}
    />
  );
};

export default ManageStaffPage;
