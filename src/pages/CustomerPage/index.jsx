import React from "react";

function CustomerProfilePage() {
  const customer = {
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "123-456-7890",
  };

  return (
    <div>
      <h1>Customer Profile</h1>
      <p>Name: {customer.name}</p>
      <p>Email: {customer.email}</p>
      <p>Phone: {customer.phone}</p>
    </div>
  );
}

export default CustomerProfilePage;
