import { Box } from "@mui/material";
import styled from "styled-components";

export const StyledSideBar = styled.div`
  height: 100vh;
  width: 250px;
  position: fixed;
  top: 0;
  left: 0;
  background: linear-gradient(180deg, #3d996c, #00cc69);
  padding-top: 20px;
  h2 {
    color: white;
    text-align: center;
    margin-bottom: 30px;
  }
  ul {
    list-style-type: none;
    padding: 0;
    li {
      padding: 15px;
      text-align: center;
      a {
        color: white;
        text-decoration: none;
        display: block;
      }
      a:hover {
        background-color: #575757;
        color: white;
      }
    }
  }
`;