import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useObjectUrl } from "../useObjectUrl";
import Navbar from "./Navbar";

function CreateMobile() {
  function fetchData() {
    if (!localStorage.getItem("myapptoken")) {
      navigate("/");
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  const navigate = useNavigate();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const [credentials, setCredentials] = useState({
    title: "",
    desc: "",
    image: null,
    model: "",
    category: "",
    price: "",
    offerPrice: "",
  });

  const {
    objectURL: imagePreviewUrl,
    setObject: setImage,
    object: image,
  } = useObjectUrl();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (handleValidation()) {
      const { title, desc, model, category, price, offerPrice, image } =
        credentials;

      const formData = new FormData();

      Object.entries(credentials).forEach(([key, value]) =>
        formData.append(key, value)
      );

      const data = await axios.post(
        "http://localhost:8080/createProduct",
        formData,
        {
          headers: {
            Authorization: window.localStorage.getItem("myapptoken"),
          },
        }
      );

      if (data.data.message !== "created") {
        toast.error(data.data.message, toastOptions);
      }
      if (data.data.message === "created") {
        toast.success("SuccessFully Created", toastOptions);
      }
      console.log(credentials);
    }
  };
  const handleValidation = () => {
    const { title, desc, model, category, price, offerPrice } = credentials;
    if (title.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (desc.length > 20) {
      toast.error("Should be 20 character", toastOptions);
      return false;
    } else if (model === "") {
      toast.error("model is required.", toastOptions);
      return false;
    } else if (category === "") {
      toast.error("model is required.", toastOptions);
      return false;
    } else if (price === "") {
      toast.error("Price is required.", toastOptions);
      return false;
    } else if (offerPrice === "") {
      toast.error("OfferPrice is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleFileChange = (e) => {
    const [file] = e.target.files;

    if (!file || !file.type.startsWith("image/")) {
      alert("Invalid file format");
      return;
    }

    setCredentials({ ...credentials, image: file });
    setImage(file);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-5">
        <div class="card-header py-3 mb-2 d-flex justify-content-between">
          <h6 class="m-0 font-weight-bold text-primary">Product Details</h6>
        </div>
        <div className="card-body">
          <form enctype="multipart/form-data">
            <div className="row user-row">
              <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 mb-5">
                {imagePreviewUrl && (
                  <img
                    src={imagePreviewUrl}
                    className="img-fluid preview-img"
                  />
                )}
                <input
                  type="file"
                  className="form-control"
                  placeholder="img"
                  id="image"
                  name="image"
                  accept=".jpg,.png,.jpeg"
                  onChange={handleFileChange}
                />
              </div>
              <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 mb-5">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Title"
                  id="title"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 ">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Description"
                  id="desc"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 ">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Model"
                  id="model"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 ">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Category"
                  id="category"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 ">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Price"
                  id="price"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 ">
                <input
                  type="text"
                  className="form-control"
                  placeholder="offerprice"
                  id="offerPrice"
                  onChange={handleChange}
                />
              </div>
              <div className="col-4 mt-5 ms-2">
                <Link to={"/view/mobile"}>
                  <button className="btn btn-danger btn-sm me-2">cancel</button>
                </Link>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={handleClick}
                >
                  Create
                </button>
              </div>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </>
  );
}

export default CreateMobile;
