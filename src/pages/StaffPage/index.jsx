import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Toolbar, Typography, Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/system';

const StyledSelect = styled(Box)(({ theme }) => ({
  '& .select-dropdown': {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
    marginTop: '8px',
  },
}));

const initialStaff = [
  { id: 1, name: 'John Doe', position: 'Admin' }, // Example role as Admin
  { id: 2, name: 'Jane Smith', position: 'Staff' },
];

const ManageStaffPage = () => {
  const [staff, setStaff] = useState(initialStaff);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffPosition, setNewStaffPosition] = useState('');
  const [editStaffId, setEditStaffId] = useState(null);
  const [editStaffName, setEditStaffName] = useState('');
  const [editStaffPosition, setEditStaffPosition] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  // Handle role select change
  const handleSelectChange = (event) => {
    setSelectedRole(event.target.value);
  };

  // Open add staff dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Close add staff dialog
  const handleClose = () => {
    setOpen(false);
    setNewStaffName('');
    setNewStaffPosition('');
  };

  // Add new staff
  const handleAddStaff = () => {
    const newStaff = {
      id: staff.length + 1,
      name: newStaffName,
      position: newStaffPosition,
    };
    setStaff([...staff, newStaff]);
    handleClose();
  };

  // Open edit staff dialog
  const handleEditOpen = (staffMember) => {
    setEditStaffId(staffMember.id);
    setEditStaffName(staffMember.name);
    setEditStaffPosition(staffMember.position); // Set current role
    setSelectedRole(staffMember.position); // Set current role
    setEditOpen(true);
  };

  // Close edit staff dialog
  const handleEditClose = () => {
    setEditOpen(false);
  };

  // Update staff information
  const handleUpdateStaff = () => {
    setStaff(staff.map((s) => (s.id === editStaffId ? { ...s, name: editStaffName, position: selectedRole } : s)));
    handleEditClose();
  };

  // Delete staff
  const handleDeleteStaff = (id) => {
    setStaff(staff.filter((s) => s.id !== id));
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Paper elevation={3} sx={{ padding: 3, borderRadius: '15px', backgroundColor: '#f5f5f5' }}>
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            Manage Staff
          </Typography>
          <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleClickOpen}>
            Add Staff
          </Button>
        </Toolbar>

        <TableContainer sx={{ marginTop: 2 }}>
          <Table sx={{ minWidth: 650 }} aria-label="staff table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Position</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {staff.map((staffMember) => (
                <TableRow key={staffMember.id}>
                  <TableCell>{staffMember.name}</TableCell>
                  <TableCell>{staffMember.position}</TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => handleEditOpen(staffMember)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleDeleteStaff(staffMember.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Add Staff Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Account</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Staff Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newStaffName}
            onChange={(e) => setNewStaffName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="position"
            label="Position"
            type="text"
            fullWidth
            variant="outlined"
            value={newStaffPosition}
            onChange={(e) => setNewStaffPosition(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddStaff} color="primary" variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>


    </Box>
  );
};

export default ManageStaffPage;
