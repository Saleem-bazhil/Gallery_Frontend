import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../api.jsx";

const ImgUpload = () => {
  const [preview, setPreview] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api
      .get("/gallery/photos/")
      .then((response) => {
        const uniqueCategories = [
          ...new Set(response.data.map((photo) => photo.category)),
        ];
        setCategories(uniqueCategories);
      })
      .catch((error) => {
        console.log("Error fetching categories:", error);
      });
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    category: Yup.string().required("Category is required"),
    image: Yup.mixed().required("Image is required"),
  });

  const handleFileChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    setFieldValue("image", file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("category", values.category);
      formData.append("image", values.image);

      const response = await api.post("/gallery/photos/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Uploaded:", response.data);
      alert("Image uploaded successfully!");
      resetForm();
      setPreview(null);
    } catch (error) {
      console.error(error);
      alert("Upload failed!");
    }
  };

  return (
    <section className="min-h-screen bg-background flex items-center justify-center p-4 lg:p-0">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-card p-6 rounded-xl border border-border shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Upload Your Image
          </h2>

          <Formik
            initialValues={{ name: "", category: "", image: null }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form className="space-y-4">
                {/* Name */}
                <div>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Photo Name"
                    className="w-full px-4 py-2 input-box my-3"
                  />
                  <ErrorMessage
                    name="name"
                    component="p"
                    className="text-red-500 text-sm mt-2 ms-1"
                  />
                </div>

                {/* Category */}
                <div>
                  <Field
                    as="select"
                    name="category"
                    className="w-full px-4 py-2 input-box mb-3"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat, idx) => (
                      <option key={idx} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="category"
                    component="p"
                    className="text-red-500 text-sm mt-2 ms-1"
                  />
                </div>

                {/* Image */}
                <div>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={(event) => handleFileChange(event, setFieldValue)}
                    className="block w-full text-sm text-gray-500
                               file:mr-4 file:py-2 file:px-4
                               file:rounded-full file:border-0
                               file:text-sm file:font-semibold
                               file:bg-primary file:text-background
                               hover:file:neon-glow 
                               cursor-pointer"
                  />
                  <ErrorMessage
                    name="image"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Image Preview */}
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-xl mt-2"
                  />
                )}

                {/* Submit Button */}
                <button type="submit" className="mt-3 w-full btn  transition">
                  Upload
                </button>
                <Link
                  to="/image-gallery"
                  className="w-full inline-block text-center btn transition"
                >
                  Back
                </Link>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default ImgUpload;
