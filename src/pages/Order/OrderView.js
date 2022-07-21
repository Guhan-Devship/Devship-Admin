import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar";

function OrderView() {
  let params = useParams();
  const [order, setOrder] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      let orderData = await axios.get(
        `http://localhost:8080/getOrder/${params.id}`,
        {
          headers: {
            Authorization: window.localStorage.getItem("myapptoken"),
          },
        }
      );
      setOrder(orderData.data);
    }
    fetchData();
  }, []);
  return (
    <>
      <Navbar />
      <div class="card w-50">
        <div class="card-body">
          <div className="container">
            <div className="row">
              <div className="col-6">
                <h3 class="card-title">Users Details</h3>
                <p class="card-text">
                  Billing Address:<strong>{order.customerAddress}</strong>
                </p>
                <p class="card-text">
                  Shipping Address:<strong>{order.shipAddress}</strong>
                </p>
                <p class="card-text">
                  Client ID:<strong>{order.client}</strong>
                </p>
                <div className="col-lg-6 mt-3">
                  <input
                    type={"submit"}
                    value="Close"
                    onClick={() => navigate("/order", { replace: true })}
                    className="btn btn-primary"
                  />
                </div>
              </div>
              <div className="col-6"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderView;
