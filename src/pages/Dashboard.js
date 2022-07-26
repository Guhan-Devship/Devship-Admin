import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DashboardCard from "./DashboardCard";

function Dashboard() {
  let navigate = useNavigate();
  function fetchData() {
    if (!localStorage.getItem("myapptoken")) {
      navigate("/");
    }
  }
  useEffect(() => {
    fetchData();
  });
  let cards = [
    {
      title: "Users",
      color1: true,
      link1: true,
    },
    {
      title: "Products",
      color2: true,
      link2: true,
    },
    {
      title: "Orders",
      color3: true,
      link3: true,
    },
    {
      title: "Admin",
      color2: true,
      link4: true,
    },
  ];
  return (
    <>
      <div class="container-fluid px-4">
        <h1 class="mt-4">Dashboard</h1>
        <ol class="breadcrumb mb-4">
          <li class="breadcrumb-item active">Dashboard</li>
        </ol>
        <div class="row">
          {cards.map((card) => {
            return <DashboardCard card={card} />;
          })}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
