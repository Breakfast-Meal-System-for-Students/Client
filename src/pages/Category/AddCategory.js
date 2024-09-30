import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const [name, setName] = useState(""); // Tên của danh mục
  const [description, setDescription] = useState(""); // Mô tả của danh mục
  const [image, setImage] = useState(null); // Ảnh của danh mục
  const [error, setError] = useState(""); // Thông báo lỗi
  const navigate = useNavigate(); // Hook để chuyển hướng

  // Hàm xử lý việc chọn hình ảnh
  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Cập nhật hình ảnh khi người dùng chọn
  };

  // Hàm xử lý việc gửi dữ liệu
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra nếu các trường bị trống
    if (!name || !description || !image) {
      setError("Vui lòng điền đầy đủ thông tin và chọn hình ảnh");
      return;
    }

    // Tạo đối tượng FormData để gửi dữ liệu
    const formData = new FormData();
    formData.append("image", image);

    try {
      // Gửi yêu cầu POST tới API với query parameters
      const response = await axios.post(
        `https://bms-fs-api.azurewebsites.net/api/Category?name=${encodeURIComponent(
          name
        )}&description=${encodeURIComponent(description)}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Đặt header cho multipart form-data
          },
        }
      );

      if (response.data.isSuccess) {
        // Show success message
        alert("Thêm danh mục thành công!"); // Alert message in Vietnamese
        navigate("/category"); // Redirect to crud-category page after successful addition
      } else {
        setError("Có lỗi xảy ra khi thêm danh mục");
      }
    } catch (error) {
      console.error("Error adding category:", error);
      setError("Có lỗi xảy ra khi thêm danh mục");
    }
  };

  return (
    <div className="add-category-container">
      <h1>Thêm Danh Mục Mới</h1>
      {error && <p className="error-message">{error}</p>}{" "}
      {/* Hiển thị thông báo lỗi nếu có */}
      <form onSubmit={handleSubmit} className="add-category-form">
        <div className="form-group">
          <label>Tên Danh Mục:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)} // Cập nhật tên danh mục
            placeholder="Nhập tên danh mục"
          />
        </div>

        <div className="form-group">
          <label>Mô Tả:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)} // Cập nhật mô tả danh mục
            placeholder="Nhập mô tả danh mục"
          />
        </div>

        <div className="form-group">
          <label>Hình Ảnh:</label>
          <input
            type="file"
            onChange={handleImageChange} // Cập nhật hình ảnh khi người dùng chọn
            accept="image/*" // Chỉ chấp nhận các tệp hình ảnh
          />
        </div>

        <button type="submit" className="submit-btn">
          Thêm Danh Mục
        </button>
      </form>
      <style>{`
        .add-category-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          background-color: #f9f9f9;
        }

        h1 {
          text-align: center;
          margin-bottom: 20px;
        }

        .form-group {
          margin-bottom: 15px;
        }

        .form-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .form-group textarea {
          resize: vertical;
        }

        .submit-btn {
          display: block;
          width: 100%;
          padding: 10px;
          background-color: #00cc69;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
        }

        .submit-btn:hover {
          background-color: #009e50;
        }

        .error-message {
          color: red;
          margin-bottom: 10px;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default AddCategory;
