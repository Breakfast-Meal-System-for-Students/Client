import React, { useState, useEffect } from "react";

const Account = () => {
  // User data state
  const [storeData, setStoreData] = useState({
    shopName: "",
    address: "",
    phoneNumber: "",
    email: "",
    username: "",
    password: "",
    package: "Free",
  });

  // Edit mode state
  const [isEditing, setIsEditing] = useState(false);

  // Simulate fetching user data from an API
  useEffect(() => {
    const fetchStoreData = async () => {
      // Simulate fetched data
      const fetchedData = {
        shopName: "My Shop",
        address: "123 Main Street",
        phoneNumber: "1234567890", // Ensure it's a valid number format
        email: "shop@example.com",
        username: "shopuser",
        password: "password123",
        package: "Free",
      };
      setStoreData(fetchedData);
    };

    fetchStoreData();
  }, []);

  // Handle user input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStoreData({
      ...storeData,
      [name]: value,
    });
  };

  // Handle phone number input to prevent non-numeric characters
  const handlePhoneNumberChange = (e) => {
    const { value } = e.target;
    // Remove non-numeric characters
    const sanitizedValue = value.replace(/\D/g, "");
    setStoreData({
      ...storeData,
      phoneNumber: sanitizedValue,
    });
  };

  // Handle saving changes
  const handleSave = () => {
    setIsEditing(false);
    // Call API to update store data (if needed)
    console.log("Updated store data:", storeData);
  };

  // Handle reset form
  const handleReset = () => {
    setStoreData({
      shopName: "",
      address: "",
      phoneNumber: "",
      email: "",
      username: "",
      password: "",
      package: "Free",
    });
  };

  return (
    <div className="account-container">
      <h1>Manage Account</h1>

      {!isEditing ? (
        <div className="view-mode">
          <div className="info-section">
            <p>
              <strong>Shop Name:</strong> {storeData.shopName}
            </p>
            <p>
              <strong>Address:</strong> {storeData.address}
            </p>
            <p>
              <strong>Phone Number:</strong> {storeData.phoneNumber}
            </p>
            <p>
              <strong>Email:</strong> {storeData.email}
            </p>
            <p>
              <strong>Username:</strong> {storeData.username}
            </p>
            <p>
              <strong>Password:</strong> ********
            </p>
            <p>
              <strong>Package:</strong> {storeData.package}
            </p>
          </div>
          <button className="edit-btn" onClick={() => setIsEditing(true)}>
            <span className="edit-icon">✎</span> Edit
          </button>
        </div>
      ) : (
        <div className="edit-mode">
          <label>
            Shop Name:
            <input
              type="text"
              name="shopName"
              value={storeData.shopName}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              name="address"
              value={storeData.address}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Phone Number:
            <input
              type="tel"
              name="phoneNumber"
              value={storeData.phoneNumber}
              pattern="[0-9]{10}" // Enforces 10-digit number input
              title="Phone number should be 10 digits"
              maxLength="10" // Limits input to 10 characters
              onChange={handlePhoneNumberChange} // Changed handler
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={storeData.email}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={storeData.username}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={storeData.password}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Package:
            <select
              name="package"
              value={storeData.package}
              onChange={handleInputChange}
            >
              <option value="Free">Free</option>
              <option value="VIP">VIP</option>
            </select>
          </label>
          {/* Google Maps Embed */}
          <div className="map-container">
            <h4>Store Location on Map:</h4>
            <iframe
              title="Google Maps"
              width="100%"
              height="300"
              src="https://maps.google.com/maps?q=ho%20chi%20minh&t=&z=13&ie=UTF8&iwloc=&output=embed"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
          {/* Privacy policy and captcha */}
          <label>
            <input type="checkbox" name="policy" required /> I agree to the
            privacy policy
          </label>
          <div className="captcha">
            <p>Captcha goes here</p>
          </div>
          <div className="button-group">
            <button className="save-btn" onClick={handleSave}>
              Save
            </button>
            <button className="cancel-btn" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
            <button className="reset-btn" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
      )}

      <style>{`
        .account-container {
          width: 80%;
          margin: 0 auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          
        }

        h1 {
          text-align: center;
          color: #333;
        }

        .view-mode,
        .edit-mode {
          display: flex;
          flex-direction: column;
          gap: 15px;
          
        }

        .info-section p {
          margin: 5px 0;
          font-size: 16px;
          
        }

        .info-section strong {
          display: inline-block;
          width: 150px;
          
        }

        label {
          display: flex;
          flex-direction: column;
          margin-bottom: 15px;
          
        }

        input[type="text"],
        input[type="email"],
        input[type="password"],
        input[type="tel"],
        select {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
          margin-top: 5px;
          
        }

        .map-container,
        .captcha {
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          background-color: #f9f9f9;
        }

        .button-group {
          display: flex;
          gap: 10px;
        }

        .button-group button {
          flex: 1;
          padding: 10px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          color: #fff;
        }

        .save-btn {
          background-color: #4CAF50; /* Xanh lá cây */
        }

        .save-btn:hover {
          background-color: #45a049; /* Xanh lá cây đậm */
        }

        .cancel-btn {
          background-color: #f44336; /* Đỏ */
        }

        .cancel-btn:hover {
          background-color: #d32f2f; /* Đỏ đậm */
        }

        .reset-btn {
          background-color: #2196F3; /* Xanh dương */
        }

        .reset-btn:hover {
          background-color: #1976D2; /* Xanh dương đậm */
        }

        .edit-btn {
          background-color: #007bff
        .edit-btn {
          background-color: #007bff; /* Xanh dương */
          color: #fff;
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          font-weight: bold;
          transition: background-color 0.3s ease, transform 0.2s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .edit-btn:hover {
          background-color: #00cc69
          transform: scale(1.05);
        }

        .edit-btn:active {
          background-color: #00cc69
        }

        .edit-icon {
          font-size: 18px;
          display: inline-block;
          vertical-align: middle;
        }

        .edit-mode input,
        .edit-mode select {
          background-color: #00cc69
          border: 1px solid #ccc;
        }

        .edit-mode input:focus,
        .edit-mode select:focus {
          border-color: #007bff;
          outline: none;
        }
      `}</style>
    </div>
  );
};

export default Account;
