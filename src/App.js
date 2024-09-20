import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeStaff from "./components/HomeStaff";
import Setting from "./components/Setting";
import Account from "./components/Account";
import CRUDCategory from "./components/CRUDCategory";
import Feedback from "./components/Feedback";
import Sidebar from "./components/Sidebar";
import SendFeedbackPage from "./components/SendFeedbackPage";
import ShopDetails from "./components/ShopDetails";
import EditCategory from "./components/EditCategory";
import AddCategory from "./components/AddCategory";
import ShopApplication from "./components/ShopApplication";
import DetailApplication from "./components/DetailApplication";

function App() {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ marginLeft: "250px", padding: "20px", width: "100%" }}>
          <Routes>
            <Route path="/" element={<HomeStaff />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/account" element={<Account />} />
            <Route path="/crud-category" element={<CRUDCategory />} />
            <Route path="/edit-category/:id" element={<EditCategory />} />
            <Route path="/add-category" element={<AddCategory />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/send-feedback" element={<SendFeedbackPage />} />
            <Route path="/shop-application" element={<ShopApplication />} />
            <Route
              path="/detail-application/:id"
              element={<DetailApplication />}
            />
            <Route path="/shop/:id" element={<ShopDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
