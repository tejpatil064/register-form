import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    profilePhoto: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};

    // Validate Full Name
    if (!formData.name.trim()) {
      newErrors.name = "Full Name is required.";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = "Full Name can only contain letters and spaces.";
    }

    // Validate Username
    if (!formData.username.trim()) {
      newErrors.username = "Username is required.";
    } else if (!/^[a-zA-Z0-9_]{3,20}$/.test(formData.username)) {
      newErrors.username =
        "Username must be 3-20 characters long and contain only letters, numbers, or underscores.";
    }

    // Validate Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    // Validate Password
    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    } else if (
      !/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(
        formData.password
      )
    ) {
      newErrors.password =
        "Password must contain at least one letter, one number, and one special character.";
    }

    // Validate Confirm Password
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm Password is required.";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUploadImage = async (e) => {
    e.preventDefault();
    const image = e.target.files[0];
    console.log(image);
    if (image) {
      setLoading(true);
      const imageData = new FormData();
      imageData.append("file", image);
      imageData.append("upload_preset", "practice");
      imageData.append("cloud_name", "dih4mkdr2");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dih4mkdr2/image/upload",
          {
            method: "POST",
            body: imageData,
          }
        );
        const data = await response.json();
        console.log(data);
        if (data) {
          setFormData((prevState) => ({
            ...prevState,
            profilePhoto: data.secure_url,
          }));
          console.log(formData);
          toast.success("Image uploaded successfully!");
        } else {
          toast.error("Failed to upload image. Please try again.");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("An error occurred during image upload.");
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Please select an image to upload.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      const formURL = "/api/signup";
      await axios.post(formURL, formData);
      toast.success("Successfully signed up!");
      setFormData({
        name: "",
        username: "",
        email: "",
        profilePhoto: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Register
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 bg-white border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          />
          {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
        </div>

        {/* Username */}
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 bg-white border ${
              errors.username ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          />
          {errors.username && (
            <p className="text-red-600 text-sm">{errors.username}</p>
          )}
        </div>

        {/* Profile photo */}
        <div>
          <label
            htmlFor="profilePhoto"
            className="block text-sm font-medium text-gray-700"
          >
            Profile Photo
          </label>
          <input
            type="file"
            id="profilePhoto"
            name="profilePhoto"
            accept="image/*"
            onChange={handleUploadImage}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray
           rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo
           -500"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 bg-white border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          />
          {errors.email && (
            <p className="text-red-600 text-sm">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 bg-white border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          />
          {errors.password && (
            <p className="text-red-600 text-sm">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 bg-white border ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          />
          {errors.confirmPassword && (
            <p className="text-red-600 text-sm">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Registering..." : "Register"}
        </button>
        <span className="text-blue-500 hover:text-blue-700 font-normal transition duration-300 flex flex-col items-center justify-center">
          <p>
            {" "}
            <Link to="/login"> Already have an account? Login</Link>{" "}
          </p>
        </span>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        Developed by
        <a
          href="https://www.linkedin.com/in/tejas-patil064/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:underline"
        >
          UI Studio - Tejas Patil
        </a>
      </p>
    </div>
  );
}

export default RegistrationForm;
