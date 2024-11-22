import React, { useState, useEffect } from "react";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";

const ShopApplication = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [shopsPerPage] = useState(5);
  const [totalShops, setTotalShops] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShops = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://bms-fs-api.azurewebsites.net/api/ShopApplication?pageIndex=${currentPage}&pageSize=${shopsPerPage}&search=${encodeURIComponent(
            searchTerm
          )}`
        );

        if (response.data.isSuccess) {
          setShops(response.data.data.data);
          setTotalShops(response.data.data.total);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, [searchTerm, currentPage]);

  const viewShopDetails = (id) => {
    navigate(`/detail-application/${id}`);
  };

  const updateShopStatus = async (id, status) => {
    try {
      const data = {
        status: status,
      };

      const response = await axios.put(
        `https://bms-fs-api.azurewebsites.net/api/ShopApplication/${id}`,
        data
      );

      setShops((prevShops) =>
        prevShops.map((shop) =>
          shop.id === id ? { ...shop, status: status } : shop
        )
      );
    } catch (error) {
      console.error("Error updating shop status:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="shop-list-container">
      <h1 className="heading">Shop Application Management</h1>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search shops..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button className="search-button">
          <i className="fas fa-search"></i>
        </button>
      </div>

      <table className="shop-table">
        <thead>
          <tr>
            <th>Shop Name</th>
            <th>Description</th>
            <th>Rate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {shops.map((shop) => (
            <tr key={shop.id}>
              <td>
                <div className="shop-info">
                  <img
                    src={shop.image || "https://via.placeholder.com/50"}
                    alt={shop.name}
                    className="shop-pic"
                  />
                  <span>{shop.name}</span>
                </div>
              </td>
              <td>{shop.description}</td>
              <td>{shop.rate} / 5</td>
              <td>
                <button
                  className="details-btn"
                  onClick={() => viewShopDetails(shop.id)}
                >
                  View Details
                </button>
                {shop.status !== "Accepted" && (
                  <button
                    className="accept-btn"
                    onClick={() => {
                      updateShopStatus(shop.id, "Accepted");
                    }}
                  >
                    Accept
                  </button>
                )}
                {shop.status === "Accepted" ? (
                  <button className="deny-btn disabled" disabled>
                    Deny
                  </button>
                ) : (
                  <button
                    className="deny-btn"
                    onClick={() => {
                      updateShopStatus(shop.id, "Denied");
                    }}
                  >
                    Deny
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from(
          { length: Math.ceil(totalShops / shopsPerPage) },
          (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`pagination-button ${
                currentPage === i + 1 ? "active" : ""
              }`}
            >
              {i + 1}
            </button>
          )
        )}
      </div>

      <style>{`
        .shop-list-container {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .heading {
          text-align: center;
          margin-bottom: 20px;
        }

        .search-container {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }

        .search-input {
          padding: 10px;
          font-size: 16px;
          width: 300px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .search-button {
          padding: 10px;
          background-color: #00cc69;
          border: none;
          color: white;
          cursor: pointer;
          margin-left: 10px;
          border-radius: 4px;
        }

        .shop-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }

        .shop-table th, .shop-table td {
          border: 1px solid #ddd;
          padding: 10px;
          text-align: left;
        }

        .shop-info {
          display: flex;
          align-items: center;
        }

        .shop-pic {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin-right: 10px;
          object-fit: cover;
        }

        .details-btn, .accept-btn, .deny-btn {
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          margin-right: 5px;
        }

        .details-btn {
          background-color: #007bff;
          color: white;
          border: none;
        }

        .accept-btn {
          background-color: #00cc69;
          color: white;
          border: none;
        }

        .deny-btn {
          background-color: red;
          color: white;
          border: none;
        }

        .deny-btn.disabled {
          background-color: gray;
          cursor: not-allowed;
        }

        .pagination {
          display: flex;
          justify-content: center;
          margin: 20px 0;
        }

        .pagination-button {
          padding: 10px 15px;
          margin: 0 5px;
          border: 1px solid #ddd;
          background-color: #fff;
          cursor: pointer;
          font-size: 14px;
          border-radius: 5px;
        }

        .pagination-button.active {
          background-color: #00cc69;
          color: white;
          border-color: #00cc69;
        }

        .pagination-button:hover {
          background-color: #f1f1f1;
        }
      `}</style>
    </div>
  );
};

export default ShopApplication;
