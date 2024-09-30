import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditCategory = () => {
  const { id } = useParams();
  const [category, setCategory] = useState({
    name: "",
    description: "",
    image: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          `https://bms-fs-api.azurewebsites.net/api/Category/${id}`
        );
        if (response.data.isSuccess) {
          setCategory({
            name: response.data.data.name,
            description: response.data.data.description,
            image: null,
          });
        }
        setLoading(false);
      } catch (error) {
        setError("Error fetching category data");
        setLoading(false);
      }
    };
    fetchCategory();
  }, [id]);

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    // Check if fields are filled
    if (!category.name || !category.description || !category.image) {
      setError("Please fill in all fields and select an image.");
      return;
    }

    // Create FormData object to send data
    const formData = new FormData();
    formData.append("image", category.image);

    try {
      // Send PUT request to API with query parameters
      const response = await axios.put(
        `https://bms-fs-api.azurewebsites.net/api/Category/${id}?name=${encodeURIComponent(
          category.name
        )}&description=${encodeURIComponent(category.description)}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set header for multipart form-data
          },
        }
      );

      if (response.data.isSuccess) {
        // Show success message (optional)
        alert("Cập nhật danh mục thành công!"); // Alert message in Vietnamese
        navigate("/crud-category"); // Redirect to category list after successful update
      } else {
        setError("Có lỗi xảy ra khi cập nhật danh mục");
      }
    } catch (error) {
      console.error("Error updating category:", error);
      setError("Có lỗi xảy ra khi cập nhật danh mục");
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setCategory({ ...category, image: files[0] });
    } else {
      setCategory({ ...category, [name]: value });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="edit-category-container">
      <h1>Edit Category </h1>

      <form onSubmit={handleUpdateCategory}>
        <div className="form-group">
          <label htmlFor="name">Category Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={category.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={category.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Category Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="submit-btn">
          Update Category
        </button>
      </form>
      <style>{`
        .edit-category-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .form-group {
          margin-bottom: 15px;
        }

        .form-group label {
          display: block;
          margin-bottom: 5px;
          font-size: 16px;
          color: #333;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 10px;
          font-size: 14px;
          border: 1px solid #ddd;
          border-radius: 4px;
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
          margin-bottom: 15px;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default EditCategory;
