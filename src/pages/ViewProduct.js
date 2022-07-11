import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "./Navbar";

function ViewProduct() {
  function fetch() {
    if (!localStorage.getItem("myapptoken")) {
      navigate("/");
    }
  }
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  let params = useParams();

  const navigate = useNavigate();
  const [user, setUserData] = useState([]);
  async function fetchData() {
    let user = await axios.get(
      `http://localhost:8080/getallProduct?category=${params.id}`,
      {
        headers: {
          Authorization: window.localStorage.getItem("myapptoken"),
        },
      }
    );
    setUserData(user.data);
  }

  useEffect(() => {
    fetch();
    fetchData();
  }, []);

  let handleDelete = async (id) => {
    try {
      let ask = window.confirm(
        "Are you sure, do you want to delete this User?"
      );
      if (ask) {
        await axios.delete(`http://localhost:8080/deleteProduct/${id}`, {
          headers: {
            Authorization: window.localStorage.getItem("myapptoken"),
          },
        });
        toast.success("Removed", toastOptions);
        fetchData();
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
          <h6 class="m-0 font-weight-bold text-primary">Details</h6>
          <Link to={"/createMobile"}>
            <button className="btn btn-primary btn-sm">Create </button>
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
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>OfferPrice</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {user.map((data) => {
                  return (
                    <tr>
                      <td>{data.title}</td>
                      <td>{data.desc}</td>
                      <td>{data.price}</td>
                      <td>{data.offerPrice}</td>
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
                        <Link to={`/editModel/${data._id}`}>
                          <button className="btn btn-outline-warning btn-sm ms-2">
                            Edit
                          </button>
                        </Link>
                        <Link to={`/viewModel/${data._id}`}>
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
        <Link to={"/product"}>
          <button className="btn btn-primary btn-sm m-4">Back</button>
        </Link>
      </div>
      <ToastContainer />
    </>
  );
}

export default ViewProduct;
