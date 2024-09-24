import React, { useState, useEffect } from "react";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";

const CRUDCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Mặc định pageIndex = 1
  const [categoriesPerPage, setCategoriesPerPage] = useState(1); // Mặc định pageSize = 1
  const navigate = useNavigate();

  // Fetch categories từ API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `https://bms-fs-api.azurewebsites.net/api/Category?pageSize=${categoriesPerPage}&pageIndex=${currentPage}`
        );

        if (response.data.isSuccess) {
          setCategories(response.data.data.data);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchCategories();
  }, [categoriesPerPage, currentPage]); // Cập nhật khi categoriesPerPage hoặc currentPage thay đổi

  // Hàm xử lý edit category
  const handleEdit = (id) => {
    navigate(`/edit-category/${id}`);
  };

  // Hàm xử lý delete category
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://bms-fs-api.azurewebsites.net/api/Category/${id}`,
        {
          headers: {
            Accept: "*/*",
          },
        }
      );
      if (response.status === 200) {
        setCategories((prevCategories) =>
          prevCategories.filter((category) => category.id !== id)
        );
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  // Điều hướng tới trang thêm category
  const handleAddCategory = () => {
    navigate("/add-category");
  };

  // Lọc category theo từ khóa tìm kiếm
  const filteredCategories = Array.isArray(categories)
    ? categories.filter(
        (category) =>
          category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          category.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // Phân trang category
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = filteredCategories.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );

  // Hàm phân trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="category-list-container">
      <div className="header-container">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button">
            <i className="fas fa-search"></i>
          </button>
        </div>
        <button className="add-category-btn" onClick={handleAddCategory}>
          Add Category
        </button>
      </div>

      <table className="category-table">
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentCategories.map((category) => (
            <tr key={category.id}>
              <td>
                <div className="category-name">
                  <img
                    src={category.image || "https://via.placeholder.com/50"}
                    alt={category.name}
                    className="category-img"
                  />
                  <span>{category.name}</span>
                </div>
              </td>
              <td>{category.description}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(category.id)}
                >
                  <i className="fas fa-edit" title="Edit"></i>
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(category.id)}
                >
                  <i className="fas fa-trash" title="Delete"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        {Array.from(
          { length: Math.ceil(filteredCategories.length / categoriesPerPage) },
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
        .header-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .search-container {
          display: flex;
          align-items: center;
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

        .add-category-btn {
          display: block;
          width: 200px;
          padding: 10px;
          background-color: #00cc69;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .add-category-btn:hover {
          background-color: #009e50;
        }

        .category-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }

        .category-table th, .category-table td {
          border: 1px solid #ddd;
          padding: 10px;
          text-align: left;
        }

        .category-name {
          display: flex;
          align-items: center;
        }

        .category-img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          object-fit: cover;
          margin-right: 10px;
        }

        .edit-btn, .delete-btn {
          background-color: transparent;
          border: none;
          cursor: pointer;
          margin-right: 10px;
        }

        .edit-btn i {
          color: #00cc69;
        }

        .delete-btn i {
          color: #f44336;
        }

        .edit-btn:hover i {
          color: #009e50;
        }

        .delete-btn:hover i {
          color: #d32f2f;
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

export default CRUDCategory;
