// src/components/ManageStaffPage.js
import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Toolbar, Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const initialStaff = [
  { id: 1, name: 'John Doe', position: 'Manager' },
  { id: 2, name: 'Jane Smith', position: 'Sales Associate' },
];

const ManageStaffPage = () => {
  const [staff, setStaff] = useState(initialStaff);
  const [open, setOpen] = useState(false);
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffPosition, setNewStaffPosition] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewStaffName('');
    setNewStaffPosition('');
  };

  const handleAddStaff = () => {
    const newStaff = {
      id: staff.length + 1,
      name: newStaffName,
      position: newStaffPosition,
    };
    setStaff([...staff, newStaff]);
    handleClose();
  };

  const handleDeleteStaff = (id) => {
    setStaff(staff.filter((s) => s.id !== id));
  };

  return (
    <Paper sx={{ padding: 2 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Manage Staff
        </Typography>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleClickOpen}>
          Add Staff
        </Button>
      </Toolbar>

      <TableContainer>
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
                  <IconButton
                    color="secondary"
                    onClick={() => handleDeleteStaff(staffMember.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Staff</DialogTitle>
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
    </Paper>
  );
};

export default ManageStaffPage;
