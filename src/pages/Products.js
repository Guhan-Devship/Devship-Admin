import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "./Navbar";

function Products() {
  const [category, setCategoryData] = useState([]);
  let navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  function fetchData() {
    if (!localStorage.getItem("myapptoken")) {
      navigate("/");
    }
  }
  async function fetchAll() {
    try {
      let listData = await axios.get("http://localhost:8080/getall", {
        headers: {
          Authorization: window.localStorage.getItem("myapptoken"),
        },
      });
      setCategoryData(listData.data);
      console.log(listData);
    } catch (error) {
      toast.error("Something went wrong", toastOptions);
    }
  }
  useEffect(() => {
    fetchAll();
    fetchData();
  }, []);
  let handleDelete = async (id) => {
    try {
      let ask = window.confirm(
        "Are you sure, do you want to delete this User?"
      );
      if (ask) {
        await axios.delete(`http://localhost:8080/deleteData/${id}`, {
          headers: {
            Authorization: window.localStorage.getItem("myapptoken"),
          },
        });
        toast.success("Removed", toastOptions);
        fetchAll();
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };
  return (
    <>
      <Navbar />
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Product</h1>
      </div>

      <div class="card shadow mb-4">
        <div class="card-header py-3 d-flex justify-content-between">
          <h6 class="m-0 font-weight-bold text-primary">Product Details</h6>
          <Link to={"/createProduct"}>
            <button className="btn btn-primary btn-sm">Create Product</button>
          </Link>
        </div>
        <div class="card-body">
          <div class="table-responsive table-scroll">
            <table
              class="table table-bordered"
              id="dataTable"
              width="100%"
              cellspacing="0"
            >
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {category.map((data) => {
                  return (
                    <tr>
                      <td>{data.title}</td>
                      <td>
                        <button
                          class="btn btn-outline-danger btn-sm ms-2"
                          onClick={() => handleDelete(data._id)}
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="delete"
                        >
                          Remove
                        </button>
                        <Link to={`/edit-user/${data._id}`}>
                          <button className="btn btn-outline-warning btn-sm ms-2">
                            Edit
                          </button>
                        </Link>
                        <Link to={`/view/${data.title}`}>
                          <button className="btn btn-outline-primary btn-sm ms-2">
                            View
                          </button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <Link to={"/home"}>
          <button className="btn btn-primary btn-sm m-4">Back</button>
        </Link>
      </div>
      <ToastContainer />
    </>
  );
}

export default Products;
