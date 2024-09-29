import React from 'react';
import {
  Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,IconButton, 
  Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField,Toolbar, Typography, InputAdornment, Pagination
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';

const StaffPage = ({
  staff,searchTerm,setSearchTerm,open,handleClickOpen,handleClose,handleAddStaff,
  editOpen,handleEditOpen,handleEditClose,handleUpdateStaff,handleDeleteStaff,
  pageIndex,pageSize,totalCount,handlePageChange,newStaff,setNewStaff,editStaff,setEditStaff,
}) => {
  return (
    <Box sx={{ padding: 3 }}>
      <Paper elevation={3} sx={{ padding: 3, borderRadius: '15px', backgroundColor: '#f5f5f5' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            Manage Staff
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              variant="outlined"
              placeholder="Search Staff"
              sx={{ width: '250px', marginRight: 2 }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleClickOpen}>
              Add Staff
            </Button>
          </Box>
        </Toolbar>

        <TableContainer sx={{ marginTop: 2 }}>
          <Table sx={{ minWidth: 650 }} aria-label="staff table">
            <TableHead>
              <TableRow>
                <TableCell>Avatar</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Position</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {staff.map((staffMember) => (
                <TableRow key={staffMember.id}>
                  <TableCell>
                    {staffMember.avatar ? (
                      <img src={staffMember.avatar} alt="Avatar" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                    ) : (
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#ccc' }} />
                    )}
                  </TableCell>
                  <TableCell>{`${staffMember.firstName} ${staffMember.lastName}`}</TableCell>
                  <TableCell>{staffMember.email}</TableCell>
                  <TableCell>{staffMember.phone}</TableCell>
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

        {/* Pagination Control */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 2 }}>
          <Pagination
            count={Math.ceil(totalCount / pageSize)}
            page={pageIndex}
            onChange={handlePageChange}
            variant="outlined"
            color="primary"
          />
          <Typography sx={{ margin: '0 10px' }}>
            Page {pageIndex} of {Math.ceil(totalCount / pageSize)}
          </Typography>
        </Box>
      </Paper>

      {/* Add Staff Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Staff</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="First Name"
            fullWidth
            value={newStaff.firstName}
            onChange={(e) => setNewStaff({ ...newStaff, firstName: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Last Name"
            fullWidth
            value={newStaff.lastName}
            onChange={(e) => setNewStaff({ ...newStaff, lastName: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={newStaff.email}
            onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Phone"
            fullWidth
            value={newStaff.phone}
            onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Avatar URL"
            fullWidth
            value={newStaff.avatar}
            onChange={(e) => setNewStaff({ ...newStaff, avatar: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Position"
            fullWidth
            value={newStaff.position}
            onChange={(e) => setNewStaff({ ...newStaff, position: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddStaff}>Add</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Staff Dialog */}
      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Staff</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="First Name"
            fullWidth
            value={editStaff.firstName}
            onChange={(e) => setEditStaff({ ...editStaff, firstName: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Last Name"
            fullWidth
            value={editStaff.lastName}
            onChange={(e) => setEditStaff({ ...editStaff, lastName: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={editStaff.email}
            onChange={(e) => setEditStaff({ ...editStaff, email: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Phone"
            fullWidth
            value={editStaff.phone}
            onChange={(e) => setEditStaff({ ...editStaff, phone: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Avatar URL"
            fullWidth
            value={editStaff.avatar}
            onChange={(e) => setEditStaff({ ...editStaff, avatar: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Position"
            fullWidth
            value={editStaff.position}
            onChange={(e) => setEditStaff({ ...editStaff, position: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleUpdateStaff}>Update</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StaffPage;
