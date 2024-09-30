import React, { useState } from "react";
import { TableContainer, CustomTable, CustomTableRow, ActionButton, StyledBox } from "./CustomerDetails.style";
import { TableHead, TableBody, TableCell, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const customersData = [
  { id: 1, name: "Thomas Hardy", address: "89 Chiaroscuro Rd.", city: "Portland", pinCode: "97219", country: "USA" },
  { id: 2, name: "Maria Anders", address: "Obere Str. 57", city: "Berlin", pinCode: "12209", country: "Germany" },
  { id: 3, name: "Fran Wilson", address: "C/ Araquil, 67", city: "Madrid", pinCode: "28023", country: "Spain" },
  { id: 4, name: "Dominique Perrier", address: "25, rue Lauriston", city: "Paris", pinCode: "75016", country: "France" },
  { id: 5, name: "Martin Blank", address: "Via Monte Bianco 34", city: "Turin", pinCode: "10100", country: "Italy" },
];

function CustomerDetails() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState('asc');

  // Filter customers based on search term
  const filteredCustomers = customersData.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort customers by name
  const sortedCustomers = filteredCustomers.sort((a, b) => {
    const comparison = a.name.localeCompare(b.name);
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const toggleSortOrder = () => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <TableContainer>
      <h2 style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        Customer Details
        <TextField
          placeholder="Search Customers..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          style={{ width: "250px" }}
        />
      </h2>
      <StyledBox>
        <CustomTable>
          <TableHead>
            <CustomTableRow>
              <TableCell>#</TableCell>
              <TableCell onClick={toggleSortOrder} style={{ cursor: 'pointer' }}>
                Name {sortOrder === 'asc' ? '↑' : '↓'}
              </TableCell>
              <TableCell>Address</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Pin Code</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Actions</TableCell>
            </CustomTableRow>
          </TableHead>
          <TableBody>
            {sortedCustomers.map((customer, index) => (
              <CustomTableRow key={customer.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.address}</TableCell>
                <TableCell>{customer.city}</TableCell>
                <TableCell>{customer.pinCode}</TableCell>
                <TableCell>{customer.country}</TableCell>
                <TableCell>
                  <ActionButton>
                    <VisibilityIcon color="primary" />
                  </ActionButton>
                  <ActionButton>
                    <EditIcon color="secondary" />
                  </ActionButton>
                  <ActionButton>
                    <DeleteIcon color="error" />
                  </ActionButton>
                </TableCell>
              </CustomTableRow>
            ))}
          </TableBody>
        </CustomTable>
        <p>Showing {sortedCustomers.length} out of {customersData.length} entries</p>
      </StyledBox>
    </TableContainer>
  );
}

export default CustomerDetails;
