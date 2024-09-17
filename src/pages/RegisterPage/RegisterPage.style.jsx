import { Grid } from "@mui/material";
import styled from "styled-components";

export const StyledSelect = styled(Grid)`
  display: flex;
  flex-direction: column;
  margin: 20px auto;
  width: 100%;
  .select-dropdown {
    padding: 8px;
    font-size: 14px;
    border-radius: 4px;
    border: 1px solid #ccc;
    background-color: #f9f9f9;
    outline: none;
    width: 100%;
    height: 55px;
    transition: border-color 0.3s;
  }

  .select-dropdown:focus {
    border-color: #007BFF;
  }
`;