import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";

function Order() {
  const [order, setOrder] = useState([]);
  async function fetchAll() {
    try {
      let listData = await axios.get("http://localhost:8080/getOrders", {
        headers: {
          Authorization: window.localStorage.getItem("myapptoken"),
        },
      });
      setOrder(listData.data);
      console.log(listData);
    } catch (error) {
      alert("Something went wrong");
    }
  }
  useEffect(() => {
    fetchAll();
  }, []);
  return (
    <>
      <Navbar />
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Orders</h1>
      </div>

      <div class="card shadow mb-4">
        <div class="card-header py-3 d-flex justify-content-between">
          <h6 class="m-0 font-weight-bold text-primary">Order Details</h6>
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
                  <th>Title</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Total &#x20b9;</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {order.map((data) => {
                  return (
                    <tr>
                      <td>{data.title}</td>
                      <td>{data.quantity}</td>
                      <td>&#x20b9;{data.offerPrice}</td>
                      <td>&#x20b9;{data.offerPrice * data.quantity}</td>
                      <td>
                        <button className="btn btn-outline-primary btn-sm ms-2">
                          View
                        </button>
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
    </>
  );
}

export default Order;
