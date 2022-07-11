import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "./Navbar";

function EditMobile() {
  function fetch() {
    if (!localStorage.getItem("myapptoken")) {
      navigate("/");
    }
  }
  let params = useParams();
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
    model: "",
    category: "",
    price: "",
    offerPrice: "",
  });
  const handleChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setCredentials((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  useEffect(() => {
    async function fetchData() {
      try {
        let editdata = await axios.get(
          `http://localhost:8080/getProduct/${params.id}`,
          {
            headers: {
              Authorization: window.localStorage.getItem("myapptoken"),
            },
          }
        );
        setCredentials({
          title: editdata.data.title,
          desc: editdata.data.desc,
          model: editdata.data.model,
          category: editdata.data.category,
          price: editdata.data.price,
          offerPrice: editdata.data.offerPrice,
        });
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  useEffect(() => {
    fetch();
  }, []);
  const handleUpdate = async () => {
    const updateData = await axios
      .put(`http://localhost:8080/updateProduct/${params.id}`, credentials, {
        headers: {
          Authorization: window.localStorage.getItem("myapptoken"),
        },
      })
      .then((res) => {
        toast.success("Updated", toastOptions);
        navigate("/viewMobile", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-5">
        <div class="card-header py-3 mb-2 d-flex justify-content-between">
          <h6 class="m-0 font-weight-bold text-primary">Users Details</h6>
        </div>
        <div className="card-body">
          <form>
            <div className="row user-row">
              <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 mb-5">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Title"
                  id="title"
                  value={credentials.title}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 ">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Description"
                  id="desc"
                  value={credentials.desc}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 ">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Model"
                  id="model"
                  value={credentials.model}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 ">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Category"
                  id="category"
                  value={credentials.category}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 ">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Price"
                  id="price"
                  value={credentials.price}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 ">
                <input
                  type="text"
                  className="form-control"
                  placeholder="offerprice"
                  id="offerPrice"
                  value={credentials.offerPrice}
                  onChange={handleChange}
                />
              </div>
              <div className="col-4 mt-5 ms-2">
                <Link to={"/mobile"}>
                  <button className="btn btn-danger btn-sm me-2">cancel</button>
                </Link>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleUpdate()}
                >
                  Update
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

export default EditMobile;
