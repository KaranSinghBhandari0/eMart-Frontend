import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";

export default function Modal() {
  const { openModal, setOpenModal, currProduct, updateProduct, deleteProduct } =
    useContext(AppContext);

  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
  });

  useEffect(() => {
    if (currProduct) {
      setFormData({
        name: currProduct.name || "",
        description: currProduct.description || "",
        price: currProduct.price || "",
        image: null, // Reset image for editing existing product
      });
    }
  }, [currProduct]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      if (formData.image) {
        data.append("image", formData.image);
      }

      await updateProduct(currProduct._id, data);
      setOpenModal(false); // Close the modal on success
    } catch (error) {
      console.error("Failed to update product:", error);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    setDeleting(true);

    try {
      await deleteProduct(currProduct._id);
      setOpenModal(false); // Close the modal on success
    } catch (error) {
      console.error("Failed to delete product:", error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    openModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg p-6 relative w-[90%] max-w-md">
          <button
            className="absolute top-2 right-3 text-xl text-red-500"
            onClick={() => setOpenModal(false)}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Product Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Product Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter product name"
                required
              />
            </div>

            {/* Product Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter product description"
                rows="3"
                required
              />
            </div>

            {/* Product Price */}
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price (₹)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter product price"
                required
              />
            </div>

            {/* Product Image */}
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Product Image
              </label>
              <input
                id="image"
                type="file"
                name="image"
                onChange={handleChange}
                className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-md shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            {/* Submit and Delete Buttons */}
            <div className="w-full flex gap-6">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-xl shadow-sm hover:bg-blue-600"
              >
                {updating ? "Submitting..." : "Submit"}
              </button>
              <button
                type="button"
                className="bg-red-500 text-white py-2 px-4 rounded-xl shadow-sm hover:bg-red-600"
                onClick={handleDelete}
              >
                {deleting ? "Deleting..." : "Delete Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}
