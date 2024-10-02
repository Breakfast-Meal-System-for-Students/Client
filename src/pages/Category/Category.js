import React, { useState, useEffect } from "react";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";

const CRUDCategory = () => {
  const [categories, setCategories] = useState([]); // Danh sách categories
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [searchTerm, setSearchTerm] = useState(""); // Từ khóa tìm kiếm
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [categoriesPerPage] = useState(5); // Số lượng categories trên mỗi trang
  const [totalCategories, setTotalCategories] = useState(0); // Tổng số lượng categories để phân trang
  const navigate = useNavigate(); // Điều hướng sử dụng useNavigate

  // Lấy dữ liệu từ API với phân trang và tìm kiếm
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true); // Bật trạng thái loading
      try {
        const response = await axios.get(
          `https://bms-fs-api.azurewebsites.net/api/Category?pageIndex=${currentPage}&pageSize=${categoriesPerPage}&search=${encodeURIComponent(
            searchTerm
          )}`
        );

        if (response.data.isSuccess) {
          setCategories(response.data.data.data); // Lưu danh sách categories
          setTotalCategories(response.data.data.total); // Lưu tổng số lượng categories
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Tắt trạng thái loading
      }
    };

    fetchCategories(); // Gọi hàm fetchCategories
  }, [searchTerm, currentPage]); // Cập nhật khi từ khóa tìm kiếm hoặc trang thay đổi

  // Hàm xử lý chỉnh sửa category
  const handleEdit = (id) => {
    navigate(`/edit-category/${id}`);
  };

  // Hàm xử lý xóa category
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://bms-fs-api.azurewebsites.net/api/Category/${id}`,
        {
          headers: {
            Accept: "*/*",
          },
        }
      );
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== id)
      ); // Loại bỏ category đã xóa khỏi danh sách
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  // Hàm điều hướng tới trang thêm category
  const handleAddCategory = () => {
    navigate("/add-category");
  };

  // Hàm xử lý phân trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Hiển thị trạng thái loading khi đang tải dữ liệu
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="category-list-container">
      <div className="header-container">
        {/* Tìm kiếm */}
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value); // Cập nhật từ khóa tìm kiếm
              setCurrentPage(1); // Reset về trang đầu tiên khi thay đổi tìm kiếm
            }}
          />
          <button className="search-button">
            <i className="fas fa-search"></i>
          </button>
        </div>
        <button className="add-category-btn" onClick={handleAddCategory}>
          Add Category
        </button>
      </div>

      {/* Bảng danh sách categories */}
      <table className="category-table">
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
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
          { length: Math.ceil(totalCategories / categoriesPerPage) },
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
