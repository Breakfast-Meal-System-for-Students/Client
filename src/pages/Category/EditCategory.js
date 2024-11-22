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
  const [formErrors, setFormErrors] = useState({
    name: "",
    description: "",
    image: "",
  });
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

  const validateForm = () => {
    let valid = true;
    const errors = { name: "", description: "", image: "" };

    if (!category.name) {
      errors.name = "Category name is required.";
      valid = false;
    }

    if (!category.description) {
      errors.description = "Description is required.";
      valid = false;
    }

    if (!category.image) {
      errors.image = "Image is required.";
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    // Validate form before submitting
    if (!validateForm()) {
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
        navigate("/category"); // Redirect to category list after successful update
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
      <h1>Edit Category</h1>

      {error && <div className="error-message">{error}</div>}

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
          {formErrors.name && (
            <div className="form-error">{formErrors.name}</div>
          )}
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
          {formErrors.description && (
            <div className="form-error">{formErrors.description}</div>
          )}
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
          {formErrors.image && (
            <div className="form-error">{formErrors.image}</div>
          )}
        </div>

        <button type="submit" className="submit-btn">
          Update Category
        </button>
      </form>

      <style>{`
  .edit-category-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 30px;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    font-family: 'Arial', sans-serif;
  }

  h1 {
    text-align: center;
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
    font-weight: bold;
  }

  .form-group {
    margin-bottom: 20px;
  }

  .form-group label {
    display: block;
    margin-bottom: 8px;
    font-size: 16px;
    font-weight: 600;
    color: #555;
  }

  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 12px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 8px;
    transition: border-color 0.3s;
  }

  .form-group input:focus,
  .form-group textarea:focus {
    border-color: #00cc69;
    outline: none;
  }

  .form-error {
    color: #e74c3c;
    font-size: 13px;
    margin-top: 5px;
  }

  .submit-btn {
    display: block;
    width: 100%;
    padding: 12px;
    background-color: #00cc69;
    color: white;
    font-size: 16px;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .submit-btn:hover {
    background-color: #009e50;
  }

  .error-message {
    color: #e74c3c;
    font-size: 14px;
    margin-bottom: 20px;
    text-align: center;
    font-weight: 600;
  }

  .form-group input[type="file"] {
    padding: 5px;
  }

  @media (max-width: 768px) {
    .edit-category-container {
      padding: 20px;
    }

    h1 {
      font-size: 20px;
    }

    .submit-btn {
      padding: 10px;
      font-size: 15px;
    }
  }
`}</style>
    </div>
  );
};

export default EditCategory;
